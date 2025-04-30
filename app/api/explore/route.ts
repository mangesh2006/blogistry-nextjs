import connectDB from "@/lib/db";
import Blog from "@/Models/BlogSchema";

await connectDB();

export async function GET(req: Request) {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(10);

    return new Response(JSON.stringify({ message: blogs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return new Response(JSON.stringify({ message: "Error fetching blogs" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
