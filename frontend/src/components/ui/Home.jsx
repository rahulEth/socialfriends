import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12 p-8 w-full ">
      {/* Why Go Green Section */}
      <section className="text-left py-20 gap-20 flex items-center justify-center max-w-[1280px] mx-auto">
        <div className="flex w-[50%] justify-center mt-6">
          <Image
            src="/images/img.webp"
            alt="Clean vs Polluted"
            width={600}
            height={300}
          />
        </div>
        <div>
          <h2 className="text-[48px] font-bold">Why Go Green?</h2>
          <p className="mt-4 text-[16px] text-left">
            Discover the benefits of eco-friendly practices and how they
            contribute to a better planet.
          </p>
        </div>
      </section>

      {/* Our Green Heroes Section */}
      <section className="text-left pb-10 gap-20 flex items-center justify-center max-w-[1280px] mx-auto">
        <div>
          <h2 className="text-[48px] font-bold">Our Green Heroes</h2>
          <p className="mt-4 text-[16px] text-left">
            m Top contributors making a difference.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Image
            src="/images/img2.avif"
            alt="Leaderboard"
            width={600}
            height={300}
          />
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="text-center bg-green-100 p-6 rounded-lg">
        <h2 className="text-3xl font-bold">Join the Movement</h2>
        <p className="mt-4">
          Be a part of the change! Every small action counts.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg">
          Get Started
        </button>
      </section>

      {/* Eco-Friendly Tips Section */}
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold">Eco-Friendly Tips</h2>
        <p className="mt-4">Follow these simple steps to make a big impact.</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 border rounded-lg">Use reusable bags</div>
          <div className="p-4 border rounded-lg">Recycle properly</div>
          <div className="p-4 border rounded-lg">Save water</div>
          <div className="p-4 border rounded-lg">Use public transport</div>
        </div>
      </section>

      {/* Impact Tracker Section */}
      <section className="text-center bg-blue-100 p-6 rounded-lg">
        <h2 className="text-3xl font-bold">Impact Tracker</h2>
        <p className="mt-4">
          See how our collective efforts are making a difference.
        </p>
        <div className="flex justify-center mt-6">
          <Image
            src="/images/img3.avif"
            alt="Impact Stats"
            width={600}
            height={300}
          />
        </div>
      </section>
    </div>
  );
}
