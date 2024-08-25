import Hero from "../components/Hero";
import LatestDeals from "../components/LatestDeals";
import FlashSale from "../components/FlashSale";
import OfficialStore from "../components/OfficialStore";
import Banners from "../components/Banners";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <LatestDeals />
      <FlashSale />
      <Banners />
      <OfficialStore />
      <Newsletter />
    </>
  );
};

export default Home;