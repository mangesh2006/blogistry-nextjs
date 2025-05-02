import connectDB from "@/lib/db";
import Blog from "@/Models/BlogSchema";

await connectDB();

export async function DELETE(req: Request) {
  try {
    const { title } = await req.json();

    const blog = await Blog.findOneAndDelete({ title });

    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Blog deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
