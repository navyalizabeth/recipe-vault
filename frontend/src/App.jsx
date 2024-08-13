import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}