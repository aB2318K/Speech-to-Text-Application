'use client';
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Simulated data for users and their speeches (replace this with real database logic later)
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
      { id: "001", title: "Speech 1", data: "I am speech 1" },
      { id: "002", title: "Speech 2", data: "I am speech 2" },
      { id: "003", title: "Speech 3", data: "I am speech 3" }
    ]
  },
  1: {
    speeches: [] // Empty array for user 1
  }
};

export default function Speech() {
  const params = useParams();
  const router = useRouter();
  //Extracting userId from speechId assuming the first digit is the userId
  //This is just an example, the user and speech detail is meant to be retrieved from the database
  const userId = parseInt(params.speechId[0] as string); // Convert userId to a number
  const speechId = params.speechId as string;
  const speech = users[userId].speeches.find((speech) => speech.id === speechId);
  const[speechTitle, setSpeechTitle] = useState(speech?.title);
  const [speechData, setSpeechData] = useState(speech?.data);
  const [editableTitle, setEditableTitle] = useState(speechTitle);
  const [editableData, setEditableData] = useState(speechData);
  const [modalOpened, setModalOpened] = useState(false);

  const isTitleChanged = editableTitle !== speechTitle;
  const isDataChanged = editableData !== speechData;

  //Right now handle save is only changing the state, but it should save the changes in the database later
  const handleSave = () => {
      setSpeechTitle(editableTitle); 
      setSpeechData(editableData);
  };

  const handleDelete = () => {
    //Later write the logic to delete from the database
    setModalOpened(false);
    router.push(`/dashboard/${userId}`)
  }

  const deleteModal = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h3 className="text-teal-1000 text-lg mb-4">Are you sure you want to delete this speech?</h3>
        <div className="flex justify-end">
          <button
            onClick={() => setModalOpened(false)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-teal-50">
      {/* Sidebar */}
      <div className="w-1/6 bg-white text-black p-4 rounded-lg shadow-lg">
        <p className="text-sm font-semibold mb-4 text-teal-800 text-center">Speech to Text Application</p>
        <ul className="space-y-2">
          <li>
            <Link href={`/dashboard/${userId}`}>
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                Home
              </button>
            </Link>
          </li>
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
            <Link href="/login">
              <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Log Out
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">
          {speechTitle}
        </h2>
        <input
          type="text"
          placeholder="Enter title"
          value={editableTitle}
          onChange={(e) => setEditableTitle(e.target.value)}
          className="mb-5 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
        <textarea
          id="speech"
          name="speech"
          rows={12}
          value={editableData}
          onChange={(e) => setEditableData(e.target.value)}
          className="w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
        <div className="flex justify-evenly mt-5">
          <button
            onClick={handleSave}
            disabled={!isTitleChanged && !isDataChanged}
            className={`w-1/4 py-3 px-4 rounded-md
              ${!isTitleChanged && !isDataChanged
                ? 'bg-teal-100 text-gray-600'
                : 'bg-teal-600 hover:bg-teal-700 text-white'}
              focus:outline-none focus:ring-2 focus:ring-teal-500`}
          >
            Save
          </button>
          <button
            onClick={() => setModalOpened(true)}
            className="w-1/4 py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Delete
          </button>
          {modalOpened && deleteModal}
          <button className="w-1/4 py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
