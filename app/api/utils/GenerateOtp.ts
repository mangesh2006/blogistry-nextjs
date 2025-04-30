import Otp from "@/Models/OtpSchema";
import bcrypt from "bcrypt";

const GenerateOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const code = otp.toString();

  const hashOtp = await bcrypt.hash(code, 10);

  const newOtp = new Otp({
    otp: hashOtp,
    email,
    createdAt: Date.now(),
  });

  await newOtp.save();
  return code;
};

export default GenerateOtp;
