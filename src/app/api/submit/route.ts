import { NextRequest, NextResponse } from "next/server";
import { validateSubmission } from "@/lib/schemas/submission";
import { basehub } from "basehub";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Extract the fields
    const uploadedBy = formData.get("uploadedBy") as string;
    const country = formData.get("country") as string;
    const email = formData.get("email") as string;
    const attachments = formData.getAll("attachments") as File[];

    // Convert attachments to the format expected by our schema
    const processedAttachments = await Promise.all(
      attachments.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          fieldname: "attachments",
          originalname: file.name,
          encoding: "7bit",
          mimetype: file.type,
          buffer: Buffer.from(buffer),
          size: file.size,
        };
      })
    );

    // Validate the submission
    const validationResult = validateSubmission({
      uploadedBy,
      country,
      email,
      attachments: processedAttachments,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const query = await basehub().query({
      collections: {
        inPlaces: {
          _id: true,
        },
        friendsOfTheHouse: {
          _id: true,
          items: {
            _id: true,
          },
          __args: {
            filter: {
              _sys_title: {
                eq: uploadedBy,
              },
            },
          },
        },
      },
    });

    const parentId = query.collections.inPlaces._id;

    if (!parentId) {
      return NextResponse.json(
        { success: false, message: "Parent ID not found" },
        { status: 400 }
      );
    }

    // Process all attachments in parallel
    const uploadPromises = attachments.map(async (image) => {
      if (!image || typeof image !== "object" || image.size === 0) {
        return null;
      }

      const result = await basehub({ token: await getToken() }).mutation({
        getUploadSignedURL: {
          __args: {
            fileName: image.name,
          },
          signedURL: true,
          uploadURL: true,
        },
      });

      await fetch(result.getUploadSignedURL.signedURL, {
        method: "PUT",
        body: image,
      });

      return {
        uploadURL: result.getUploadSignedURL.uploadURL,
        fileName: image.name,
      };
    });

    const uploadResults = await Promise.all(uploadPromises);
    const validUploads = uploadResults.filter(
      (result): result is NonNullable<typeof result> => result !== null
    );

    if (validUploads.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid attachments to upload" },
        { status: 400 }
      );
    }

    const result = await basehub({ token: await getToken() }).mutation({
      transaction: {
        __args: {
          autoCommit: "Create new submissions",
          data: validUploads.map((upload) => ({
            type: "create",
            parentId,
            data: {
              type: "instance",
              value: {
                image: {
                  type: "image",
                  value: {
                    url: upload.uploadURL,
                    fileName: upload.fileName,
                  },
                },
                uploadedBy: {
                  type: "instance",
                  title: uploadedBy,
                  value: {
                    email: {
                      type: "text",
                      value: email,
                    },
                    country: {
                      type: "text",
                      value: country,
                    },
                  },
                },
              },
            },
          })),
        },
        message: true,
        status: true,
        duration: true,
      },
    });

    console.log(result);

    if (!result.transaction.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create submission",
          error: result.transaction.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Submission received successfully",
        data: result.transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function getToken() {
  const tokenFromCookie = (await cookies()).get("basehub-admin-token");
  if (tokenFromCookie) return tokenFromCookie.value;

  // will fallback to env vars
  return undefined;
}
