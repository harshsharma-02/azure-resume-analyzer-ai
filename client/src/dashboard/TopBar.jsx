import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header
      className="
      flex
      items-center
      justify-between
      border-b
      bg-white
      px-8
      py-5
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        "
      >
        Dashboard
      </h2>

      <div
        className="
        flex
        items-center
        gap-5
        "
      >
        <Search className="cursor-pointer" />

        <Bell className="cursor-pointer" />
<img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
          )}`}
          className="h-10 w-10 rounded-full"
          alt="Profile"
        />
        <span className="font-medium text-gray-700">
          {user?.name}
        </span>

        

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-red-500
          px-4
          py-2
          text-white
          transition
          hover:bg-red-600
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopBar;