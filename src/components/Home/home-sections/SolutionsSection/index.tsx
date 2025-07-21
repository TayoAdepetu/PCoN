import SolutionCard from "./SolutionCard";
import solutionsData from "./solutionsData";
import img from "../../../../assets/img/landng-page/solutions.webp";

export default function SolutionsSection() {
  return (
    <section id="service" className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold font-playfair mb-12 text-primary">
          The Solutions
        </h2>
        <div className="rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={img}
            height={438}
            width={1400}
            alt="Solutions in Agriculture"
            className="w-full object-cover h-96"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionsData.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
}
