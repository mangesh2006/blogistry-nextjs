import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";

connectDB();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const imgUrl = user.imageUrl;

    return new Response(JSON.stringify({ imgUrl }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
