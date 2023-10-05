import { Link, Outlet } from "react-router-dom";

function HomeContent() {
  return (
    <div className="grid grid-cols-10 gap-4 m-4">
      <div className="col-span-2 flex gap-10 rounded shadow-sm flex-col overflow-y-auto justify-center items-center bg-white">
        <Link
          to={"/create"}
          className="uppercase text-center bg-blue-500 hover:bg-blue-700 transition-all duration-200 rounded text-white w-full py-2"
        >
          Create Blog
        </Link>
        <Link to={"/categories/politics"}>Politics</Link>
        <Link to={"/categories/sports"}>Sports</Link>
        <Link to={"/categories/financeBussiness"}>Finance & Bussiness</Link>
        <Link to={"/categories/travel"}>Travel</Link>

        <Link to={"/categories/fashionLifestyle"}>Fashion & Lifestyle</Link>
        <Link to={"/categories/health"}>Health</Link>

        <Link to={"/categories/scienceTech"}>Science & Tech</Link>
        <Link to={"/categories/food"}>Food</Link>
        <Link to={"/categories/music"}>Music</Link>
      </div>
      <div className="col-span-8 bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeContent;
