import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-pink-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Drag Race Generator
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/create" className="text-white hover:underline">
            Create Queens
          </Link>
          <Link to="/casting" className="text-white hover:underline">
            Casting
          </Link>
          {/* <Link to="/season" className="text-white hover:underline">
            Start Season
          </Link>
          <Link to="/season/reunion" className="text-white hover:underline">
            Reunion
          </Link>
          <Link to="/season/finale" className="text-white hover:underline">
            Finale
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
