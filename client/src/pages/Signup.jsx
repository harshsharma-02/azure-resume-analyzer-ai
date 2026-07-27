import API from "../api/axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await API.post(
      "/auth/register",
      form
    );

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/");

  } catch (error) {

    console.log(error.response.data);

    alert(error.response.data.message);

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-blue-700 to-cyan-500">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30"
      >

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/90 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 outline-none"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/90 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>

        </div>

        <p className="text-center text-white mt-6">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-cyan-200 hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;