export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center text-black">
      {/* Header */}
      <header className="w-full text-center p-5 border-b border-gray-300 bg-[#863e98]">
        <h1 className="text-5xl text-white m-0">Login</h1>
      </header>

      {/* Text */}
      <p className="mt-10 text-base leading-relaxed text-center max-w-2xl text-black">
        Welcome back! Please login to continue to your dashboard.
      </p>

      {/* Form */}
      <form className="mt-10 bg-white p-8 w-full flex flex-col gap-4 max-w-xl text-black">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full max-w-lg mx-auto p-3 border border-gray-300 rounded-md  text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full max-w-lg mx-auto p-3 border border-gray-300 rounded-md text-sm"
        />

        {/* Button */}
        <button
          type="submit"
          className="block mx-auto bg-[#863e98] text-white px-5 py-3 rounded-md w-96 hover:bg-purple-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
