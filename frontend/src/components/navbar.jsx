import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex p-6 justify-between items-center bg-white uppercase">
      <div>
        <h1 className="text-3xl tracking-widest">
          <span className="text-5xl font-semibold text-orange-400">B</span>lo
          <span className="text-4xl text-orange-300">g</span>
        </h1>
      </div>
      <div>
        <ul className="flex gap-10 text-xl text-gray-700">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link>Profile</Link>
      </div>
    </nav>
  );
}
export default Navbar;
