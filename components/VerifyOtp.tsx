"use client";

import { useState } from "react";
import { Loader2, CheckCircle, XCircle, Key } from "lucide-react"; // Import Key icon for OTP
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("VerifyEmail");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("VerifyEmail");
        router.push("/login");
      } else {
        toast.error(data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred while verifying OTP.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-white">
          Verify OTP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Field with Icon */}
          <div className="w-full relative">
            <Key
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="pl-12"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Didn't receive the OTP?{" "}
          <button
            onClick={() => toast.info("Resend OTP functionality is here.")}
            className="text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
