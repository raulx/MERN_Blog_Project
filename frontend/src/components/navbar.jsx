/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountMenu from "./accountMenu";
import Logo from "./Logo";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdContacts } from "react-icons/md";

const pages = [
  { name: "about", url: "/about", icon: <FaInfoCircle /> },
  { name: "contact", url: "/contact", icon: <MdContacts /> },
];

function Navbar() {
  const auth = useSelector((state) => state.auth.auth);
  const userData = useSelector((state) => state.user.userData);

  const currentLocation = useLocation()
    .pathname.split("/")
    .slice(0, 2)
    .join("/");

  return (
    <nav className="bg-neutral-dark w-screen flex justify-between items-center sm:px-8 px-4 fixed h-20 overflow-hidden">
      <Logo size={"md"} />

      <ul className="flex sm:gap-16 gap-8 sm:grow-0 grow justify-end items-center">
        <li className="text-white text-3xl">
          <Link
            to={"/"}
            className={`rounded-xl transition-all duration-200 font-bold py-2 px-6 ${
              currentLocation === "/" && " border-b text-lime-300"
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

      <div className="flex gap-4  mr-10">
        {auth ? (
          <>
            <AccountMenu avatarLink={userData.profile_pic} />
          </>
        ) : (
          <>
            <div className="justify-center items-center gap-4 sm:flex hidden">
              <button className="bg-primary-color text-white rounded-3xl py-2 px-12 text-xl font-semibold tracking-wide">
                <Link to={"/auth"}>Login</Link>
              </button>
              <button className="bg-white rounded-3xl py-2 px-12 text-xl font-semibold tracking-wide">
                <Link to={"/auth"}>SignUp</Link>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
