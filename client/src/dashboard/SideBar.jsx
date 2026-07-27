import {
  LayoutDashboard,
  Upload,
  FileText,
  Briefcase,
  User,
  Settings,
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
  },

  {
    icon: Upload,
    name: "Upload Resume",
  },

  {
    icon: FileText,
    name: "Reports",
  },

  {
    icon: Briefcase,
    name: "Job Match",
  },

  {
    icon: User,
    name: "Profile",
  },

  {
    icon: Settings,
    name: "Settings",
  },
];

function SideBar() {
  
  return (
    <div
      className="
fixed
left-0
top-0
h-screen
w-72
border-r
border-slate-200
bg-white
p-8
"
    >
      <h1
        className="
mb-12
text-2xl
font-black
"
      >
        Azure Resume AI
      </h1>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="
flex
w-full
items-center
gap-4
rounded-xl
px-5
py-4
text-slate-600
transition
hover:bg-blue-50
hover:text-blue-600
"
            >
              <Icon />

              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
