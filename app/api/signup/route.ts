import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";
import bcrypt from "bcrypt";
import GenerateOtp from "@/app/api/utils/GenerateOtp";
import SendMail from "@/app/api/utils/SendMailTransporter";
import Otp from "@/Models/OtpSchema";
import { Code } from "lucide-react";

await connectDB();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email });
    if (user) {
      if (!user.isVerified) {
        await Otp.deleteMany({ email });
        const code = await GenerateOtp(email);
        await SendMail(email, code);
        return new Response(
          JSON.stringify({
            message: "User not verified please verify your email",
          }),
          {
            status: 401,
          }
        );
      }
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    await newUser.save();

    const otp = await GenerateOtp(email);

    await SendMail(email, otp);

    return new Response(
      JSON.stringify({ message: "Signup successful. OTP sent to email." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while creating the user" }),
      { status: 500 }
    );
  }
}
