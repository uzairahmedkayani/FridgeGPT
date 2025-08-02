import React from "react";
import Navbar from "../components/Navbar";

export default function Main() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center space-y-4 w-full py-10 bg-gray-800 h-screen">
        <textarea
          className="w-full max-w-md p-3 border text-white border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter ingredients, separated by commas..."
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors">
          Generate
        </button>
      </div>
    </div>
  );
}
