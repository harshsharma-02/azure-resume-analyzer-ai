import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="relative overflow-hidden min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-sky-900">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-800/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;
