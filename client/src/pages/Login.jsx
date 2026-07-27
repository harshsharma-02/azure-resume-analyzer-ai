import  API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/auth/login", form);

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    navigate("/");
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 via-blue-700 to-cyan-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>

        <p className="text-white/80 text-center mb-8">
          Login to your Azure Resume Analyzer account
        </p>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg outline-none bg-white/90"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg outline-none bg-white/90"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>

        <p className="text-center text-white mt-6">
          Don't have an account?
          <Link to="/signup" className="ml-2 text-cyan-200 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
