"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const login = await res.json();

    if (res.status === 200) {
      toast.success(login.message);
      localStorage.setItem("token", login.token);
      router.push("/welcome");
    } else if (res.status === 404) {
      toast.error(login.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="w-full">
            <div className="relative">
              <Mail
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  errors.email ? "text-red-500" : "text-gray-400"
                )}
                size={20}
              />
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={cn("pl-12", errors.email && "border-red-500")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full">
            <div className="relative">
              <Lock
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  errors.password ? "text-red-500" : "text-gray-400"
                )}
                size={20}
              />
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={cn("pl-12", errors.password && "border-red-500")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <p className="text-center text-sm text-gray-400">
              <Link className="text-blue-500 hover:underline" href={"/forgot"}>Forgot Password?</Link>
            </p>
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
              "Login"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
