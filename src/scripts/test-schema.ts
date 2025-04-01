import {
  validateSubmission,
  getCountryOptions,
} from "../lib/schemas/submission";

// Test cases for schema validation
const testCases = [
  // Basic valid cases
  {
    name: "Valid submission - with minimum attachment",
    data: {
      uploadedBy: "John Doe",
      country: "USA",
      email: "john@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024, // 1MB
        },
      ],
    },
    shouldPass: true,
  },
  {
    name: "Invalid - no attachments",
    data: {
      uploadedBy: "John Doe",
      country: "USA",
      email: "john@example.com",
      attachments: [],
    },
    shouldPass: false,
  },
  {
    name: "Valid submission - all fields with minimum requirements",
    data: {
      uploadedBy: "John Doe",
      country: "USA",
      email: "john@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },
  {
    name: "Valid submission - with valid attachment",
    data: {
      uploadedBy: "Jane Smith",
      country: "GBR",
      email: "jane@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024, // 1MB
        },
      ],
    },
    shouldPass: true,
  },

  // Country code validation
  {
    name: "Invalid - non-existent country code",
    data: {
      uploadedBy: "Alice",
      country: "XYZ",
      email: "alice@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Valid - lowercase country code",
    data: {
      uploadedBy: "Bob",
      country: "usa",
      email: "bob@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },
  {
    name: "Valid - mixed case country code",
    data: {
      uploadedBy: "Charlie",
      country: "UsA",
      email: "charlie@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },

  // Email validation
  {
    name: "Invalid - email without @",
    data: {
      uploadedBy: "David",
      country: "CAN",
      email: "invalidemail",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - email without domain",
    data: {
      uploadedBy: "Eve",
      country: "AUS",
      email: "eve@",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - email with spaces",
    data: {
      uploadedBy: "Frank",
      country: "NZL",
      email: "frank @example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Valid - email with subdomains",
    data: {
      uploadedBy: "Grace",
      country: "IND",
      email: "grace@sub.example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },

  // UploadedBy validation
  {
    name: "Invalid - empty uploadedBy",
    data: {
      uploadedBy: "",
      country: "JPN",
      email: "test@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - uploadedBy with only spaces",
    data: {
      uploadedBy: "   ",
      country: "KOR",
      email: "test@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Valid - uploadedBy with spaces",
    data: {
      uploadedBy: "John Smith",
      country: "CHN",
      email: "john.smith@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "test.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },

  // Attachment validation
  {
    name: "Invalid - no attachments",
    data: {
      uploadedBy: "Henry",
      country: "GBR",
      email: "henry@example.com",
      attachments: [],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - attachments undefined",
    data: {
      uploadedBy: "Ian",
      country: "FRA",
      email: "ian@example.com",
    },
    shouldPass: false,
  },
  {
    name: "Invalid - attachment too large",
    data: {
      uploadedBy: "Jack",
      country: "DEU",
      email: "jack@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "large.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test"),
          size: 10 * 1024 * 1024, // 10MB
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - invalid file type",
    data: {
      uploadedBy: "Kelly",
      country: "ITA",
      email: "kelly@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "doc.pdf",
          encoding: "7bit",
          mimetype: "application/pdf",
          buffer: Buffer.from("test"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: false,
  },
  {
    name: "Valid - multiple valid attachments",
    data: {
      uploadedBy: "Laura",
      country: "ESP",
      email: "laura@example.com",
      attachments: [
        {
          fieldname: "attachments",
          originalname: "photo1.jpg",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("test1"),
          size: 1024 * 1024,
        },
        {
          fieldname: "attachments",
          originalname: "photo2.png",
          encoding: "7bit",
          mimetype: "image/png",
          buffer: Buffer.from("test2"),
          size: 1024 * 1024,
        },
      ],
    },
    shouldPass: true,
  },

  // Missing fields
  {
    name: "Invalid - missing email",
    data: {
      uploadedBy: "Mike",
      country: "MEX",
      attachments: [],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - missing country",
    data: {
      uploadedBy: "Nancy",
      email: "nancy@example.com",
      attachments: [],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - missing uploadedBy",
    data: {
      country: "CAN",
      email: "test@example.com",
      attachments: [],
    },
    shouldPass: false,
  },
  {
    name: "Invalid - empty object",
    data: {},
    shouldPass: false,
  },
  {
    name: "Invalid - missing attachments array",
    data: {
      uploadedBy: "Oscar",
      country: "ARG",
      email: "oscar@example.com",
    },
    shouldPass: false,
  },
];

// Print available country options
console.log("\nAvailable Country Options:");
console.log("------------------------");
const countryOptions = getCountryOptions();
console.log(
  countryOptions
    .slice(0, 5)
    .map((opt) => `${opt.code}: ${opt.label}`)
    .join("\n")
);
console.log(`... and ${countryOptions.length - 5} more countries\n`);

// Run test cases
console.log("Running Schema Validation Tests:");
console.log("-------------------------------");

let passedTests = 0;
let failedTests = 0;

for (const testCase of testCases) {
  console.log(`\nTest: ${testCase.name}`);

  const result = validateSubmission(testCase.data);
  const passed = result.success === testCase.shouldPass;

  if (passed) {
    passedTests++;
  } else {
    failedTests++;
  }

  console.log("Input:", JSON.stringify(testCase.data, null, 2));
  console.log("Expected to pass:", testCase.shouldPass);
  console.log("Actually passed:", result.success);

  if (!result.success) {
    console.log("Validation errors:", result.error?.errors);
  }

  console.log(passed ? "✅ Test passed" : "❌ Test failed");
}

console.log("\nTest Summary");
console.log("============");
console.log(`Total tests: ${testCases.length}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
