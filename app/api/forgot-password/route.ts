import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";

connectDB();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email not found" }), {
        status: 404,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Email verified" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
