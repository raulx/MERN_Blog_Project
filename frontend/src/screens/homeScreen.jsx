import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { categoryLinks } from "../router/router";
import { useState } from "react";

function HomePage() {
  const location = useLocation();
  const [phoneNav, setPhoneNav] = useState(false);
  return (
    <div className="md:grid grid-cols-10 grid-rows-10 gap-4 flex flex-col  justify-between overflow-hidden homeScreen ">
      <div className="md:col-span-10 md:row-span-1 h-32  md:h-full">
        <Navbar phoneNav={phoneNav} handlePhoneNav={setPhoneNav} />
      </div>
      <div className="md:col-span-10 md:row-span-2 bg-green-500 md:h-full md:block hidden w-full">
        <div className="bg-green-500 ">Carousel</div>
      </div>
      <div
        className={`col-span-2  text-lg flex md:static absolute top-16 left-0 w-96 md:w-full  row-span-6 gap-2 sidebar rounded shadow-sm flex-col md:translate-x-0 items-center bg-white md:py-2 transition-all duration-200 ${
          phoneNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to={"/create"}
          className="uppercase  text-center bg-blue-500 hover:bg-blue-700 transition-all duration-200 rounded text-white w-full py-2"
        >
          Create Blog
        </Link>
        {categoryLinks.map((link) => {
          return (
            <Link
              key={link.category}
              className={`w-full hover:bg-green-400 hover:text-white uppercase py-4 rounded transition-all duration-200 text-center ${
                location.pathname === link.url
                  ? "bg-green-400 text-white"
                  : null
              }`}
              to={link.url}
              onClick={() => setPhoneNav(false)}
            >
              {link.category}
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
  return <div>HomeContent...</div>;
}

export { HomeContent };
export default HomePage;
