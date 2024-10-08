import React from "react";
import { Card, Button } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  const handleSignout = async () => {
    try {
      const res = await api.post(`/api/user/signout`);
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 mt-14 bg-gray-100 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          User Profile
        </h1>
      </div>

      <div className="flex justify-center w-full max-w-6xl text-center">
        <Card className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <div className="flex flex-col items-center p-6">
            <FaUser className="text-6xl text-gray-700 dark:text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {currentUser.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {currentUser.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <span className="font-semibold">Joined:</span>{" "}
              {formatDate(currentUser.createdAt)}
            </p>
            <div className="mt-6 flex justify-center w-full">
              <Button
                className="bg-cyan-600 text-white focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:focus:ring-cyan-400"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={handleSignout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
