import connectDB from "@/lib/db";
import Blog from "@/Models/BlogSchema";

await connectDB();

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const blogTitle = await Blog.findOne({ title });

    if (!blogTitle) {
      return new Response(JSON.stringify({ message: "Title is available" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Title already taken" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
