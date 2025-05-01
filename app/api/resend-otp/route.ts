import connectDB from "@/lib/db";
import Otp from "@/Models/OtpSchema";
import GenerateOtp from "../utils/GenerateOtp";
import SendMail from "../utils/SendMailTransporter";

connectDB();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Please provide an email" }),
        { status: 400 }
      );
    }

    const user = await Otp.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    await Otp.deleteMany({ email });

    const otp = await GenerateOtp(email);

    await SendMail(email, otp);

    return new Response(JSON.stringify({ message: "Otp resent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
