import { useEffect } from "react";

const useFixedPositionOnScroll = (
  ref: React.RefObject<HTMLElement | null>,
  offset: number,
  padding = 0
) => {
  const style = `position: fixed; top: ${offset - padding}px;`;

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        const yPos = current?.getBoundingClientRect().y || 0;

        if (scrollDirection === "down" && yPos < offset) {
          current.setAttribute("style", style);
        } else if (scrollDirection === "up" && currentScrollY <= offset) {
          current.removeAttribute("style");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, offset, style]);
};
export default useFixedPositionOnScroll;
