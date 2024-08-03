import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaExclamationTriangle className="text-6xl text-purple-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="text-lg text-gray-700">
        It looks like you landed on the wrong page.
      </p>
      <p className="text-md text-gray-600 mt-2">
        <a href="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </a>
      </p>
    </div>
  );
}
