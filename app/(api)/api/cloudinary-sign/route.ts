import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const { paramsToSign } = await req.json();

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({ signature });
}
