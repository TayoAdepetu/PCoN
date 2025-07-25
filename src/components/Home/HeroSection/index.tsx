// import { IoIosArrowForward } from "react-icons/io";
// import SecondaryButton from "../../Common/Buttons/SecondaryButton";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import globeImg from "../../../assets/img/landng-page/ekitilogo.png";
import heroBg from "../../../assets/img/landng-page/New-Fajuyi-Memorial-Park.jpg";
// import { Link } from "react-router-dom";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="relative [&>*]:z-[1] text-white px-4 flex flex-col gap-6 items-center justify-center text-center"
      >
        <div className="bg-primary-light absolute z-[0] top-0 bottom-0 left-0 right-0">
          <img
            height={800}
            width={1000}
            src={heroBg}
            alt=""
            style={{ imageRendering: "pixelated", filter: "brightness(0.4)" }}
            className="w-full h-full object-fill"
          />
          <img
            height={800}
            width={1000}
            src="/herocurve.webp"
            alt=""
            style={{ imageRendering: "pixelated" }}
            className="absolute z-1 bottom-0 w-full object-fill"
          />
        </div>

        <motion.h1
          variants={item}
          className="max-w-[800px] text-3xl lg:text-5xl font-playfair font-semibold leading-relaxed lg:leading-[1.67] mt-28"
        >
          Ekiti Innovation Hub
        </motion.h1>

        <motion.p variants={item} className="max-w-[800px]">
        Connecting, nurturing, and empowering innovators, young leaders, and changemakers of Ekiti State origin.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mb-24"
        >
          <PrimaryButton style="flex items-center gap-2 hover:bg-primary-400">
            <a
              href="https://wa.link/m8mba8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Contact Visioneer <MdArrowOutward />
            </a>
          </PrimaryButton>


          {/* <SecondaryButton style="flex items-center gap-2 border-white text-white hover:bg-[#80808070]">
            <Link to="/login" className="flex items-center gap-2">
              Our Products <MdArrowOutward />
            </Link>
          </SecondaryButton> */}

        </motion.div>
      </motion.main>

      {/* <div className="bg-white">
        <img
          src={globeImg}
          height={300}
          width={200}
          alt=""
          className="mx-auto w-[50%]"
        />
      </div> */}
    </>
  );
}