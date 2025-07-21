
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import missionImg from "../../../../assets/img/landng-page/mission.webp";
import visionImg from "../../../../assets/img/landng-page/vision.webp";

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
        <h2 className="text-4xl font-semibold font-playfair text-primary text-center mb-8">
          Our Purpose
        </h2>

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
              <p>
                To provide farmers across Africa with cutting-edge tools,
                data-driven insights, and financial resources, fostering
                productivity, sustainability, job security, financial
                inclusivity, and profitability. By bridging the gap between
                technology and agriculture, we aim to build trust and inspire
                adoption among farmers and youths, ensuring the continent&apos;s
                agricultural potential is unlocked.
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
                To be one of the driving forces behind Africa&apos;s
                agricultural transformation, enabling precise and sustainable
                farming and empowering farmers of all sizes to feed the
                continent with innovation and resilience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
