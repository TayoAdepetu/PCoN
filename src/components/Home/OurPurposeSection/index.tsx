
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import missionImg from "../../../assets/img/landng-page/fajuyi-water.png";
import visionImg from "../../../assets/img/landng-page/ikogosi-warm-spring.jpeg";

export default function OurPurposeSection() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: false });
  const visionInView = useInView(visionRef, { once: false });

  const missionVariants = {
    hidden: { opacity: 0.5, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };
  const visionVariants = {
    hidden: { opacity: 0.5, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* <h2 className="text-4xl font-semibold font-playfair text-primary text-center mb-8">
          Our Purpose
        </h2> */}

        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap-reverse gap-12 items-center [&>*]:flex-[1_0_280px]">
            <motion.div
              ref={missionRef}
              variants={missionVariants}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              className="text-gray-700 leading-relaxed"
            >
              <h3 className="text-2xl font-semibold mb-4">Mission Statement</h3>
              <p className="">
              To connect, nurture, and empower a community of innovators, 
              technical & non-technical professionals, 
              young leaders, and changemakers of Ekiti origin, equipping them with the skills, resources, 
              connections, and opportunities to excel (locally and globally) 
              and help drive digital & socio-economic growth of the State.
              </p>
            </motion.div>
            <img
              height={600}
              width={400}
              src={missionImg}
              alt="Mission Statement"
              className="w-full h-[320px] object-cover rounded-bl-[35%] rounded-tr-[35%]"
            />
          </div>

          <div className="flex flex-wrap gap-12 items-center [&>*]:flex-[1_0_280px]">
            <img
              height={600}
              width={400}
              src={visionImg}
              alt="Vision Statement"
              className="w-full h-[320px] object-cover rounded-br-[35%] rounded-tl-[35%]"
            />
            <motion.div
              ref={visionRef}
              variants={visionVariants}
              initial="hidden"
              animate={visionInView ? "visible" : "hidden"}
              className="text-gray-700 leading-relaxed"
            >
              <h3 className="text-2xl font-semibold mb-4">Vision Statement</h3>
              <p>
              To become the foremost innovation and technical & non-technical talent hub in Ekiti State, 
              driving socio-economic development through technology, creativity, public policy formulation, 
              and collaboration.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
