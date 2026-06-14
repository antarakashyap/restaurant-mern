import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Menus from "../components/Menus";
import NewsLetter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <Menus/>
      <Testimonial/>
    </div>
  );
};

export default Home;
