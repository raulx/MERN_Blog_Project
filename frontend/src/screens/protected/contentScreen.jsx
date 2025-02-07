import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const allBlogScreens = [
  { name: "explore", url: "/content" },
  { name: "your blogs", url: "/content/blog/me" },
];

function ContentScreen() {
  const [currentScreen, setCurrentScreen] = useState("explore");

  return (
    <>
      <nav className="flex sm:justify-center justify-between items-center sm:px-0 px-2 text-green-800 bg-secondary-color fixed w-screen overflow-hidden py-4">
        <ul className="gap-6 flex self-center">
          {allBlogScreens.map((screen) => {
            return (
              <Link
                key={screen.name}
                onClick={() => {
                  setCurrentScreen(screen.name);
                }}
                to={screen.url}
                className={`uppercase border-b font-semibold tracking-widest rounded text-xl cursor-pointer ${
                  screen.name === currentScreen
                    ? "border-b-lime-800"
                    : " border-b-0"
                }`}
              >
                {screen.name}
              </Link>
            );
          })}
        </ul>
        <div className="sm:absolute sm:top-1/2 sm:right-10 sm:-translate-y-1/2">
          <Link
            className="flex items-center text-xl  gap-4  uppercase rounded-lg justify-center py-2 px-6 bg-blue-600 text-white  cursor-pointer"
            onClick={() => setCurrentScreen("create")}
            to={"/content/blog/create"}
          >
            <FaPlus />
            create blog
          </Link>
        </div>
      </nav>
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
}

export default ContentScreen;
