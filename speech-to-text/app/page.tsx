import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50"> 
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-teal-700">
            Speech to Text Application
        </h2>
        <div className="space-y-5">
          <button  className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <Link className="pr-3" href='/login'>
              LogIn
            </Link>
          </button>

          <button  className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <Link className="pr-3" href='/signup'>
              Create New Account
            </Link>
          </button>
        </div>
      </div>

    </div>
  );
}
