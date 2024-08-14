import { useState } from "react";
import { TextInput, Button, Alert, Spinner } from "flowbite-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await api.post("/api/user/signup", formData);

      if (res.data.success === false) {
        setErrorMessage(res.data.message);
      } else if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mb-4"
          />
          <div className="relative mb-4">
            <TextInput
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiOutlineEyeInvisible size={25} />
              )}
            </div>
          </div>
          <Button
            className="w-full"
            gradientDuoTone="purpleToBlue"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="flex justify-center gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/login" className="text-blue-600">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
