import connectDB from "@/lib/db";
import Blog from "@/Models/BlogSchema";
import User from "@/Models/UserSchema";

await connectDB();

export async function POST(req: Request) {
  try {
    const { token, title, content } = await req.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ message: "Missing fields." }), {
        status: 404,
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const blog = await new Blog({
      title,
      content,
      authorId: user._id,
    });

    await blog.save();

    return new Response(
      JSON.stringify({ message: "Blog Created Successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
