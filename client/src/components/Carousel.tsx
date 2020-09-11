import React, { FunctionComponent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/mobile1.jpg",
  "/images/mobile2.jpg",
  "/images/mobile3.jpg",
];

const variants = {
  enter: (direction: number) => {
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

  const paginate = (
    newDirection: number,
    e: TouchEvent | React.MouseEvent<HTMLButtonElement> | MouseEvent
  ) => {
    e.preventDefault();
    let direction: number;

    if (newDirection > page) {
      direction = 1;
      setPage([newDirection, direction]);
    } else {
      direction = -1;
      setPage([newDirection, direction]);
    }
  };

  return (
    <>
      <div className="carousel">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[page]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
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
        {images.map((props, index) => (
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
