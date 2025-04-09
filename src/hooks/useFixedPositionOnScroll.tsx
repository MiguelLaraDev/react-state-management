import { useEffect } from "react";

const useFixedPositionOnScroll = (id: string | null, offset: number, padding = 0) => {
  useEffect(() => {
    if (!id) {
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      const ref = document.querySelector(`#${id}`);
      if (!ref) return;

      const style = `position: fixed; top: ${offset - padding}px;`;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        const yPos = ref?.getBoundingClientRect().y || 0;

        if (scrollDirection === "down" && yPos < offset) {
          ref.setAttribute("style", style);
        } else if (scrollDirection === "up" && currentScrollY <= offset) {
          ref.removeAttribute("style");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id, offset, padding]);
};
export default useFixedPositionOnScroll;
