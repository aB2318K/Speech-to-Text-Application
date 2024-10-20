'use client';

import { useState } from "react";

export default function Collaborate() {
    const [isListening, setIsListening] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    /*
        Add logic for exporting the transcription
        Add logic for saving the transcription in the database
    */
   
    // Toggle the listening state
    const handleMicrophoneClick = () => {
        if (isListening) {
            // If we are stopping listening, set isPaused to true
            setIsPaused(true);
        } else {
            // If starting to listen, set isPaused to false
            setIsPaused(false);
        }
        setIsListening(!isListening); // Toggle listening state
    };

    // Toggle the pause state
    const handlePlayPauseClick = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">
                    Collaborate
                </h2>
                <textarea
                    id="speech"
                    name="speech"
                    rows={8}
                    className="w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5">
                    Invite Speakers
                </button>
                <button
                    className={`mt-4 w-full py-3 rounded-md 
                        ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-teal-600 hover:bg-teal-700'}
                        text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onClick={handleMicrophoneClick}
                >
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                </button>
                <button
                    disabled={!isListening}  // Only enabled when listening
                    className={`w-full py-3 px-4 rounded-md mt-5         
                        ${(!isListening
                            ? 'bg-teal-100 text-gray-600' 
                            : 'bg-teal-600 hover:bg-teal-700 text-white'
                        )}
                        focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onClick={handlePlayPauseClick} 
                >
                    {isPaused ? 'Play' : 'Pause'}
                </button>
                
                <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5">
                    Save
                </button>
                <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5">
                    Export
                </button>
            </div>
        </div>
    );
}
