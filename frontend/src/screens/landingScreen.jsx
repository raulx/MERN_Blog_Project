import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function LandingScreen() {
  const { auth } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/content");
    }
  }, [auth, navigate]);

  return (
    <div className="bg-green-200">
      <div className="text-center capitalize flex flex-col max-w-2xl h-96 gap-6 justify-center">
        <h1 className="font-bold text-lime-600 text-5xl ">
          Welcome to Entertainment point
        </h1>
        <Link
          to={"/auth"}
          className="px-4 py-2 text-2xl bg-blue-500 w-72 mx-auto text-white rounded-lg "
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;
