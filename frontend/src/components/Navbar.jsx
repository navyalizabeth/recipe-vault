import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/searchrecipes/search`, {
        params: { q: query },
      });
      setSearchResults(res.data);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-white shadow-md h-16 border-b-2 z-50 fixed w-full top-0 left-0"
    >
      <div className="container mx-auto flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-semibold text-gray-800">
          RecipeVault
        </Link>

        {/* Search Input */}
        <div className="relative flex-1 mx-4 md:mx-20">
          {currentUser && (
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search recipes..."
                className="border p-2 rounded-md w-full md:w-60"
              />
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50 mt-1 rounded-md">
                  <ul className="max-h-60 overflow-y-auto">
                    {loading && <li className="p-2 text-center">Loading...</li>}
                    {searchResults.map((recipe) => (
                      <li
                        key={recipe._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleRecipeClick(recipe._id)}
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-10 h-10 object-cover rounded-md mr-2"
                        />
                        <span>{recipe.name}</span>
                      </li>
                    ))}
                    {searchResults.length === 0 && !loading && (
                      <li className="p-2 text-center">No results found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 md:hidden"
        >
          {isOpen ? <HiX size={25} /> : <HiMenu size={25} />}
        </button>

        {/* Sidebar for mobile view */}
        <div
          className={`fixed inset-0 bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="flex flex-col w-full md:w-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-800 p-4 text-2xl self-end"
            >
              <HiX />
            </button>
            <ul className="flex flex-col p-4 space-y-2">
              {currentUser && (
                <li>
                  <span className="block text-sm font-medium truncate py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md">
                    {currentUser.email}
                  </span>
                </li>
              )}
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/create-recipe"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Add a New Recipe
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/recipes"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      My Recipes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button
                      onClick={handleSignout}
                      className="block w-full text-gray-800 hover:bg-gray-100 rounded-md"
                      gradientDuoTone="purpleToBlue"
                      outline
                    >
                      Sign Out
                    </Button>
                  </li>
                </>
              )}
            </ul>
            {!currentUser && (
              <div className="text-center mt-4 mx-2">
                <Link to="/login">
                  <Button
                    className="block w-full text-gray-800 hover:bg-gray-100 rounded-md"
                    gradientDuoTone="purpleToBlue"
                    outline
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link
            to="/"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
          >
            About
          </Link>
          {currentUser && (
            <>
              <Link
                to="/create-recipe"
                className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Add a New Recipe
              </Link>
              <Link
                to="/recipes"
                className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                My Recipes
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={<FaUser className="w-full h-full" />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.name}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
              </Dropdown>
            </>
          )}
          {!currentUser && (
            <Link to="/login">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
