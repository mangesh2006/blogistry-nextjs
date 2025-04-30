import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import bcrypt from "bcrypt";

await connectDB();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

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

    const hashPass = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate({ email }, { $set: { password: hashPass } });

    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
