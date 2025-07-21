"use client";
export default function NewsletterSection() {
  // const [email, setEmail] = useState("");

  // const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   console.log("Email submitted:", email);
  //   setEmail("");
  //   alert("Thanks for Subscribing");
  // };

  return (
    <>
      {/* <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${img.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="relative container mx-auto text-center text-white px-8 md:px-24 lg:px-48 xl:px-64">
          <h2 className="text-4xl md:text-5xl font-semibold font-playfair mb-6">
            Subscribe to our <span className="text-primary">Newsletter</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 leading-relaxed">
            Get insights into how we&apos;re optimizing crop yields, conserving
            resources, and creating new opportunities for communities. Whether
            you&apos;re a farmer, an investor, or simply passionate about the
            future of food, our newsletter is your gateway to staying connected
            with the revolution in agriculture. Don&apos;t miss out—sign up
            today and be part of the journey towards a smarter, greener future!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-[1_0_180px] px-6 py-3 border border-white rounded-md bg-[#80808080] text-white focus:outline-none"
              required
            />
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </form>
        </div>
      </section> */}
    </>
  );
}
