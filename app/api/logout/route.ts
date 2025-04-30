import connectDB from "@/lib/db";
import User from "@/Models/UserSchema";

await connectDB();

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 403,
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found or invalid token" }),
        {
          status: 404,
        }
      );
    }

    await User.findOneAndUpdate(
      { token },
      { $set: { isLoggedIn: false, token: null } }
    );

    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
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
