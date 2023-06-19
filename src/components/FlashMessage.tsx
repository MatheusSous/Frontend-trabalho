"use client";
import { useEffect, useState } from "react";
import bus from '../utils/bus'

export function FlashMessage() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setType("");
      }, 3000);
    });
  }, []);

  if (type === "success") {
    return (
      <div
        className={`max-w-[50%] rounded text-center p-4 my-0 mt-4 mx-auto text-[#155724] border border-[#c3e6cb] bg-[#d4edda]`}
      >
        {message}
      </div>
    );
  } else if (type === "error") {
    return (
      <div
        className={`max-w-[50%] rounded text-center p-4 my-0 mt-4 mx-auto text-[#721c24] border border-[#f8d7da] bg-[#f5c4cb]`}
      >
        {message}
      </div>
    );
  } else {
    return <></>;
  }
}
