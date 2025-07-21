import { useRef } from "react";
import { SolutionCardProps } from "../../../../types/props";
import { motion, useInView } from "framer-motion";

export default function SolutionCard({
  title,
  description,
}: SolutionCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className="rounded-lg p-6 border border-gray-300"
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
