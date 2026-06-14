import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,

} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="bg-[#cc7d0f]  text-white mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Address */}
          <div className="text-center md:text-left md:pl-20">
            <h2 className="text-3xl font-semibold mb-6">
              Address
            </h2>

            <p className="text-lg text-orange-100 leading-9">
              123 Restaurant Street<br/>
              Food District, City 12345 <br />

            </p>
          </div>

          {/* Opening Hours */}
          <div className="text-center md:text-left md:pl-5">
            <h2 className="text-3xl font-semibold mb-6">
              Opening Hours
            </h2>

            <div className="space-y-3 text-lg text-orange-100">
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p> 
                <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left md:pl-15">
            <h2 className="text-3xl font-semibold mb-6">
              Contact Us
            </h2>

            <div className="space-y-3 text-lg text-orange-100">
              <p>support@order.uk</p>
              <p>+1(555)123-4567  </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-orange-300 my-12"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-1">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <FaInstagram size={28} />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <FaFacebookF size={28} />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <FaYoutube size={28} />
          </a>



          <a
              href="mailto:support@order.uk"
              className="hover:scale-125 transition duration-300"
          >
              <MdEmail size={28} />
          </a>

        </div>
               

        {/* Copyright */}
        <div className="text-center pt-6 ">

          <p className="text-lg text-orange-100">
            © 2026 Order.uk. All Rights Reserved.
          </p>

          <div className="mt-3 flex justify-center gap-4 text-orange-100">

            <button className="hover:text-white transition">
              Privacy Policy
            </button>

            <span>|</span>

            <button className="hover:text-white transition">
              Terms & Conditions
            </button>

          </div>

        </div>
         </div>
         
    </footer>
  );
};

export default Footer;