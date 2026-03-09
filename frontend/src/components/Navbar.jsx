import { Link } from "react-router";
import { PlusIcon, Laptop } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-base-content/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-2">
            <Laptop className="size-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              Electronic Gadget Store
            </h1>
          </Link>

          {/* New Product Button */}
          <Link to="/create" className="btn btn-primary btn-sm">
            <PlusIcon className="size-4" />
            New Product
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;