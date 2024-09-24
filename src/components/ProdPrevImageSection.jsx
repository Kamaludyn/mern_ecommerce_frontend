import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProdPrevImageSection = ({ product }) => {
  return (
    <section className="relative w-full h-[40vh] lg:w-[45%] lg:h-[65vh] flex flex-col md:gap-5 border">
      <img
        src={product.image.secure_url}
        alt={product.name}
        className="object-contain w-full h-full lg:rounded-lg"
      />
      <div className="absolute top-[45%] left-5 right-5 text-3xl text-center flex justify-between items-center lg:hidden">
        <FaAngleLeft className="bg-white pr-0.5 rounded-full drop-shadow-lg cursor-pointer" />
        <FaAngleRight className="bg-white pl-0.5 rounded-full drop-shadow-lg cursor-pointer" />
      </div>
    </section>
  );
};

export default ProdPrevImageSection;
