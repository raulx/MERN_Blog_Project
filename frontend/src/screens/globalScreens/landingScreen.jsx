import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function LandingScreen() {
  return (
    <div className="md:h-screen w-screen flex flex-col justify-between overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto flex md:flex-row flex-col-reverse gap-6 justify-center p-4 py-10 md:overflow-y-scroll">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingScreen;
