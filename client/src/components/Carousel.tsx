import React, { FunctionComponent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import windowSize from "../utils/WindowSize";

const images = [
  "/images/mobile1.jpg",
  "/images/mobile2.jpg",
  "/images/mobile3.jpg",
];

const imageDesktop = ["/images/champion.jpg", "/images/contact.jpg"];

const variants = {
  enter: () => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Carousel: FunctionComponent = () => {
  const [[page, direction], setPage] = useState<number[]>([0, 0]);
  const [axis, setAxis] = useState<string | boolean>(false);

  const dimension = windowSize();
  let buttonCarousel;

  if (dimension.width > 960) {
    buttonCarousel = imageDesktop;
  } else {
    buttonCarousel = images;
  }

  const paginate = (
    newDirection: number,
    e: TouchEvent | React.MouseEvent<HTMLButtonElement> | MouseEvent
  ) => {
    e.preventDefault();
    let direction: number;

    if (newDirection > page) {
      direction = 1;
      if (page === buttonCarousel.length - 1) {
        newDirection = 0;
      }
      setPage([newDirection, direction]);
    } else {
      direction = -1;
      if (page === 0) {
        newDirection = buttonCarousel.length - 1;
      }
      setPage([newDirection, direction]);
    }
  };

  const switchAxis = (axis: string) => {
    if (axis === "y") {
      setAxis(false);
    } else {
      setAxis("x");
    }
  };

  return (
    <>
      <div className="carousel">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={dimension.width > 960 ? imageDesktop[page] : images[page]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={dimension.width < 960 ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            dragDirectionLock
            onDirectionLock={(axis) => switchAxis(axis)}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              let total: number;

              if (swipe < -swipeConfidenceThreshold) {
                total = page + 1;
                if (total > images.length - 1) {
                  total = 0;
                }
                paginate(total, e);
              } else if (swipe > swipeConfidenceThreshold) {
                total = page - 1;
                if (total === -1) {
                  total = images.length - 1;
                }
                paginate(total, e);
              }
            }}
          />
        </AnimatePresence>
      </div>
      <div className="navigation">
        {buttonCarousel.map((props, index) => (
          <button
            key={index}
            className={
              index === page
                ? "navigation__item navigation__item--highlight"
                : "navigation__item"
            }
            onClick={(e) => paginate(index, e)}
          ></button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
