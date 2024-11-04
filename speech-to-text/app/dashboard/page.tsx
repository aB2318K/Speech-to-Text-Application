'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth, useLogout} from "../hooks/page";
import { useRouter } from "next/navigation";

interface Speech {
  _id: string;
  title: string;
}

export default function Dashboard() {
  useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const logout = useLogout();
  const [loading, setLoading] = useState(true); // Loading state

  const [userSpeeches, setUserSpeeches] = useState<Speech[]>([]);

  // Function to get user speeches
  const getUserSpeeches = async (userId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:9000/speeches?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return []; 
    }
  };

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          const storedUserId = localStorage.getItem('userID');
          if (storedUserId && token) {
              setLoading(false);
              setUserId(storedUserId);
              const fetchSpeeches = async () => {
                const speeches = await getUserSpeeches(storedUserId);
                setUserSpeeches(speeches);
                setLoading(false);
              };
              fetchSpeeches();
          }else {
              router.push('/login');
          }
      }
  }, [router]);  


  if (loading) {
    return (
      <div className="flex h-screen bg-teal-50 items-center justify-center">
        <div className="spinner"></div> 
      </div>
    ); // Show spinner while checking auth
  }

  return (
    <div className="flex h-screen bg-teal-50">
      {/* Sidebar */}
      <div className="side_bar w-1/6 bg-white text-black p-4 rounded-lg shadow-lg text-center">
        <p className="text-sm font-semibold mb-4 text-teal-800">Speech to Text Application</p>
        <ul className="space-y-2">
          <li>
            <Link href="/create">
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                Create New
              </button>
            </Link>
          </li>
          <li>
            <Link href="/collaborate">
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                Collaborate
              </button>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                Profile
              </button>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <button 
                onClick={logout}
                className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Log Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
  
      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Saved Speeches
        </h2>
        {userSpeeches.length > 0 ? (
          <ul className="speeches space-y-4">
            {userSpeeches.map((speech) => (
              <Link key={speech._id} href={`/speech/${speech._id}`} className="block">
                <li className="p-3 bg-white rounded-md text-teal-900 hover:bg-teal-100 transition duration-200 ease-in-out shadow-md">
                  {speech.title}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="no_speech block text-sm font-medium text-teal-800 text-center">
            You don&apos;t have any saved speeches at the moment.
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <Link href="/create">
            <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4">
              Create New
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
