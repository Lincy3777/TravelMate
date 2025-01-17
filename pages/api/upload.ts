// import { NextResponse } from "next/server";
// import { createBlob } from "@vercel/blob";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   try {
//     const { url } = await createBlob(file, { public: true });
//     return NextResponse.json({ url });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
//   }
// }
