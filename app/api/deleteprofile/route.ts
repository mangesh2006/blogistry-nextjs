import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";

connectDB();

export async function DELETE(req: Request) {
  try {
    const {token} = await req.json();

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    await User.deleteOne({ token });

    return new Response(JSON.stringify({ message: "Profile deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
