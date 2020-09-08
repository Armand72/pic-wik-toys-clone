import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Basket = () => {
  const [length, setLength] = useState(0);
  const fetch = (state) => state.products.totalQuantity;
  const totalQuantity = useSelector(fetch);

  let currentBasket = JSON.parse(localStorage.getItem("cart") || "{}");

  useEffect(() => {
    let length = 0;
    if (Object.keys(currentBasket).length) {
      length = currentBasket.totalQuantity;
    }
    setLength(length);
  }, []);

  useEffect(() => {
    if (totalQuantity) {
      setLength(totalQuantity);
    }
  }, [totalQuantity]);

  return (
    <div style={{ position: "relative" }}>
      <svg version="1.1" viewBox="0 0 46 50" className="logo">
        <g fill="none" fill-rule="evenodd">
          <path
            pid="0"
            d="M37.756 37.158c-.455 8.738-8.38 12.614-18.832 12.614C8.473 49.772 0 43.501 0 35.763c0-7.736 6.385-15.369 16.837-15.369S38.21 28.42 37.756 37.158"
            fill="#00B0E7"
          ></path>
          <path
            pid="1"
            d="M28.957 24.348c.166-1.634.307-3.31.42-4.97-1.967-.055-3.92-.084-5.685-.069-6.51.056-14.988.524-17.802.689-.58 3.247-2.147 14.404 2.612 19.411 2.999 3.156 11.695 5.162 20.675 4.77 5.968-.26 10.625-1.614 12.152-3.532 1.707-2.145 2.397-6.506 1.997-12.611-.227-3.45-.753-6.567-1.03-8.044a394.805 394.805 0 00-10.461-.536c-.151 2.203-.317 4.038-.413 5.03.776.433 1.296 1.219 1.296 2.115 0 1.361-1.198 2.468-2.672 2.468-1.473 0-2.672-1.107-2.672-2.468 0-1.002.65-1.867 1.583-2.253zm-11.9-7.337c-.349-2.395-.87-7.347.303-9.85C18.58 4.553 23.124.91 26.688.375c2.04-.307 3.226.461 3.861 1.16.843.924 1.919 3.314 1.534 13.338a139.7 139.7 0 01-.098 2.132c5.95.22 11.347.595 11.426.6a1.232 1.232 0 011.12.966c.153.706 3.693 17.366-1.265 23.597-2.866 3.602-10.732 4.32-13.981 4.462-.71.031-1.442.047-2.185.047-7.634 0-16.668-1.663-20.394-5.584-6.473-6.81-3.195-21.89-3.052-22.53.12-.533.579-.924 1.127-.958.08-.005 5.99-.374 12.275-.595zm2.483-.078c1.415-.039 2.812-.066 4.13-.078 1.82-.015 3.832.015 5.855.071.347-6.714.179-12.662-.807-13.744-.125-.137-.503-.554-1.661-.38-2.826.425-6.647 3.662-7.458 5.393-.785 1.678-.49 5.904-.059 8.738zm10.398 9.668a.475.475 0 01.216 0 .475.475 0 01-.216 0z"
            fill="#000"
          ></path>
        </g>
      </svg>
      <span>
        <svg version="1.1" viewBox="0 0 20 16" className="logo--count">
          <path
            pid="0"
            d="M19.993 9.13C19.752 13.889 15.555 16 10.02 16 4.486 16 0 12.584 0 8.37 0 4.157 3.381 0 8.915 0c5.535 0 11.319 4.37 11.078 9.13"
            fill="#FFD400"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span class="logo--number">{length}</span>
      </span>
    </div>
  );
};

export default Basket;