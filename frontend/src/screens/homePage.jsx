import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetUserQuery } from "../store";
import { setUserData } from "../store";

import UseMyContext from "../hooks/useMyContext";

function HomePage() {
  const { phoneNav, setPhoneNav } = UseMyContext();
  const { auth } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const [fetchUserData] = useLazyGetUserQuery();

  useEffect(() => {
    if (auth) {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const getUser = async () => {
        const res = await fetchUserData(id);
        dispatch(setUserData(res.data));
      };
      getUser();
    }
  }, [auth, dispatch, fetchUserData]);
  return (
    <div className="md:grid grid-cols-10 h-screen gap-4 grid-rows-8  flex flex-col  justify-between overflow-hidden">
      <div className="md:col-span-10 md:row-span-1 h-36 md:h-full">
        <Navbar phoneNav={phoneNav} handlePhoneNav={setPhoneNav} />
      </div>

      <div className="col-span-10 grow row-span-6  overflow-y-scroll">
        <Outlet />
      </div>
      <div className="col-span-10 row-span-1 md:h-full hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
