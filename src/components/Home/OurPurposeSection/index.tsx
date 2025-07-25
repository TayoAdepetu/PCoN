import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import missionImg from "../../../assets/img/landng-page/fajuyi-water.png";
import visionImg from "../../../assets/img/landng-page/ikogosi-warm-spring.jpeg";

export default function OurPurposeSection() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  const missionInView = useInView(missionRef, { once: false });
  const visionInView = useInView(visionRef, { once: false });

  const leftVariants: Variants = {
    hidden: { opacity: 0.5, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0.5, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  };

  const statements = [
    {
      title: "Mission Statement",
      text: `To connect, nurture, and empower a community of innovators, 
      technical & non-technical professionals, young leaders, and changemakers of Ekiti origin, equipping them with the skills, resources, 
      connections, and opportunities to excel (locally and globally) 
      and help drive digital & socio-economic growth of the State.`,
      img: missionImg,
      reverse: true,
      ref: missionRef,
      inView: missionInView,
      variants: leftVariants,
      imgClass: "rounded-bl-[35%] rounded-tr-[35%]",
    },
    {
      title: "Vision Statement",
      text: `To become the foremost innovation and technical & non-technical talent hub in Ekiti State, 
      driving socio-economic development through technology, creativity, public policy formulation, 
      and collaboration.`,
      img: visionImg,
      reverse: false,
      ref: visionRef,
      inView: visionInView,
      variants: rightVariants,
      imgClass: "rounded-br-[35%] rounded-tl-[35%]",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col gap-8">
          {statements.map((item, index) => (
            <div
              key={index}
              className={`flex flex-wrap ${item.reverse ? "flex-wrap-reverse" : ""} gap-12 items-center [&>*]:flex-[1_0_280px]`}
            >
              {item.reverse && (
                <motion.div
                  ref={item.ref}
                  variants={item.variants}
                  initial="hidden"
                  animate={item.inView ? "visible" : "hidden"}
                  className="text-gray-700 leading-relaxed"
                >
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              )}

              <img
                height={600}
                width={400}
                src={item.img}
                alt={item.title}
                className={`w-full h-[320px] object-cover ${item.imgClass}`}
              />

              {!item.reverse && (
                <motion.div
                  ref={item.ref}
                  variants={item.variants}
                  initial="hidden"
                  animate={item.inView ? "visible" : "hidden"}
                  className="text-gray-700 leading-relaxed"
                >
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
