import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

await connectDB();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not exists" }), {
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 404,
      });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    await User.findOneAndUpdate(
      { email },
      { $set: { isLoggedIn: true, token } }
    );

    return new Response(
      JSON.stringify({ token, message: "Loggedin successful" }),
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
