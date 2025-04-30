import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import sharp from "sharp";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const token = formData.get("token") as string;

    if (!file || !token) {
      return Response.json(
        { message: "Missing file or token" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, ".keep"), "");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}.webp`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, webpBuffer);

    const imageUrl = `/uploads/${filename}`;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { token },
      { $set: { imageUrl } },
      { new: true, upsert: true }
    );

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return Response.json({ message: "Error uploading image" }, { status: 500 });
  }
}
