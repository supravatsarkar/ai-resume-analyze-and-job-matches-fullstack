import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <div className="w-full border-b bg-white sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
      <Link to="/" className="text-xl font-bold">
        AI Resume Pro
      </Link>
      <div className="flex gap-4">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
