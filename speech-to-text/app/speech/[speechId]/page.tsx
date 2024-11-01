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
  const userId = parseInt(params.speechId[0] as string);
  const speechId = params.speechId as string;
  const speech = users[userId].speeches.find((speech) => speech.id === speechId);
  const [speechTitle, setSpeechTitle] = useState(speech?.title || "");
  const [speechData, setSpeechData] = useState(speech?.data || "");
  const [editableTitle, setEditableTitle] = useState(speech?.title || "");
  const [editableData, setEditableData] = useState(speech?.data || "");
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [exportModalOpened, setExportModalOpened] = useState(false);
  const isTitleChanged = editableTitle !== speechTitle;
  const isDataChanged = editableData !== speechData;
  const isDataEmpty = editableData.trim().length === 0;
  const isTitleEmpty = editableTitle.trim().length === 0;

  const handleSave = () => {
    setSpeechTitle(editableTitle);
    setSpeechData(editableData);
  };

  const handleDelete = () => {
    setDelModalOpened(false);
    router.push(`/dashboard`);
  };

  const handleExportTxt = () => {
    const blob = new Blob([editableData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${editableTitle}.txt`; 
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object after use
    setExportModalOpened(false); // Close the export modal
  };

  const handleExportCsv = () => {
    const csvData = `"Title","Data"\n"${editableTitle}","${editableData}"`; // Format as CSV
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${editableTitle}.csv`; 
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object after use
    setExportModalOpened(false); // Close the export modal
  };

  const deleteModal = (
    <div className="delete_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h3 className="text-teal-1000 text-lg mb-4">Are you sure you want to delete this speech?</h3>
        <div className="flex justify-end">
          <button
            onClick={() => setDelModalOpened(false)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="confirm_delete bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const exportModal = (
    <div className="export_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h3 className="text-teal-1000 text-lg mb-4">Export as a file</h3>
        <div className="flex justify-between space-x-2">
          <button
            onClick={handleExportTxt}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Export as .txt
          </button>
          <button
            onClick={handleExportCsv}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Export as .csv
          </button>
          <button
            onClick={() => setExportModalOpened(false)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-teal-50">
      {/* Sidebar */}
      <div className="side_bar w-1/6 bg-white text-black p-4 rounded-lg shadow-lg">
        <p className="text-sm font-semibold mb-4 text-teal-800 text-center">Speech to Text Application</p>
        <ul className="space-y-2">
          <li>
            <Link href={`/dashboard`}>
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">
          {speechTitle}
        </h2>
        <input
          id="title"
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
            disabled={isTitleEmpty || isDataEmpty || (!isTitleChanged && !isDataChanged)}
            className={`w-1/4 py-3 px-4 rounded-md
              ${isTitleEmpty || isDataEmpty || (!isTitleChanged && !isDataChanged)
                ? 'bg-teal-100 text-gray-600'
                : 'bg-teal-600 hover:bg-teal-700 text-white'}
              focus:outline-none focus:ring-2 focus:ring-teal-500`}
          >
            Save
          </button>
          <button
            onClick={() => setDelModalOpened(true)}
            className="w-1/4 py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Delete
          </button>
          {delModalOpened && deleteModal}
          <button
            onClick={() => setExportModalOpened(true)}
            disabled={isDataEmpty}
            className={`w-1/4 py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDataEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Export
          </button>
          {exportModalOpened && exportModal}
        </div>
      </div>
    </div>
  );
}
