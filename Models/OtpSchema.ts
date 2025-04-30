import mongoose, { Document, Schema } from "mongoose";

interface IOtp extends Document {
  otp: string;
  email: string;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  otp: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
export default Otp;
