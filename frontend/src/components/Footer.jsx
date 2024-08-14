import React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mt-2 container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">RecipeVault</h2>
          <p className="mr-8">Discover, Save, and Share Recipes</p>
        </div>
        <div className="text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} RecipeVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}