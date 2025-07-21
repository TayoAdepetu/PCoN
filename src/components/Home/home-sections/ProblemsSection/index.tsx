import img from "../../../../assets/img/landng-page/problems.webp";

export default function ProblemsSection() {
  return (
    

    <section className="bg-white py-16">
      
      <div className="max-w-screen-xl mx-auto px-4">
      
        <h2 className="text-center text-4xl font-bold font-playfair mb-12 text-red-700">
          The Problems
        </h2>
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={img}
            height={564}
            width={848}
            alt="Problems in Agriculture"
            className="w-full object-cover h-96"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-300 rounded-xl px-3 md:px-4 py-4">
          <ul className="list-disc pl-6 text-gray-400">
            <li>Lack of access to reliable farm management tools.</li>
            <li>
              Lack of job security and poor remuneration and credit for farm
              workers
            </li>
            <li>
              Lack of tools for adequate soil testing that ought to make
              precision farming possible
            </li>
            <li>
              Language barriers for smallholder farmers and farm workers that
              limit access to information
            </li>
          </ul>

          <ul className="list-disc pl-6 text-gray-400">
            <li>
              Inefficiencies in monitoring and planning across large farm
              networks.
            </li>
            <li>Absence of centralized, actionable agro-intelligence data.</li>
            <li>
              Lack of knowledge about the benefits of adequate soil testing to
              production yields
            </li>
            <li>
              Enough youths not going into agriculture and thereby causing the
              sector to lack adequate literacy level
            </li>
          </ul>

          <ul className="list-disc pl-6 text-gray-400">
            <li>
              Limited access to agricultural financing, insurance, and markets.
            </li>
            <li>
              Lack of modern tools, asset insurance and maintenance for farms
            </li>
            <li>Lack of tools for early disease detection and control</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
