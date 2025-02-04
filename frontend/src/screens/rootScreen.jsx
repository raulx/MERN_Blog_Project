import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetUserQuery } from "../store";
import { setUserData } from "../store";
import { Toaster } from "react-hot-toast";
import { loggedOut } from "../store";
import { useNavigate } from "react-router-dom";

function RootScreen() {
  const { auth } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();
  const [fetchUserData] = useLazyGetUserQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
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
  }, [auth, dispatch, fetchUserData, navigate]);

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Adjusted padding of main section based on navbar height because navbar is fixed on top */}
        <Outlet />
      </main>

      <Toaster />
    </>
  );
}

export default RootScreen;
