import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { contentTypeLinks } from "../router/router";
import { useState } from "react";

function HomePage() {
  const location = useLocation();
  const [phoneNav, setPhoneNav] = useState(false);
  return (
    <div className="md:grid grid-cols-10 h-screen grid-rows-8 gap-4 flex flex-col  justify-between overflow-hidden">
      <div className="md:col-span-10 md:row-span-1 h-32  md:h-full">
        <Navbar phoneNav={phoneNav} handlePhoneNav={setPhoneNav} />
      </div>

      <div
        className={`col-span-2  text-lg flex md:static absolute z-20 top-16 left-0 w-full h-full  row-span-6 gap-2 sidebar rounded shadow-sm flex-col md:translate-x-0 items-center border bg-white md:py-6 transition-all duration-200 md:px-4 overflow-y-scroll ${
          phoneNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {contentTypeLinks.map((link) => {
          return (
            <Link
              key={link.type}
              className={`w-full hover:bg-green-400 hover:text-white uppercase py-4 rounded transition-all duration-200 text-center  ${
                location.pathname === link.url
                  ? "bg-green-500 text-white"
                  : null
              }`}
              to={link.url}
              onClick={() => setPhoneNav(false)}
            >
              {link.type}
            </Link>
          );
        })}
      </div>
      <div className="md:col-span-8 md:row-span-6 grow bg-white overflow-y-scroll">
        <Outlet />
      </div>
      <div className="col-span-10 row-span-1 md:h-full ">
        <Footer />
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="text-center capitalize flex flex-col max-w-2xl h-96 gap-6 justify-center">
        <h1 className="font-bold text-lime-600 text-5xl ">
          Welcome to Entertainment point
        </h1>
        <Link
          to={"/blogs/categories/all"}
          className="px-4 py-2 text-2xl bg-blue-500 w-72 mx-auto text-white rounded-lg "
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

export { HomeContent };
export default HomePage;
