import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";

await connectDB();

export async function PUT(req: Request) {
  try {
    const { token, username } = await req.json();

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    await User.findOneAndUpdate({ token }, { $set: { username } });

    return new Response(JSON.stringify({ message: "Username updated" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
