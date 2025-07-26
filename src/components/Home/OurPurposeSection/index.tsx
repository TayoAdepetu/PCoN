import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import missionImg from "../../../assets/img/landng-page/leading-with-integrty.jpg";
import visionImg from "../../../assets/img/landng-page/leading-integrity.jpeg";

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
      text: `To mentor, empower, and mobilize Christians 
      to actively participate in politics and public service, 
      while advocating for policies that reflect Christian values and foster national unity.`,
      img: missionImg,
      reverse: true,
      ref: missionRef,
      inView: missionInView,
      variants: leftVariants,
      imgClass: "rounded-bl-[35%] rounded-tr-[35%]",
    },
    {
      title: "Vision Statement",
      text: `A Nigeria where Christians lead with integrity, unity, 
      and wisdom to create a nation aligned with God’s will.`,
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
        <div className="my-8 mx-auto p-4 max-w-[700px]">
          <h2 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
            Who We Are
          </h2>
          <p className="text-center">
            Progressive Christians of Nigeria (PCN) is a cross-party,
            non-denominational movement of believers committed to shaping Nigeria’s future
            through Christ-centered values, citizen education, political engagement,
            and active participation in national transformation drive.
          </p>
        </div>

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
