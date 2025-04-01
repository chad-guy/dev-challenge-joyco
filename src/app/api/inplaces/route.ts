import { NextResponse } from "next/server";
import { basehub } from "basehub";

export async function GET() {
  try {
    const result = await basehub().query({
      collections: {
        inPlaces: {
          _id: true,
          _sys: { title: true },
          items: {
            _id: true,
            _sys: { title: true, slug: true },
            image: {
              url: true,
              width: true,
              height: true,
              alt: true,
              fileName: true,
            },
            uploadedBy: {
              _id: true,
              _sys: { title: true },
              email: true,
              country: true,
            },
          },
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data :( :", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
