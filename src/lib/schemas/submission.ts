import { z } from "zod";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Initialize the countries library with English names
countries.registerLocale(enLocale);

// List of valid image MIME types
export const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;

// Maximum file size in bytes (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Maximum number of attachments
export const MAX_ATTACHMENTS = 5;

// Get all valid country codes
const VALID_COUNTRY_CODES = Object.keys(countries.getAlpha3Codes()) as [
  string,
  ...string[]
];

// Helper type for country selection (useful for frontend)
export type CountryOption = {
  code: string;
  label: string;
};

// Helper function to get country options (useful for frontend)
export const getCountryOptions = (): CountryOption[] => {
  return Object.entries(countries.getAlpha3Codes()).map(([code, alpha2]) => ({
    code,
    label: countries.getName(alpha2, "en") || code,
  }));
};

export const submissionSchema = z.object({
  uploadedBy: z
    .string()
    .min(1, { message: "Uploaded by field cannot be empty" })
    .max(20, {
      message: "Uploaded by field must be at most 20 characters long",
    })
    .refine((val) => val.trim().length > 0, {
      message: "Uploaded by field cannot be empty or contain only whitespace",
    }),
  country: z
    .string()
    .transform((val: string) => val.toUpperCase())
    .pipe(
      z.enum(VALID_COUNTRY_CODES, {
        errorMap: () => ({
          message:
            "Invalid country code. Please use a valid ISO 3166-1 alpha-3 country code (e.g., USA, GBR, FRA)",
        }),
      })
    ),
  email: z.string().email({
    message: "Invalid email address",
  }),
  attachments: z
    .array(
      z.object({
        fieldname: z.literal("attachments"),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.enum(VALID_IMAGE_TYPES, {
          errorMap: () => ({
            message:
              "Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG files are allowed",
          }),
        }),
        buffer: z.instanceof(Buffer),
        size: z.number().max(MAX_FILE_SIZE, {
          message: "File size must be less than 5MB",
        }),
      })
    )
    .min(1, { message: "At least one attachment is required" })
    .max(MAX_ATTACHMENTS, {
      message: "Maximum of 5 attachments allowed",
    }),
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;

export const validateSubmission = (data: unknown) => {
  return submissionSchema.safeParse(data);
};
