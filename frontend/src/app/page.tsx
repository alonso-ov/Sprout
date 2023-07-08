
export default function Login() {

  return (
    <main className="flex items-center justify-center h-screen login">
      <div className="borer border-lime-600 border-2 bg-white rounded p-6 shadow-md max-w-md">
        <h2 className=" text-lime-600 text-2xl font-semibold mb-4 text-center">Login</h2>
        <form method="POST" className="space-y-8">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your password" />
          </div>
          <div className="flex justify-center">
          <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-medium py-2 px-4 rounded">Sign In</button>
          </div>
        </form>
      </div>
    </main>
  );
}
