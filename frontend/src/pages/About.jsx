import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          About Us
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          Welcome to RecipeVault, your go-to platform for discovering, sharing,
          and creating delicious recipes. Our mission is to make cooking
          accessible and enjoyable for everyone by providing a space where you
          can find recipes for every occasion and skill level.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          We believe that cooking should be fun and rewarding, which is why we
          offer a variety of features, including a user-friendly interface, a
          comprehensive recipe database, and tools to help you create and share
          your own recipes with the community. Whether you're a seasoned chef or
          just starting out, RecipeVault has something for you.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for being part of our community.
        </p>
      </div>
    </div>
  );
}