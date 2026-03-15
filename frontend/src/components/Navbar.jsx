import { Link } from "react-router";
import { PlusIcon, Laptop, Search } from "lucide-react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-[#0a0c10] border-b border-cyan-900/50 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-all duration-300">
              <Laptop className="size-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Electronic <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">Gadget</span> Store
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="size-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12151c] border border-gray-800 text-gray-200 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600 shadow-inner"
            />
          </div>

          {/* New Product Button */}
          <Link 
            to="/create" 
            className="flex items-center gap-2 bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-400 hover:text-[#0a0c10] px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] whitespace-nowrap"
          >
            <PlusIcon className="size-4" />
            New Product
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar; 