import { ImpactCardProps } from "../../../types/props";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ImpactCard({
  title,
  description,
  image,
  colors,
}: ImpactCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={`bg-[${colors.bg}] border border-[${colors.fg}80] rounded-xl overflow-hidden h-full p-3 flex flex-col`}
    >
      <img
        src={image}
        alt={title}
        height={192}
        width={450}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="py-4 flex-grow">
        <h3 className={`text-lg font-semibold mb-2 text-[${colors.fg}]`}>
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}
