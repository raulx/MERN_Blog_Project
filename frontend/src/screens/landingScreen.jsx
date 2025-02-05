import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillRocketFill } from "react-icons/bs";

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
    <div className="custom-height bg-[url('./dev/bg.png')] bg-cover  relative">
      <h1 className="absolute expand-up text-4xl sm:w-1/2 w-full text-center tracking-widest leading-snug  font-semibold font-pota-one-regular uppercase">
        <span className="text-white">Little things do make a difference</span>
        <span className="span-2">Little things do make a difference</span>
      </h1>
      <h2 className="absolute top-[30%] left-1/2 w-1/2 text-center -translate-x-1/2 text-3xl font-Poppins right-in font-semibold">
        &quot;Explore Learn. Grow - Your Hub for Insightful Reads&quot;
      </h2>

      <p className="w-1/2 text-center text-xl text-gray-500 absolute top-[40%] left-1/2 -translate-x-1/2 font-Poppins left-in font-semibold">
        Stay ahead with expert insights, deep divers, and engaging stories
        across technology, finance and beyond. Discover contents that inspires
        and informs.
      </p>

      <button className="absolute top-[60%] left-1/2 -translate-x-1/2 bottom-up flex justify-center items-center gap-2 tracking-wider bg-white text-primary-color py-4 px-6 rounded-xl border border-primary-color text-xl shadow-lg font-Poppins">
        <BsFillRocketFill className="text-3xl" /> Start Reading
      </button>
    </div>
  );
}

export default LandingScreen;
