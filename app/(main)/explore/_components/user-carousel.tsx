import useEmblaCarousel from "embla-carousel-react";
import React from "react";

function UserCarousel({ children }: { children: React.ReactNode }) {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  );
}

export default UserCarousel;
