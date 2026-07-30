import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Moon,
  Bell,
  Database,
  Bot,
  Download,
  Lock,
  Trash2,
  Server,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

function SettingCard({
  icon: Icon,
  title,
  subtitle,
  right,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-[#7ea8ff]/10 p-3">
          <Icon className="text-[#7ea8ff]" size={20} />
        </div>

        <div>
          <h3 className="text-white">{title}</h3>

          <p className="text-sm text-[#94a3b8]">
            {subtitle}
          </p>
        </div>
      </div>

      {right}
    </div>
  );
}

function AccountSection() {
  const user = useAuth();

  return (
    <section
      id="account"
      className="glass rounded-3xl p-8 scroll-mt-24"
    >
      <h2 className="font-display text-4xl text-white">
        Account
      </h2>

      <p className="mt-2 text-[#94a3b8]">
        Manage your profile, preferences and security.
      </p>

      {/* Profile */}

      <div className="mt-10 flex items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4a7dff] to-[#22d3ee]">

          <User size={42} className="text-white" />

        </div>

        <div>

          <h3 className="text-3xl font-display text-white">
            {user?.name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-5 text-[#94a3b8]">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              {user?.email}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Recently Joined
            </div>

            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              Verified
            </div>

          </div>

        </div>

      </div>

      {/* Settings */}

      <h3 className="mt-12 mb-5 font-display text-2xl text-white">
        Preferences
      </h3>

      <div className="space-y-4">

        <SettingCard
          icon={Moon}
          title="Theme"
          subtitle="Dark mode enabled"
          right={<span className="text-emerald-400">ON</span>}
        />

        <SettingCard
          icon={Bell}
          title="Notifications"
          subtitle="Email notifications"
          right={
            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white">
              Soon
            </button>
          }
        />

        <SettingCard
          icon={Database}
          title="Resume Storage"
          subtitle="MongoDB Atlas"
          right={
            <span className="text-cyan-400">
              Connected
            </span>
          }
        />

        <SettingCard
          icon={Bot}
          title="AI Engine"
          subtitle="GitHub Models + Azure AI"
          right={
            <span className="text-emerald-400">
              Active
            </span>
          }
        />

        <SettingCard
          icon={Download}
          title="Export Reports"
          subtitle="Download ATS reports as PDF"
          right={
            <button
              disabled
              className="rounded-xl bg-white/10 px-4 py-2 text-[#94a3b8]"
            >
              Soon
            </button>
          }
        />

      </div>

      {/* Security */}

      <h3 className="mt-12 mb-5 font-display text-2xl text-white">
        Security
      </h3>

      <div className="grid gap-4 md:grid-cols-2">

        <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-white transition hover:bg-white/10">

          <Lock size={18} />

          Change Password

        </button>

        <button className="flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 py-4 text-red-400 transition hover:bg-red-500/20">

          <Trash2 size={18} />

          Delete Account

        </button>

      </div>

      {/* App */}

      <h3 className="mt-12 mb-5 font-display text-2xl text-white">
        Application
      </h3>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center gap-3 text-[#7ea8ff]">

          <Server size={20} />

          HireSense AI

        </div>

        <div className="mt-5 grid gap-4 text-sm text-[#94a3b8] md:grid-cols-2">

          <div>
            Version
            <div className="mt-1 text-white">
              v1.0.0
            </div>
          </div>

          <div>
            Backend
            <div className="mt-1 text-white">
              Azure App Service
            </div>
          </div>

          <div>
            Database
            <div className="mt-1 text-white">
              MongoDB Atlas
            </div>
          </div>

          <div>
            AI Provider
            <div className="mt-1 text-white">
              GitHub Models
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AccountSection;