import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WhoWeAreSection = () => {
  const itemRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const itemInView1 = useInView(itemRefs[0], { once: false });
  const itemInView2 = useInView(itemRefs[1], { once: false });
  const itemInView3 = useInView(itemRefs[2], { once: false });
  const itemInView4 = useInView(itemRefs[3], { once: false });

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <section id="about" className="bg-gray-100 py-16">
      <div className="text-center max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold font-playfair text-primary mb-8">
          Who We Are
        </h2>
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">
          We are an all-inclusive SaaS, hardware, and EdTech startup, aiming to
          revolutionize African agriculture through an integrated platform that
          combines SaaS, hardware, and educational initiatives. By providing
          advanced farm project management tools, timely and actionable
          agro-intelligence, financial inclusion for farmers and farm workers,
          and sustainable farming education, we will address the most pressing
          challenges in the sector. Our goal is to redefine farming practices
          across Africa, making agriculture innovative, inclusive, and
          youth-friendly, much like FinTech has reimagined banking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              ref: itemRefs[0],
              inView: itemInView1,
              src: "/whoarewe1.webp",
              alt: "Precision agriculture tools",
              title: "Precision agriculture tools",
            },
            {
              ref: itemRefs[1],
              inView: itemInView2,
              src: "/whoarewe2.webp",
              alt: "SaaS solutions for farm management, HR, and credit",
              title: "SaaS solutions for farm management, HR, and credit",
            },
            {
              ref: itemRefs[2],
              inView: itemInView3,
              src: "/whoarewe3.webp",
              alt: "Drone monitoring and IoT devices",
              title: "Drone monitoring and IoT devices",
            },
            {
              ref: itemRefs[3],
              inView: itemInView4,
              src: "/whoarewe4.webp",
              alt: "Empowering youth in agriculture.",
              title: "Empowering youth in agriculture.",
            },
          ].map(({ ref, inView, src, alt, title }, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              className="overflow-hidden"
              variants={variants}
              animate={inView ? "visible" : "hidden"}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold font-playfair my-4">
                {title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
