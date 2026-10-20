"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LABELS = ["Front", "Back", "In real life"];

export default function Carousel({ images, alt, tint }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  // Reset to first slide when the image set changes (variant switch)
  const key = images.join("|");
  useEffect(() => { setI(0); }, [key]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    timer.current = setInterval(() => {
      setI((cur) => (cur + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, [paused, key, images.length]);

  function go(n) {
    setI(((n % images.length) + images.length) % images.length);
  }

  return (
    <div
      className="carousel-box"
      style={{ background: tint }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, idx) => (
        <div key={src} className={"cslide" + (idx === i ? " on" : "")}>
          <Image
            src={src}
            alt={alt + " — " + (LABELS[idx] || "view " + (idx + 1))}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority={idx === 0}
          />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button className="cnav prev" aria-label="Previous image" onClick={() => go(i - 1)}>←</button>
          <button className="cnav next" aria-label="Next image" onClick={() => go(i + 1)}>→</button>
          <div className="cdots">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={"cdot" + (idx === i ? " on" : "")}
                aria-label={LABELS[idx] || "Image " + (idx + 1)}
                onClick={() => go(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
