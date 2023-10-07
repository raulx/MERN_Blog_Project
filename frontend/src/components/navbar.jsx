import { Link } from "react-router-dom";

function Navbar() {
  const auth = false;
  const handleLogout = () => {
    console.log("logged out successfully.");
  };
  return (
    <nav className="flex p-6 navbar justify-between items-center bg-white uppercase h-full">
      <div className="text-5xl">
        <h1 className="text-3xl tracking-widest">
          <span className="text-5xl font-semibold text-orange-400">B</span>lo
          <span className="text-4xl text-orange-300">g</span>
        </h1>
      </div>
      <div className="md:block hidden">
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
      <div className="flex gap-4  mr-10">
        {auth ? (
          <>
            <Link to={"/profile"}>Profile</Link>
            <button onClick={handleLogout} className="uppercase">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/auth"}>Login/Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
