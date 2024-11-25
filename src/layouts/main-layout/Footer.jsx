import {
  FaCcAmex,
  FaCcApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import Newsletter from "../../components/Newsletter";

const Footer = () => {
  return (
    <>
      <Newsletter />
      <footer className="w-screen bg-text-secondary mt-0 -my-7 p-0">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:items-start gap-3 lg:gap-6 h-full w-[90%] py-6 md:w-[80%] text-white mx-auto">
          <div className="w-[90%] lg:w-[60%] flex flex-row justify-between gap-2 ">
            <div>
              <h2 className="font-semibold text-lg">Get to know us</h2>
              <ul>
                <li>About MerMart</li>
                <li>Term & Conditions</li>
                <li>Privacy Policy</li>
                <li>Payment Information</li>
                <li>Cookie Notice</li>
                <li>Flash Sale</li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Need Help?</h2>
              <ul>
                <li>Chat with us</li>
                <li>Help Center</li>
                <li>Refunds</li>
                <li>Report</li>
                <li>Check order status</li>
                <li>Return Policy</li>
              </ul>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg">Usefull Links</h2>
              <ul>
                <li>Services Center</li>
                <li>How to Shop on MernMart</li>
                <li>Corporate & Bulk Purchase</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-3 w-[90%] lg:w-[45%]">
            <div>
              <h2 className="font-semibold text-lg">Join Us</h2>
              <ul className="flex gap-3">
                <li className="cursor-pointer text-xl md:text-2xl hover:text-[#bc1888]">
                  <FaInstagram />
                </li>
                <li className="cursor-pointer text-xl md:text-2xl hover:text-[#1877f2]">
                  <FaFacebook />
                </li>
                <li className="cursor-pointer text-xl md:text-2xl hover:text-[#1da1f2]">
                  <FaTwitter />
                </li>
                <li className="cursor-pointer text-xl md:text-2xl hover:text-[#e60023]">
                  <FaPinterest />
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Payment & Delivery</h2>
              <ul className="flex gap-3">
                <li>
                  <FaCcMastercard className="text-3xl md:text-5xl cursor-pointer text-white" />
                </li>
                <li>
                  <FaCcAmex className="text-3xl md:text-5xl cursor-pointer text-white" />
                </li>
                <li>
                  <FaCcVisa className="text-3xl md:text-5xl cursor-pointer text-white" />
                </li>
                <li>
                  <FaCcPaypal className="text-3xl md:text-5xl cursor-pointer text-white" />
                </li>
                <li>
                  <FaCcApplePay className="text-3xl md:text-5xl cursor-pointer text-white" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
