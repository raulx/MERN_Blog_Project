import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import UseMyContext from "../hooks/useMyContext";

function HomePage() {
  const { phoneNav, setPhoneNav } = UseMyContext();
  return (
    <div className="md:grid grid-cols-10 h-screen grid-rows-8 gap-4 flex flex-col  justify-between md:overflow-hidden">
      <div className="md:col-span-10 md:row-span-1 h-32  md:h-full">
        <Navbar phoneNav={phoneNav} handlePhoneNav={setPhoneNav} />
      </div>

      <div className="col-span-10 grow row-span-6">
        <Outlet />
      </div>
      <div className="col-span-10 row-span-1 md:h-full ">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
