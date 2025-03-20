import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetUserProfileQuery } from "../store";
import { setUserData } from "../store";
import { Toaster } from "react-hot-toast";
import { loggedOut } from "../store";
import { useNavigate } from "react-router-dom";

function RootScreen() {
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  const [fetchUserData] = useLazyGetUserProfileQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const res = await fetchUserData();
        if (res.status === "fulfilled") {
          dispatch(setUserData(res.data.data));
        } else {
          dispatch(loggedOut());
          window.location.reload();
        }
      };
      getUser();
    }
  }, [user, dispatch, fetchUserData, navigate]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Adjusted padding of main section based on navbar height because navbar is fixed on top */}
        <Outlet />
      </main>

      <Toaster />
    </>
  );
}

export default RootScreen;
