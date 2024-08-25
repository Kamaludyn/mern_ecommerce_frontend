import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import img1 from "../assets/images/hero-img/carousel-imgs/sale-discount.png";
import img2 from "../assets/images/hero-img/carousel-imgs/summer-sale.png";
import img3 from "../assets/images/hero-img/carousel-imgs/watch-ad.png";
import img4 from "../assets/images/hero-img/carousel-imgs/black-friday.png";
import img5 from "../assets/images/hero-img/carousel-imgs/Electronics-promo-banner.webp";
import img6 from "../assets/images/hero-img/side-banners/back-to-school.png";
import img7 from "../assets/images/hero-img/side-banners/giveaway.webp";
import img8 from "../assets/images/hero-img/side-banners/mega-sale.png";
import img9 from "../assets/images/hero-img/side-banners/sewing-machine.jpg";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
  ];

  const leftBanners = [{ img: img6 }, { img: img7 }];

  const rightBanners = [{ img: img8 }, { img: img9 }];

  // Function to go to the next image in the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  // Function to go to the previous image in the carousel
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length
    );
  };

  // UseEffect to automatically transition to the next image every 5 seconds
  useEffect(() => {
    const timer = setTimeout(handleNext, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <section className="bg-white w-[90%] md:w-[80%] h-full flex md:flex-row items-center justify-between gap-4 flex-wrap p-2 mb-5 mx-auto rounded-2xl shadow-lg">
      <div className="bg-transparent w-full md:w-[21%] lg:w-[19%]  md:h-full flex md:flex-col justify-between rounded-xl gap-3 md:gap-2">
        {leftBanners.map((banner, index) => (
          <div
            key={index}
            className="bg-white w-full h-[30vh] md:h-[27vh] rounded-xl"
          >
            <img
              src={banner.img}
              alt="banners"
              className="w-full h-full object-center rounded-xl"
            />
          </div>
        ))}
      </div>
      <div className="order-first group md:order-none bg-white w-full h-[40vh] md:w-[50%] lg:w-[58%] md:h-[55vh] rounded-xl relative">
        <img
          src={heroImages[currentIndex].img}
          className="w-full h-full object-center rounded-xl"
          alt=""
        />
        <div className="flex justify-between w-[95%] absolute top-[40%] left-[2.5%] md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaAngleLeft
            className="bg-faded rounded-full text-center text-4xl pr-1 cursor-pointer shadow-lg"
            onClick={handlePrev}
          />
          <FaAngleRight
            className="bg-faded rounded-full text-center text-4xl pl-1 cursor-pointer shadow-lg"
            onClick={handleNext}
          />
        </div>
        <div className="flex justify-between w-[20%] absolute bottom-4 left-[40%]">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`border border-text-primary rounded-full w-2.5 h-2.5 ${
                currentIndex === index ? "bg-text-primary" : "false"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="bg-transparent w-full md:w-[21%] lg:w-[19%] md:h-full flex md:flex-col justify-between rounded-xl gap-3 md:gap-2">
        {rightBanners.map((banner, index) => (
          <div
            key={index}
            className="bg-white w-full h-[30vh] md:h-[27vh] rounded-xl"
          >
            <img
              src={banner.img}
              alt="banners"
              className="w-full h-full object-center rounded-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
