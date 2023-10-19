import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLazyGetUserQuery } from "../../store";
import { setUserData } from "../../store";
function LandingScreen() {
  const { auth } = useSelector((state) => {
    return state.auth;
  });
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [fetchUserData] = useLazyGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      const getUser = async () => {
        const res = await fetchUserData(id);
        dispatch(setUserData(res.data));
      };
      getUser();
      navigate("/content");
    }
  }, [auth, dispatch, fetchUserData, id, navigate]);
  return (
    <div className="flex justify-center items-center h-full w-full">
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
