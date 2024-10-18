'use client';
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

export default function Speech() {
    const params = useParams();
    //Extracting userId from speechId assuming the first digit is the userId
    //This is just an example, the user and speech detail is meant to be retrieved from the database
    const userId = parseInt(params.speechId[0] as string); // Convert userId to a number
    const speechId = params.speechId as string;
    const speech = users[userId].speeches.find((speech) => speech.id === speechId);
    const[speechTitle, setSpeechTitle] = useState(speech?.title);
    const [speechData, setSpeechData] = useState(speech?.data);
    const [editableTitle, setEditableTitle] = useState(speechTitle);
    const [editableData, setEditableData] = useState(speechData);

    const handleSave = () => {
        setSpeechTitle(editableTitle); 
        setSpeechData(editableData);
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-teal-50">
          <div className="h-auto w-full max-w-lg bg-white p-10 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">
              {speechTitle || "Speech Title"}
            </h2>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"                       
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="mb-5 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <textarea
              id="speech"
              name="speech"
              rows={4}
              cols={50}
              value={editableData}
              onChange={(e) => setEditableData(e.target.value)} 
              className="w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <button 
                onClick={handleSave}
                className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5">
              Save
            </button>
            <button className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5">
              Export
            </button>
          </div>
        </div>
      );
}