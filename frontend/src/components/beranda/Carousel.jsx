import React, { useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

const Carousel = () => {
  const slides = [
    {
      url: "/housing.png",
    },
    {
      url: "/housing2.png",
    },
    {
      url: "/boarding.png",
    },
    {
      url: "/boarding2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="h-[433px] w-full relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-[20px] p-1 bg-black/20 text-white cursor-pointer">
        <BiSolidChevronLeft onClick={prevSlide} size={80} />
      </div>
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-[20px] p-1 bg-black/20 text-white cursor-pointer">
        <BiSolidChevronRight onClick={nextSlide} size={80} />
      </div>
      <div className="flex justify-center bottom-0 py-4 absolute w-full gap-3">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer rounded-full ${
              slideIndex == currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
