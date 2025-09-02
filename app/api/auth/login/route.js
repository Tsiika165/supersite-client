// app/api/auth/login/route.js
export async function POST(request) {
  console.log("✅ Login API called!");

  try {
    const body = await request.json();
    console.log("Received login data:", body);

    return new Response(
      JSON.stringify({
        message: "Login successful! (Test mode)",
        user: { id: "test-user-123", email: body.emailOrUsername },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
