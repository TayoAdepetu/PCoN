import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import { MdArrowOutward } from "react-icons/md";
import { motion, Variants } from "framer-motion";
import heroBg from "../../../assets/img/landng-page/New-Fajuyi-Memorial-Park.jpg";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  } satisfies Variants;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  } satisfies Variants;

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
          Progressive Christians of Nigeria (PCoN)
        </motion.h1>

        <motion.p variants={item} className="max-w-[800px]">
        Cross-party, Non-denominational Organization, Contributing To Public Policy Discussions 
        & Formulation and Protecting Christian Rights in Nigeria.
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
        </motion.div>
      </motion.main>
    </>
  );
}
