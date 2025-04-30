import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isLoggedIn: boolean;
  CreatedAt: Date;
  imageUrl: string;
  token: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  CreatedAt: { type: Date, default: Date.now },
  imageUrl: { type: String, default: "" },
  token: { type: String, default: "" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
