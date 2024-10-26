'use client';

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [sessionEnd, setSessionEnd] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [delModalOpened, setDelModalOpened] = useState(false);
    const [saveModalOpened, setSaveModalOpened] = useState(false);
    const [exportModalOpened, setExportModalOpened] = useState(false);
    const [speechData, setspeechData] = useState(""); // State to hold speech text
    const [speechTitle, setSpeechTitle] = useState("");
    const params = useParams();
    const userId = parseInt(params.userId as string); // Convert userId to a number

    // Toggle the listening state
    const handleMicrophoneClick = () => {
        if (isListening) {
            setIsPaused(true); // Pause when stopping listening
        } else {
            setIsPaused(false); // Unpause when starting listening
        }
        if (sessionCount > 0) {
            setSessionEnd(true); // End session after 3 listening cycles
        }
        setSessionCount((state) => state + 1);
        setIsListening(!isListening); // Toggle listening state
    };

    // Toggle the pause state
    const handlePlayPauseClick = () => {
        setIsPaused(!isPaused);
    };

    const handleDelete = () => {
        // Later write the logic to delete from the database
        setDelModalOpened(false);
        window.location.reload();
    }

    const handleSave = () => {
        // Later write the logic to save in the database         
        setSaveModalOpened(false);
        router.push('/dashboard/[id]');
        setSpeechTitle("");   
    }

    const handleExportTxt = () => {
        const blob = new Blob([speechData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${speechTitle}.txt`; 
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL object after use
        setExportModalOpened(false); // Close the export modal
      };
    
      const handleExportCsv = () => {
        const csvData = `"Title","Data"\n"${speechTitle}","${speechData}"`; // Format as CSV
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${speechTitle}.csv`; 
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
                        onClick={() => setDelModalOpened(false)} // Close modal on cancel
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="confirm_delete bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    const saveModal = (
        <div className="save_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/4">
                <h3 className="text-lg mb-2 text-teal-1000">Save Your Speech</h3> 
                <input
                    type="text"
                    id="title"
                    value={speechTitle}
                    onChange={(e) => setSpeechTitle(e.target.value)}
                    name="title"
                    placeholder="Enter title"
                    className="mb-4 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="flex justify-end">
                    <button
                        onClick={() => setSaveModalOpened(false)} // Close modal on cancel
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                        Cancel
                    </button>
                    <button
                        disabled={speechTitle.trim().length === 0}
                        onClick={handleSave} // Redirects on save
                        className="confirm_save bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Save
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
            <div className="side_bar w-1/6 bg-white text-black p-4 rounded-lg shadow-lg ">
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
                        <Link href="/collaborate">
                            <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                                Collaborate
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/new-password/0">
                        <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                            Change Password
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

            <div className="flex-1 p-8">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">
                    Create Your Speech
                </h2>
                <textarea
                    id="speech"
                    name="speech"
                    rows={12}
                    value={speechData} // Bind the value to state
                    onChange={(e) => setspeechData(e.target.value)} // Update state on change
                    className="w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="flex justify-evenly">
                    <button
                        disabled={sessionEnd} // Disable when session has ended
                        className={`start_button w-1/4 py-3 px-4 rounded-md mt-5
                            ${sessionEnd
                                ? 'bg-teal-100 text-gray-600' // Disabled style when session ends
                                : isListening
                                    ? 'bg-red-600 hover:bg-red-700' // Active style when listening
                                    : 'bg-teal-600 hover:bg-teal-700' // Active style when not listening
                            }
                            text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={handleMicrophoneClick}
                    >
                        {isListening ? 'Stop' : 'Start'}
                    </button>
                    <button
                        disabled={!isListening} // Only enabled when listening
                        className={`controller w-1/4 py-3 px-4 rounded-md mt-5         
                            ${(!isListening
                                ? 'bg-teal-100 text-gray-600'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            )}
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={handlePlayPauseClick}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        disabled={!sessionEnd} // Disabled if session has not ended
                        className={`w-1/4 py-3 px-4 rounded-md mt-5
                            ${!sessionEnd
                                ? 'bg-teal-100 text-gray-600'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={() => window.location.reload()}
                    >
                        Create New
                    </button>
                </div>

                <div className="flex justify-evenly mt-5">
                    <button
                        onClick={() => setSaveModalOpened(true)}
                        disabled={speechData.trim().length === 0 || !sessionEnd} // Disabled if text area is empty or session has not ended
                        className={`save_button w-1/4 py-3 px-4 rounded-md
                            ${speechData.trim().length === 0 || !sessionEnd
                                ? 'bg-teal-100 text-gray-600' // Disabled style
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        Save
                    </button>
                    {saveModalOpened && saveModal}
                    <button
                        onClick={() => setDelModalOpened(true)}
                        disabled={!sessionEnd} // Disabled if session has not ended
                        className={`w-1/4 py-3 px-4 rounded-md
                            ${!sessionEnd
                                ? 'bg-teal-100 text-gray-600'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        Delete
                    </button>
                    {delModalOpened && deleteModal}
                    <button
                        onClick={() => setExportModalOpened(true)}
                        disabled={speechData.trim().length === 0 || !sessionEnd} // Disabled if text area is empty or session has not ended
                        className={`export_button w-1/4 py-3 px-4 rounded-md
                            ${speechData.trim().length === 0 || !sessionEnd
                                ? 'bg-teal-100 text-gray-600' // Disabled style
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        Export
                    </button>
                    {exportModalOpened && exportModal}
                </div>
            </div>
        </div>
    );
}
