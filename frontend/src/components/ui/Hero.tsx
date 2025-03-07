import React from "react";

import Image from "next/image";

import heroImage from "../../../public/images/environment.jpg";

const Hero = (): React.JSX.Element => {
  return (
    <section className="flex items-center justify-center max-w-[1300px] gap-20 mx-auto flex-wrap-reverse xl:flex-nowrap py-10">
      <div className="flex items-center justify-end text-center xl:text-left gap-20 px-10 w-[50%]">
        <div>
          <h2 className="text-3xl font-bold"> Social Friends </h2>
          <span className="text-[16px] flex items-center justify-end  ">
            <br />
            Building a Greener Future Through Eco-Friendly Practices like
            Planting Trees, using eco-friendly products, collecting and dumping
            garbage responsibliy, Electric Vehicle , running environment
            campaign and many more....
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center py-10 px-10  w-[50%]">
        <Image
          src={heroImage}
          alt="hero image"
          className="rounded-2xl overflow-hidden object-cover w-full max-h-[50rem] max-w-[50rem] md:max-w-full md:max-h-full md:min-w-[45rem] md:min-h-[30rem]"
        />
      </div>
    </section>
  );
};

export default Hero;
