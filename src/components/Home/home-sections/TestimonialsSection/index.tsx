import testimonialsData from "./testimonialsData";
import TestimonialItem from "./TestimonialItem";
import SecondaryButton from "../../../Common/Buttons/SecondaryButton";
import { MdArrowOutward } from "react-icons/md";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonial"
      className="bg-green-50 py-20 px-8 md:px-24 lg:px-48 xl:px-64"
    >
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl font-semibold font-playfair text-primary mb-4">
          Transforming Lives, One Farm at a Time
        </h2>
        <p className="text-gray-400 mb-16">
          Narratives of farmers who have increased their yields, young people
          who found purpose in agriculture, and cooperatives that expanded their
          operations using your tools
        </p>

        <div className="flex gap-12 overflow-x-scroll [&>*]:flex-[0_0_280px] mb-24 no-scrollbar">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialItem key={index} {...testimonial} />
          ))}
        </div>

        <SecondaryButton style="flex items-center gap-2 mx-auto">
          Read More Stories <MdArrowOutward />
        </SecondaryButton>
      </div>
    </section>
  );
}
