
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImpactCard from "./ImpactCard";
import impactData from "./impactData";

export default function ImpactSection() {
  const youthsParaRef = useRef(null);
  const farmersParaRef = useRef(null);
  const youthsInView = useInView(youthsParaRef, { once: false });
  const farmersInView = useInView(farmersParaRef, { once: false });

  const youthsVariants = {
    hidden: { opacity: 0.5, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };
  const farmersVariants = {
    hidden: { opacity: 0.5, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };
  return (
    <section id="impact">
      <h1 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
        Our Impact
      </h1>
      <p className="text-2xl text-center italic mb-12">
        Driving Sustainable Growth in Agriculture.
      </p>

      <div className="max-w-screen-xl p-6 mx-auto">
        <div className="flex flex-col gap-20">
          <div className="flex flex-wrap gap-12">
            <motion.div
              ref={youthsParaRef}
              variants={youthsVariants}
              initial="hidden"
              animate={youthsInView ? "visible" : "hidden"}
              className="flex-[1_0_280px] flex flex-col justify-center"
            >
              <h2 className="text-2xl font-semibold mb-2">
                Empowering The Youths
              </h2>
              <p className="text-xl text-gray-400">
                We initiate programs that make it attractive and rewarding for
                more youths to go into precision agriculture. The shift we
                envision is also crucial for addressing Africa&apos;s growing
                youth unemployment, increasing literacy within the agricultural
                sector, and ensuring the continent can feed itself sustainably.
              </p>
            </motion.div>

            <img
              src="/youth-empowerment.webp"
              alt=""
              width={280}
              height={150}
              className="flex-[1_0_280px] rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-wrap-reverse gap-12">
            <img
              src="/farmers-livelihood.webp"
              alt=""
              width={280}
              height={150}
              className="flex-[1_0_280px] rounded-xl object-cover"
            />

            <motion.div
              ref={farmersParaRef}
              variants={farmersVariants}
              initial="hidden"
              animate={farmersInView ? "visible" : "hidden"}
              className="flex-[1_0_280px] flex flex-col justify-center"
            >
              <h2 className="text-2xl font-semibold mb-2">
                Enhancing Farmers&apos; Livelihood
              </h2>
              <p className="text-xl text-gray-400">
                We help farmers enhance profitability through timely data
                intelligence, agro-education, and better resource management. We
                help Farm workers build credit history for financial inclusion
                and build promising careers within the agricultural sector.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="min-w-screen-xl my-8 mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-8">SDG & ESG Impact</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16">
          {impactData.map((item, index) => (
            <ImpactCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
