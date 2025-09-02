import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/model/user";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    await connectToMongoDB();

    const body = await req.json();
    const { firstName, lastName, email, password, role } = body;
    console.log("Received role:", role, "Type:", typeof role); // Add this for debugging
    console.log("Raw body:", body); // Debug the entire request body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return new Response(
        JSON.stringify({
          message:
            "Missing required fields: firstName, lastName, email, password",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email format" }), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(
        JSON.stringify({ message: "User with this email already exists" }),
        {
          status: 409, // 409 Conflict is more appropriate for duplicate resources
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ message: "Password must be at least 6 characters" }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 12);
    const allowedRoles = ["Agent", "Admin", "Team Leader"];
    let userRole = "Agent"; // default

    if (role) {
      // Convert to proper case for consistency
      const formattedRole =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      userRole = allowedRoles.includes(formattedRole) ? formattedRole : "Agent";
    }

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: userRole,
    });

    // Return user data without password
    const user = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    };

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Signup error:", err);

    // Handle MongoDB duplicate key error (additional safety net)
    if (err.code === 11000) {
      return new Response(
        JSON.stringify({ message: "User with this email already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return new Response(
        JSON.stringify({ message: "Validation failed", errors }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Internal server error",
        // Only include stack in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
