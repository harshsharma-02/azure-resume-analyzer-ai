import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Mail } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="— Sign in"
      title={<>Welcome<br /><em className="text-gradient not-italic italic">back.</em></>}
      subtitle="Continue optimizing your resume with your Azure AI copilot."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" data-testid="auth-switch-signup" className="text-[#7ea8ff] hover:text-white underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} data-testid="login-form" className="space-y-4">
        <Field icon={Mail} name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} testid="login-email" />
        <Field icon={Lock} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} testid="login-password" />

        {error && (
          <div className="text-sm text-[#fca5a5] bg-[#f87171]/10 border border-[#f87171]/30 rounded-xl px-4 py-3" data-testid="login-error">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          data-testid="login-submit"
          className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
          <ArrowUpRight size={18} />
        </motion.button>
      </form>
    </AuthShell>
  );
}

function Field({ icon: Icon, testid, ...props }) {
  return (
    <div className="relative">
      <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8db0]" />
      <input
        {...props}
        data-testid={testid}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3.5 text-[15px] text-white placeholder:text-[#5a6d92] font-sans"
      />
    </div>
  );
}

export function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="bg-nocturne min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div aria-hidden className="aurora animate-float-slow" style={{ top: "-100px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, #4a7dff, transparent 60%)" }} />
      <div aria-hidden className="aurora animate-float-slow" style={{ bottom: "-140px", right: "-120px", width: "540px", height: "540px", background: "radial-gradient(circle, #22d3ee, transparent 60%)", animationDelay: "4s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md glass p-8 lg:p-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 chip mb-8 hover:border-white/30">
          ← Back home
        </Link>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-4 font-display text-5xl text-white leading-[0.95]">{title}</h1>
        <p className="mt-4 text-[#a5b4d0] text-[15px] leading-relaxed">{subtitle}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-8 text-center text-sm text-[#a5b4d0]">{footer}</p>
      </motion.div>
    </div>
  );
}

export default Login;
