
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
              Community Building
              </h2>
              <p className="text-xl text-gray-400">
              Create platforms for professionals and innovators to connect, share ideas, 
              and collaborate on impactful projects.
              </p>
            </motion.div>

            <img
              src="/community.jpg"
              alt=""
              width={280}
              height={150}
              className="flex-[1_0_280px] rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-wrap-reverse gap-12">
            <img
              src="/skill-development.jpg"
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
              Skill Development
              </h2>
              <p className="text-xl text-gray-400">
              Provide access to cutting-edge digital and leadership training programs 
              for both technical and non-technical talents.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-12">
            <motion.div
              ref={youthsParaRef}
              variants={youthsVariants}
              initial="hidden"
              animate={youthsInView ? "visible" : "hidden"}
              className="flex-[1_0_280px] flex flex-col justify-center"
            >
              <h2 className="text-2xl font-semibold mb-2">
              Access to Opportunities
              </h2>
              <p className="text-xl text-gray-400">
              Connect members of our community to local and global job opportunities, 
              internships, and partnerships.
              </p>
            </motion.div>

            <img
              src="/opportunities-img.jpg"
              alt=""
              width={280}
              height={150}
              className="flex-[1_0_280px] rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-wrap-reverse gap-12">
            <img
              src="/innovation-in-business.jpg"
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
              Startup & Innovation Support
              </h2>
              <p className="text-xl text-gray-400">
              Incubate and accelerate innovative startups and ideas that can solve real problems 
              in Ekiti and beyond.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-12">
            <motion.div
              ref={youthsParaRef}
              variants={youthsVariants}
              initial="hidden"
              animate={youthsInView ? "visible" : "hidden"}
              className="flex-[1_0_280px] flex flex-col justify-center"
            >
              <h2 className="text-2xl font-semibold mb-2">
              Knowledge Exchange
              </h2>
              <p className="text-xl text-gray-400">
              Host events, workshops, hackathons, and webinars to encourage 
              the sharing of knowledge and resources.
              </p>
            </motion.div>

            <img
              src="/new-knowledge-exchange.jpg"
              alt=""
              width={280}
              height={150}
              className="flex-[1_0_280px] rounded-xl object-cover"
            />
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
