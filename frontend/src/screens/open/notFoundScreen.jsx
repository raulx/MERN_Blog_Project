import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-lime-100">
      <div className="text-center container mx-auto flex flex-col gap-4 justify-center items-center">
        <h1 className=" text-9xl font-bold">
          4 <span className="text-lime-500">0</span>4
        </h1>
        <h3 className="text-2xl font-bold text-red-500">Page not Found</h3>
        <p className="text-xl font-bold">
          The page you are looking for was moved,removed,renamed or might never
          existed
        </p>
        <div className="flex gap-6 bg-green-950 md:w-1/3 w-1/2 md:rounded-full rounded-2xl text-white justify-center items-center p-4 hover:gap-2 transition-all duration-200">
          <Link to={"/"} className="text-2xl">
            Back to Home
          </Link>
          <GoArrowRight className="text-5xl" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
