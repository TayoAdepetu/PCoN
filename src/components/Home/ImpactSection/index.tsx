import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import ImpactCard from "./ImpactCard";
import impactData from "./impactData";

type Anime={
  title: string;
  description: string;
  img: string;
  reverse: boolean;
}

const sectionVariants = (reverse: boolean): Variants => ({
  hidden: { opacity: 0.5, x: reverse ? 40 : -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
});

function ImpactItem({ title, description, img, reverse }: Anime) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div className={`flex flex-wrap gap-12 ${reverse ? "flex-wrap-reverse" : ""}`}>
      {!reverse && (
        <motion.div
          ref={ref}
          variants={sectionVariants(false)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-[1_0_280px] flex flex-col justify-center"
        >
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-xl text-gray-400">{description}</p>
        </motion.div>
      )}

      <img
        src={img}
        alt={title}
        width={280}
        height={150}
        className="flex-[1_0_280px] rounded-xl object-cover"
      />

      {reverse && (
        <motion.div
          ref={ref}
          variants={sectionVariants(true)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-[1_0_280px] flex flex-col justify-center"
        >
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-xl text-gray-400">{description}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function ImpactSection() {
  const sections = [
    {
      title: "Christian Values",
      description:
        "Integrating Christian values into Nigerian politics and public institutions.",
      img: "/christian-values.webp",
      reverse: false,
    },
    {
      title: "Human Rights",
      description:
        "Advocating for the rights and interests of all humans, especially Christians, in every sphere of public life.",
      img: "/human-rights.webp",
      reverse: true,
    },
    {
      title: "Christian Mentoring",
      description:
        "Mobilizing and mentoring Christians to participate in politics, governance, and policymaking.",
      img: "/christian-mentoring.jpg",
      reverse: false,
    },
    {
      title: "Public Policies",
      description:
        "Promoting policies that align with biblical values and strengthen the family, community, and nation.",
      img: "/public-policy.png",
      reverse: true,
    },
    {
      title: "Fighting Misinformation",
      description:
        "Fighting misinformation and ensuring that voters are informed about the values and positions of political candidates.",
      img: "/misinformation.jpg",
      reverse: false,
    },
    {
      title: "Equipping Citizens",
      description:
        "Training and equipping leaders who will reflect Christ in public service.",
      img: "/citizen-education.jpeg",
      reverse: true,
    },
    {
      title: "Grassroots Empowerment",
      description:
        "Community intervention and grassroots empowerment that reflects the love and compassion of Christ.",
      img: "/grassroots-empowerment.avif",
      reverse: false,
    },
  ];

  return (
    <section id="impact">
      {/* Section Header */}
      <h2 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
        What We Stand For
      </h2>

      {/* Dynamic Sections */}
      <div className="max-w-screen-xl p-6 mx-auto">
        <div className="flex flex-col gap-20">
          {sections.map((section, index) => (
            <ImpactItem key={index} {...section} />
          ))}
        </div>
      </div>

      <div className="my-8 mx-auto p-4 max-w-[700px]">
        <h2 className="text-4xl text-center text-primary font-semibold font-playfair mb-4">
          Our Philosophy of Progressiveness
        </h2>
        <p className="text-center">
          We are “progressive” because we are forward-looking and willing to forgive the past,
          rise above ethnic and regional divides, and unite under the banner of Christ
          to build a new Nigeria where every Christian can freely live out their faith.
        </p>
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
