import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import Blog from "@/Models/BlogSchema";

await connectDB();

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 401,
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid token or user not found" }),
        { status: 401 }
      );
    }

    const blogs = await Blog.find({ authorId: user._id }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify({blogs}), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch blogs" }), {
      status: 500,
    });
  }
}
