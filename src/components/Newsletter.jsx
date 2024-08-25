import logo from "../assets/images/logo/mernMart-name-logo-footer.png";
const Newsletter = () => {
  return (
    <section className="bg-text-primary w-full">
      <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row text-white mx-auto py-6 px-0 my-0">
        <img
          src={logo}
          alt="MertMart-Brand-Logo"
          className="w-[30%] md:w-52 h-1/2 md:mr-10 cursor-pointer "
        />
        <div className="w-[100%] flex flex-col md:flex-row gap-2 ">
          <p className="md:mr-10 md:w-[60%]">
            New to MernMart? <br /> Subscribe to get latest deals
          </p>
          <div className="flex flex-col md:flex-row justify-around flex-wrap gap-2 lg:gap-0 w-full p-0 m-0 ">
            <input
              type="email"
              className="w-full lg:w-[70%] p-[10px]  md:p-2 md:px-3 text-text-primary rounded-lg outline-none"
            />
            <button className="bg-accent hover:bg-amber-600 w-full lg:w-fit py-2 px-3 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
