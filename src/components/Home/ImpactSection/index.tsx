import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import ImpactCard from "./ImpactCard";
import impactData from "./impactData";

export default function ImpactSection() {
  const youthsParaRef = useRef(null);
  const farmersParaRef = useRef(null);

  const youthsInView = useInView(youthsParaRef, { once: false });
  const farmersInView = useInView(farmersParaRef, { once: false });

  const youthsVariants: Variants = {
    hidden: { opacity: 0.5, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const farmersVariants: Variants = {
    hidden: { opacity: 0.5, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const sections = [
    {
      title: "Community Building",
      description:
        "Create platforms for professionals and innovators to connect, share ideas, and collaborate on impactful projects.",
      img: "/community.jpg",
      reverse: false,
    },
    {
      title: "Skill Development",
      description:
        "Provide access to cutting-edge digital and leadership training programs for both technical and non-technical talents.",
      img: "/skill-development.jpg",
      reverse: true,
    },
    {
      title: "Access to Opportunities",
      description:
        "Connect members of our community to local and global job opportunities, internships, and partnerships.",
      img: "/opportunities-img.jpg",
      reverse: false,
    },
    {
      title: "Startup & Innovation Support",
      description:
        "Incubate and accelerate innovative startups and ideas that can solve real problems in Ekiti and beyond.",
      img: "/innovation-in-business.jpg",
      reverse: true,
    },
    {
      title: "Knowledge Exchange",
      description:
        "Host events, workshops, hackathons, and webinars to encourage the sharing of knowledge and resources.",
      img: "/new-knowledge-exchange.jpg",
      reverse: false,
    },
  ];

  return (
    <section id="impact">
      {/* Section Header */}
      <h2 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
        Our Impact
      </h2>

      {/* Dynamic Sections */}
      <div className="max-w-screen-xl p-6 mx-auto">
        <div className="flex flex-col gap-20">
          {sections.map((section, index) => {
            const isReverse = section.reverse;
            const ref = isReverse ? farmersParaRef : youthsParaRef;
            const isInView = isReverse ? farmersInView : youthsInView;
            const variants = isReverse ? farmersVariants : youthsVariants;

            return (
              <div
                key={index}
                className={`flex flex-wrap gap-12 ${
                  isReverse ? "flex-wrap-reverse" : ""
                }`}
              >
                {!isReverse && (
                  <motion.div
                    ref={ref}
                    variants={variants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex-[1_0_280px] flex flex-col justify-center"
                  >
                    <h2 className="text-2xl font-semibold mb-2">
                      {section.title}
                    </h2>
                    <p className="text-xl text-gray-400">
                      {section.description}
                    </p>
                  </motion.div>
                )}

                <img
                  src={section.img}
                  alt={section.title}
                  width={280}
                  height={150}
                  className="flex-[1_0_280px] rounded-xl object-cover"
                />

                {isReverse && (
                  <motion.div
                    ref={ref}
                    variants={variants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex-[1_0_280px] flex flex-col justify-center"
                  >
                    <h2 className="text-2xl font-semibold mb-2">
                      {section.title}
                    </h2>
                    <p className="text-xl text-gray-400">
                      {section.description}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="min-w-screen-xl my-8 mx-auto p-4">
        <h2 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
          Our Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16">
          {impactData.map((item, index) => (
            <ImpactCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
