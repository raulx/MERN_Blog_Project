import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { categoryLinks } from "../router/router";
import { Fabars } from "react-icon/fa";

function HomeContent() {
  const location = useLocation();

  return (
    <div className="md:grid grid-cols-10 grid-rows-10 gap-4 flex flex-col overflow-hidden homeScreen ">
      <div className="col-span-10 row-span-1">
        <Navbar />
      </div>
      <div className="col-span-10 row-span-2 bg-green-500 h-full w-full">
        <div className="bg-green-500 ">Carousel</div>
      </div>
      <div className="col-span-2  text-lg flex md:static absolute top-36 left-0 w-96 md:w-full h-full row-span-6 gap-2 sidebar rounded shadow-sm flex-col  items-center bg-white md:py-2">
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
            >
              {link.category}
            </Link>
          );
        })}
      </div>
      <div className="col-span-8 row-span-6 bg-white overflow-y-scroll">
        <Outlet />
      </div>
      <div className="col-span-10 row-span-1">
        <Footer />
      </div>
    </div>
  );
}

export default HomeContent;
