/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountMenu from "./accountMenu";
import Logo from "./Logo";
import { FaBars, FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { useState } from "react";

const pages = [
  { name: "about", url: "/about", icon: <FaInfoCircle /> },
  { name: "contact", url: "/contact", icon: <MdContacts /> },
];

const Navlinks = () => {
  const currentLocation = useLocation()
    .pathname.split("/")
    .slice(0, 2)
    .join("/");

  return (
    <ul className="sm:gap-16 gap-8  flex ">
      <li className="text-white text-3xl">
        <Link
          to={"/"}
          className={`rounded-xl transition-all duration-200 font-bold py-2 px-6 ${
            currentLocation === "/" || currentLocation === "/content"
              ? " border-b text-lime-300"
              : null
          }`}
        >
          <FaHome />
        </Link>
      </li>
      {pages.map((page) => {
        return (
          <li key={page.name} className="text-white text-3xl">
            <Link
              to={page.url}
              className={`rounded-xl transition-all duration-200 font-bold py-2 px-6 ${
                currentLocation === page.url && "border-b text-lime-300"
              }`}
            >
              {page.icon}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

function Navbar() {
  const auth = useSelector((state) => state.auth.auth);
  const userData = useSelector((state) => state.user.userData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-neutral-dark w-screen flex justify-between items-center z-10 sm:px-8 px-4 fixed h-20 overflow-hidden">
        <div className="flex text-white justify-center items-center gap-2">
          <button onClick={() => setIsOpen(true)} className="sm:hidden block">
            <FaBars />
          </button>
          <Logo size={"md"} />
        </div>

        <div className="sm:flex hidden">
          <Navlinks />
        </div>

        {auth && (
          <div className="justify-center items-center sm:flex hidden">
            <input
              placeholder="Search Blogs"
              className="py-2 px-6 rounded-full rounded-r-none w-[400px]"
            />
            <button className="flex justify-center items-center bg-primary-color border-1 border-primary-color py-2 px-4 rounded-r-full text-white">
              Go
            </button>
          </div>
        )}

        <div className="flex gap-4 sm:mr-10">
          {auth ? (
            <>
              <AccountMenu avatarLink={userData.profile_pic} />
            </>
          ) : (
            <>
              <div className="justify-center items-center gap-4 flex ">
                <button className="bg-primary-color text-white rounded-3xl py-2 sm:px-12 px-8 sm:text-xl text-md font-semibold tracking-wide">
                  <Link to={"/auth"}>Login</Link>
                </button>
                <button className="bg-white rounded-3xl py-2 sm:px-12 px-8 sm:text-xl text-md font-semibold tracking-wide">
                  <Link to={"/auth"}>SignUp</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/*navlinks to appear in mobile screen layout  */}
      <nav
        className={`w-screen sm:hidden flex h-1/6 bg-black fixed justify-center items-center top-0 left-0 transition-transform duration-300 z-20 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          className="absolute top-10 left-10 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaTimes />
        </button>

        <div className="sm:hidden flex">
          <Navlinks />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
