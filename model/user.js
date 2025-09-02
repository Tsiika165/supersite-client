import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxLength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["Agent", "Admin", "Team Leader"],
        message: "Role must be either Agent, Admin, or Team Leader",
      },
      default: "Agent",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Remove the mongoose import if not used elsewhere
const User = models.User || model("User", userSchema);

export default User;
