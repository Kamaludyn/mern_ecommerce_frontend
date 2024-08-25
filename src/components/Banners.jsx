import img1 from "../assets/images/banners/suprise.png";
import img2 from "../assets/images/banners/black-friday.png";
import img3 from "../assets/images/banners/shopping-offer.png";
import img4 from "../assets/images/banners/special-offer.png";
const Banners = () => {
  return (
    <section className="bg-white w-[90%] md:w-[80%] flex justify-between flex-wrap mx-auto mb-6 p-2 gap-1.5 md:gap-1 lg:gap-2 rounded-xl shadow-lg">
      <div className="w-full md:w-[59%] rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-100 ease-in-out">
        <img className="w-full h-52 rounded-md" src={img2} alt="" />
      </div>
      <div className="w-full md:w-[40%] rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-100 ease-in-out">
        <img className="w-full h-52 rounded-md" src={img4} alt="" />
      </div>
      <div className="w-full md:w-[40%] rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-100 ease-in-out">
        <img className="w-full h-52 rounded-md" src={img1} alt="" />
      </div>
      <div className="w-full md:w-[59%] rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-100 ease-in-out">
        <img className="w-full h-52 rounded-md" src={img3} alt="" />
      </div>
    </section>
  );
};

export default Banners;
