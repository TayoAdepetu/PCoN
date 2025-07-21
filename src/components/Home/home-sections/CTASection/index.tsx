
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PrimaryButton from "../../../Common/Buttons/PrimaryButton";
import SecondaryButton from "../../../Common/Buttons/SecondaryButton";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import img from "../../../../assets/img/landng-page/cta.webp";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center gap-12 px-4 [&>*]:flex-[1_0_280px]">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-playfair text-primary mb-5">
            Join Us in Revolutionizing Agriculture
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Whether you&apos;re a farmer, farm worker, student, agribusiness,
            investor, or enthusiast, there&apos;s a place for you in our vision
            for a food-secure Africa.
          </p>
          <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-4"
          >
            <PrimaryButton className="flex items-center gap-2">
              Request a Demo <IoIosArrowForward />
            </PrimaryButton>
            <SecondaryButton className="flex items-center gap-2">
              Our Products <MdArrowOutward />
            </SecondaryButton>
          </motion.div>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            height={300}
            width={400}
            src={img}
            alt="Agricultural Landscape"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
