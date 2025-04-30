import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import jwt from "jsonwebtoken";

await connectDB();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 403,
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 403 }
      );
    }

    return new Response(
      JSON.stringify({ username: user.username, email: user.email }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in profile fetch:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
