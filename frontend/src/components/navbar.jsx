/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { pages } from "../utils/variables";
import { useSelector } from "react-redux";

import AccountMenu from "./accountMenu";

function Navbar() {
  const auth = useSelector((state) => state.auth.auth);
  const userData = useSelector((state) => state.user.userData);

  const currentLocation = useLocation()
    .pathname.split("/")
    .slice(0, 2)
    .join("/");

  return (
    <div className="flex flex-col justify-between md:h-full">
      {/* navlinks for desktop screens  */}
      <nav className="flex md:p-6 p-2 navbar relative justify-between items-center text-white bg-green-950 uppercase h-full w-full">
        <div className="text-5xl flex gap-2 justify-center items-center">
          <h1 className="text-3xl tracking-widest">
            <span className="text-5xl font-semibold text-orange-400">B</span>lo
            <span className="text-4xl text-orange-300">g</span>
          </h1>
        </div>
        <div className="md:block hidden">
          <ul className="flex gap-4 text-xl ">
            {pages.map((page) => {
              return (
                <Link
                  to={page.url}
                  key={page.name}
                  className={`rounded-xl transition-all duration-200 font-bold py-2 px-6 ${
                    currentLocation === page.url
                      ? " border-b border-lime-300"
                      : "hover:text-green-300"
                  }`}
                >
                  {page.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-4  mr-10 ">
          {auth ? (
            <>
              <AccountMenu avatarLink={userData.profile_pic} />
            </>
          ) : (
            <>
              <Link to={"/auth"}>Login/Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* navlinks for mobile screen  */}
      <nav className="md:hidden bg-green-950  py-2 px-6 rounded-xl font-bold  flex justify-center items-center my-2 md:w-2/3 w-4/5 mx-auto ">
        <ul className="flex gap-10 text-xl text-green-100 capitalize">
          {pages.map((page) => {
            return (
              <li
                key={page.name}
                className={`border-2  border-l-0 border-t-0 border-r-0 ${
                  currentLocation === page.url
                    ? "border-b-lime-400"
                    : "border-b-0"
                } `}
              >
                <Link to={page.url}>{page.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
