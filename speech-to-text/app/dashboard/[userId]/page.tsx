'use client';

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

//This is just an example of users and their saved speeches; use database later
interface Speech {
  title: string,
  data: string
}

interface Speech {
  id: string
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
    <div className="h-screen flex items-center justify-center bg-teal-50">
      <div className="h-auto w-full max-w-lg bg-white p-10 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">
          Saved Speeches
        </h2>
        {userSpeeches.length > 0 ? (
          <ul className="space-y-4">
            {userSpeeches.map((speech, index: number) => (
                <li key={index} className="p-0 bg-teal-50 rounded-md text-teal-900 hover:bg-teal-100 transition duration-200 ease-in-out">
                  <Link href={`/speech/${speech.id}`} className="block w-full h-full p-3">{speech.title}</Link>
                </li>              
            ))}
          </ul>
        ) : (
          <div className="block text-sm font-medium text-teal-800 text-center">
            You don't have any saved speeches at the moment.
          </div>
        )}
        <div>
          <Link href="/create">
            <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 mt-5">
              Create New
            </button>
          </Link>
          <Link href="/collaborate">
            <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
              Collaborate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}