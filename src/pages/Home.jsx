import Hero from "../components/Hero";
import LatestDeals from "../components/LatestDeals";
import FlashSale from "../components/FlashSale";
import OfficialStore from "../components/OfficialStore";
import Banners from "../components/Banners";

const Home = () => {
  return (
    <main>
      <Hero />
      <LatestDeals />
      <FlashSale />
      <Banners />
      <OfficialStore />
    </main>
  );
};

export default Home;
