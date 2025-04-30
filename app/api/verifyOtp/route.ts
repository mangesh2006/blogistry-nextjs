import Otp from "@/Models/OtpSchema";
import User from "@/Models/UserSchema";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { otp, email } = await req.json();

  const storedOtp = await Otp.findOne({ email });
  if (!storedOtp) {
    return new Response(
      JSON.stringify({ message: "OTP not found for this email." }),
      { status: 404 }
    );
  }

  const ExpirationTime = 5 * 60 * 1000;
  const isExpired = Date.now() - storedOtp.createdAt > ExpirationTime;

  if (isExpired) {
    return new Response(JSON.stringify({ message: "Otp is expired" }), {
      status: 400,
    });
  }

  const isMatch = await bcrypt.compare(otp, storedOtp.otp);

  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid otp" }), {
      status: 400,
    });
  }

  await User.findOneAndUpdate(
    { email },
    { $set: { isVerified: true } }
  );

  await Otp.deleteMany({ email });

  return new Response(
    JSON.stringify({ message: "OTP verified successfully." }),
    { status: 200 }
  );
}
