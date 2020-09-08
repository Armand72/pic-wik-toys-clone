import React, { FunctionComponent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Arrow from "../assets/img/arrow";

export interface Props {
  links: { link: string }[];
  title: string;
}

const Accordeon: FunctionComponent<Props> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <motion.header
        initial={false}
        onClick={() => setExpanded(expanded ? false : true)}
        className="footer__header"
      >
        <p>{props.title}</p>
        <div>
          <Arrow />
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="footer__list"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            {props.links.map((props) => (
              <div className="footer__item">
                <p>{props.link}</p>
              </div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordeon;
