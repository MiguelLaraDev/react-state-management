import { useEffect } from "react";

const useScrollDisabled = (condition: boolean = true, target: HTMLElement = document.body) => {
  useEffect(() => {
    if (condition) {
      target.style.overflow = "hidden";
      target.style.position = "fixed";
      target.style.width = "100%";
    } else {
      target.style.overflow = "";
      target.style.position = "";
      target.style.width = "";
    }
  }, [condition, target]);
};

export default useScrollDisabled;
