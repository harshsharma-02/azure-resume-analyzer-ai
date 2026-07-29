import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, User, Mail, Lock } from "lucide-react";
import { AuthShell } from "./Login";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/auth/register", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Sign up failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="- Create account -"
      title={
        <>
          Start
          <br />
          <em className="text-gradient not-italic italic">strong.</em>
        </>
      }
      subtitle="Free forever for your first three resumes. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            data-testid="auth-switch-login"
            className="text-[#7ea8ff] hover:text-white underline underline-offset-4"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        data-testid="signup-form"
        className="space-y-4"
      >
        <Field
          icon={User}
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          testid="signup-name"
        />
        <Field
          icon={Mail}
          name="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          testid="signup-email"
        />
        <Field
          icon={Lock}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          testid="signup-password"
        />

        {error && (
          <div
            className="text-sm text-[#fca5a5] bg-[#f87171]/10 border border-[#f87171]/30 rounded-xl px-4 py-3"
            data-testid="signup-error"
          >
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          data-testid="signup-submit"
          className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create account"}
          <ArrowUpRight size={18} />
        </motion.button>
      </form>
    </AuthShell>
  );
}

function Field({ icon: Icon, testid, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8db0]"
      />
      <input
        {...props}
        data-testid={testid}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3.5 text-[15px] text-white placeholder:text-[#5a6d92] font-sans"
      />
    </div>
  );
}

export default Signup;
