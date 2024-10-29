'use client';

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

// This is just an example of users and their saved speeches; use database later
interface Speech {
  id: string;
  title: string;
  data: string;
}

interface User {
  speeches: Speech[];
}

const users: { [key: number]: User } = {
  0: {
    speeches: [
      {
        id: "001",
        title: "Speech 1",
        data: "I am speech1"
      },
      {
        id: "002",
        title: "Speech 2",
        data: "I am speech2"
      },
      {
        id: "003",
        title: "Speech 3",
        data: "I am speech3"
      }
    ]
  },
  1: {
    speeches: [] // Empty array for user 1
  }
};

export default function Dashboard() {
  const params = useParams();
  const userId = parseInt(params.userId as string); // Convert userId to a number

  // Function to get user speeches
  const getUserSpeeches = (userId: number): Speech[] => {
    if (userId in users) {
      return users[userId].speeches; // This returns an array of speech objects
    }
    return []; // Return an empty array if userId is not found
  };

  // Get speeches based on userId
  const [userSpeeches] = useState(() => getUserSpeeches(userId));

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
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
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
              <Link key={speech.id} href={`/speech/${speech.id}`} className="block">
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
