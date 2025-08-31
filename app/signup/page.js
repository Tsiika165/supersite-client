export default function SignUp() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-purple-700 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">Sales Agent Sign-Up</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full p-6 space-y-6 bg-white shadow rounded-lg mt-6">
        <p>
          Become a member of our sales team and unlock a world of unlimited
          earning potential! With our competitive commission structure (20% on
          development fees), you’ll be rewarded as you grow. Follow the steps
          below to get started.
        </p>

        <ol className="list-decimal list-inside space-y-1 font-semibold">
          <li>Sign up to be a SuperbSite Sales Agent</li>
          <li>Verify your email address</li>
          <li>Complete the short training course</li>
          <li>Start Selling!</li>
        </ol>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email Address *</label>
            <input
              type="email"
              placeholder="user@gmail.com"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input type="password" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password *</label>
            <input type="password" className="w-full border rounded p-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">First Name *</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name *</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number *</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Province *</label>
            <select className="w-full border rounded p-2">
              <option>Eastern Cape</option>
              <option>Western Cape</option>
              <option>Gauteng</option>
              <option>KwaZulu-Natal</option>
              <option>Limpopo</option>
              <option>Free State</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I have read and accept the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
