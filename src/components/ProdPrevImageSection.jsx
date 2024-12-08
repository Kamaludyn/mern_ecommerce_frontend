import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProdPrevImageSection = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combining both main product image with gallery images for carousel
  const galleryImages = [
    product?.image?.secure_url, // Main product image
    ...(product?.gallery?.map((img) => img.secure_url) || []), // Extracting secure url from each gallery images
  ];

  // Function to go to the next image in the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Function to go to the previous image in the carousel
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product?.gallery.length) % galleryImages.length
    );
  };
  return (
    <section className="relative w-full h-[40vh] lg:w-[45%] lg:h-[65vh] flex flex-col md:gap-5 border">
      <img
        src={galleryImages[currentIndex]}
        alt={product.name}
        className="object-contain w-full h-full lg:rounded-lg"
      />
      {galleryImages.length > 0 && (
        <div className="absolute top-[45%] left-5 right-5 text-4xl text-accent text-center flex justify-between items-center">
          <FaAngleLeft
            className="bg-white pr-0.5 rounded-full drop-shadow-lg cursor-pointer"
            onClick={handlePrev}
          />
          <FaAngleRight
            className="bg-white pl-0.5 rounded-full drop-shadow-lg cursor-pointer"
            onClick={handleNext}
          />
        </div>
      )}
    </section>
  );
};

export default ProdPrevImageSection;
