import nike from "../assets/images/official-brands/nike.png";
import lg from "../assets/images/official-brands/lg.png";
import apple from "../assets/images/official-brands/apple.png";
import starlink from "../assets/images/official-brands/starlink.png";
import tecno from "../assets/images/official-brands/tecno.png";
import infinix from "../assets/images/official-brands/infinix.png";
import adidas from "../assets/images/official-brands/adidas.png";
import calvinKlien from "../assets/images/official-brands/calvin-klein.png";
import sony from "../assets/images/official-brands/sony.png";
import rolex from "../assets/images/official-brands/rolex.png";
import xiaomi from "../assets/images/official-brands/xiaomi.png";
import dell from "../assets/images/official-brands/dell.png";

const OfficialStore = () => {
  const officialBrands = [
    { img: nike, name: "Nike" },
    { img: lg, name: "LG" },
    { img: apple, name: "Apple" },
    { img: starlink, name: "Starlink" },
    { img: tecno, name: "Tecno" },
    { img: infinix, name: "Infinix" },
    { img: adidas, name: "Adidas" },
    { img: calvinKlien, name: "Calvin Klein" },
    { img: sony, name: "Sony" },
    { img: rolex, name: "Rolex" },
    { img: xiaomi, name: "Xiaomi" },
    { img: dell, name: "Dell" },
  ];

  return (
    <section className="bg-white w-[90%] md:w-[80%] mx-auto mb-6 rounded-t-lg rounded-b-xl shadow-lg">
      <h2 className="w-full bg-elements p-3 font-semibold text-white mb-2 text-2xl rounded-t-lg ">
        Official Store
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 text-center">
        {officialBrands.map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-lg hover:shadow-uShape hover:scale-[1.009] transition-all duration-100 ease-in-out"
          >
            <img
              className="w-full h-40 rounded-lg"
              src={brand.img}
              alt={`${brand.name} logo`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfficialStore;
