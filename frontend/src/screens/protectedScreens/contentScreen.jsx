import { contentTypeLinks } from "../../utils/variables";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import UseMyContext from "../../hooks/useMyContext";

function ContentScreen() {
  const { phoneNav, setPhoneNav } = UseMyContext();
  const [currentScreen, setCurrentScreen] = useState("blogs"); //default is set to blogs

  const handleClick = (value) => {
    setCurrentScreen(value);
    setPhoneNav(false);
  };

  return (
    <div className="h-full w-full md:grid grid-cols-6 grid-rows-6 flex flex-col justify-between">
      <div
        className={`col-span-1  text-lg flex md:static absolute z-20 top-24 left-0 w-full h-full  row-span-6 gap-2 sidebar rounded shadow-sm flex-col md:translate-x-0 items-center border bg-white md:py-6 transition-all duration-200 md:px-4 overflow-y-scroll ${
          phoneNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {contentTypeLinks.map((link) => {
          return (
            <Link
              key={link.type}
              className={`w-full hover:bg-green-400 hover:text-white uppercase py-4 rounded transition-all duration-200 text-center  ${
                currentScreen === link.type ? "bg-green-500 text-white" : null
              }`}
              to={link.url}
              onClick={() => handleClick(link.type)}
            >
              {link.type}
            </Link>
          );
        })}
      </div>
      <div className="md:col-span-5  md:row-span-6 grow bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default ContentScreen;
