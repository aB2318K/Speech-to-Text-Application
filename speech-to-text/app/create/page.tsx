'use client';

import { useState } from "react";
import Link from "next/link";
import { useParams} from "next/navigation";

export default function Create() {
    const [isListening, setIsListening] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [sessionEnd, setSessionEnd] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [modalOpened, setModalOpened] = useState(false);
    const params = useParams();
    const userId = parseInt(params.userId as string); // Convert userId to a number
   
    // Toggle the listening state
    const handleMicrophoneClick = () => {
        if (isListening) {
            setIsPaused(true); // Pause when stopping listening
        } else {
            setIsPaused(false); // Unpause when starting listening
        }
        if(sessionCount > 0) {
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
        //Later write the logic to delete from the database
        setModalOpened(false);
        window.location.reload();
      }
  
      const deleteModal = (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <h3 className=" text-teal-1000 text-lg mb-4">Are you sure you want to delete this speech?</h3>
            <div className="flex justify-end">
              <button 
                onClick={() => setModalOpened(false)} // Close modal on cancel
                className="bg-teal-600 text-white  px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-teal-600 text-white  px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      );

    return (
        <div className="flex h-screen bg-teal-50">
            {/* Sidebar */}
            <div className="w-1/6 bg-white text-black p-4 rounded-lg shadow-lg ">
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
                    className="w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="flex justify-evenly">
                    <button
                        disabled={sessionEnd}  // Disable when session has ended
                        className={`w-1/4 py-3 px-4 rounded-md mt-5
                            ${sessionEnd
                                ? 'bg-teal-100 text-gray-600'  // Disabled style when session ends
                                : isListening 
                                    ? 'bg-red-600 hover:bg-red-700'  // Active style when listening
                                    : 'bg-teal-600 hover:bg-teal-700'  // Active style when not listening
                            }
                            text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={handleMicrophoneClick}
                    >
                        {isListening ? 'Stop' : 'Start'}
                    </button>
                    <button
                        disabled={!isListening}  // Only enabled when listening
                        className={`w-1/4 py-3 px-4 rounded-md mt-5         
                            ${(!isListening
                                ? 'bg-teal-100 text-gray-600' 
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            )}
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={handlePlayPauseClick} 
                    >
                        {isPaused ? 'Play' : 'Pause'}
                    </button>
                    <button
                        disabled={!sessionEnd}  // Disabled if session has not ended
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
                        disabled={!sessionEnd}  // Disabled if session has not ended
                        className={`w-1/4 py-3 px-4 rounded-md
                            ${!sessionEnd
                                ? 'bg-teal-100 text-gray-600'  
                                : 'bg-teal-600 hover:bg-teal-700 text-white'  
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        Save
                    </button>
                    <button
                        disabled={!sessionEnd}  // Disabled if session has not ended
                        className={`w-1/4 py-3 px-4 rounded-md
                            ${!sessionEnd
                                ? 'bg-teal-100 text-gray-600'  
                                : 'bg-teal-600 hover:bg-teal-700 text-white'  
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        onClick={() => setModalOpened(true)}
                    >
                        Delete
                    </button>
                    {modalOpened && deleteModal}
                    <button
                        disabled={!sessionEnd}  // Disabled if session has not ended
                        className={`w-1/4 py-3 px-4 rounded-md
                            ${!sessionEnd
                                ? 'bg-teal-100 text-gray-600'  // Disabled style
                                : 'bg-teal-600 hover:bg-teal-700 text-white'  
                            }
                            focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}
