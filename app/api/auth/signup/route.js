import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(request) {
  console.log("✅ Signup API called!");

  try {
    const {
      email,
      username,
      password,
      name,
      role,
      adminPin,
      leaderPin,
      mobileNumber,
      province,
    } = await request.json();
    console.log("Received signup data:", { email, username, name, role });

    // Validate input
    if (!email || !username || !password || !name) {
      return new Response(
        JSON.stringify({
          error: "Email, username, password, and name are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Determine role and approval based on pins
    let userRole = "partner";
    let isApproved = false;

    if (adminPin === "1234") {
      // Your frontend ADMIN_PIN
      userRole = "admin";
      isApproved = true;
    } else if (leaderPin === "5678") {
      // Your frontend LEADER_PIN
      userRole = "team_leader";
      isApproved = true;
    } else if (role === "Agent") {
      userRole = "partner";
      isApproved = false;
    } else if (role === "Team Leader") {
      userRole = "team_leader";
      isApproved = true;
    } else if (role === "Admin") {
      userRole = "admin";
      isApproved = true;
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("supersite_db");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { username: username.trim() },
      ],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          error:
            existingUser.email === email.toLowerCase()
              ? "Email already registered"
              : "Username already taken",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const newUser = {
      email: email.toLowerCase().trim(),
      username: username.trim(),
      password: hashedPassword,
      name: name.trim(),
      role: userRole,
      isApproved: isApproved,
      mobileNumber: mobileNumber || "",
      province: province || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database
    const result = await db.collection("users").insertOne(newUser);

    console.log(
      "✅ User created with ID:",
      result.insertedId,
      "Role:",
      userRole
    );

    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser;

    return new Response(
      JSON.stringify({
        message: "Signup successful!",
        user: userWithoutPassword,
        userId: result.insertedId,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
