import Navbar from "../components/navbar";
import Footer from "../components/footer";

function AboutPage() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto ">About Us...</div>
      <div className="h-48">
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;