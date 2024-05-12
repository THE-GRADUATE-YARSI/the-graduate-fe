import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimasiAngka = ({ end }) => {
  const [count, setCount] = useState(0);
  const props = useSpring({
    number: count,
    from: { number: 0 },
    to: { number: end },
  });

  // Fungsi untuk menghentikan animasi ketika mencapai angka tertentu
  const stopAnimasi = () => {
    if (count < end) {
      setCount(count + 1);
    }
  };

  return (
    <div onClick={stopAnimasi}>
      <animated.span>
        {props.number.to((value) => Math.floor(value))}
      </animated.span>
    </div>
  );
};

export default AnimasiAngka;
