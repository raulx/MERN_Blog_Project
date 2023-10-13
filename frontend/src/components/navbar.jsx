/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { pages } from "../router/router";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store";

function Navbar({ phoneNav, handlePhoneNav }) {
  const { auth } = useSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between md:h-full">
      <nav className="flex md:p-6 p-2 navbar relative justify-between md:items-center items-start  text-green-100 bg-green-950 uppercase h-full w-full">
        <div className="text-5xl flex gap-2 justify-center items-center">
          <div
            onClick={() => {
              handlePhoneNav((p) => !p);
            }}
            className="cursor-pointer  md:hidden text-4xl"
          >
            {phoneNav != null && phoneNav != undefined ? (
              phoneNav ? (
                <FaTimes />
              ) : (
                <FaBars />
              )
            ) : null}
          </div>
          <h1 className="text-3xl tracking-widest">
            <span className="text-5xl font-semibold text-orange-400">B</span>lo
            <span className="text-4xl text-orange-300">g</span>
          </h1>
        </div>
        <div className="md:block hidden">
          <ul className="flex gap-4 text-xl ">
            {pages.map((page) => {
              return (
                <li
                  key={page.name}
                  className={` rounded-xl transition-all duration-200 font-bold py-2 px-6 ${
                    location.pathname === page.url
                      ? " border-b border-lime-300"
                      : "hover:text-green-300"
                  }`}
                >
                  <Link to={page.url}>{page.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-4  mr-10 p-4">
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
      <div className="md:hidden bg-green-950  py-2 px-6 rounded-xl font-bold  flex justify-center items-center my-2 md:w-2/3 w-4/5 mx-auto ">
        <ul className="flex gap-10 text-xl text-green-100 capitalize">
          {pages.map((page) => {
            return (
              <li
                key={page.name}
                className={`border-2  border-l-0 border-t-0 border-r-0 ${
                  location.pathname === page.url
                    ? "border-b-lime-400"
                    : "border-b-0"
                } `}
              >
                <Link to={page.url}>{page.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
