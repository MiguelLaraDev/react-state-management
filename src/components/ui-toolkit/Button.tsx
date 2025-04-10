import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface ButtonProps {
  size?: "sm" | "md";
  className?: string;
  icon?: IconDefinition;
  label: string;
  onClick: () => void;
}

const Button = ({ className = "", icon, label, size = "sm", onClick }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "flex flex-row items-center gap-2 bg-black text-white",
        "font-semibold",
        "rounded-4xl cursor-pointer",
        "hover:opacity-80 whitespace-nowrap",
        {
          "px-4 h-8 text-sm": size === "sm",
          "px-6 h-12 text-base": size === "md",
        },
        className
      )}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <p>{label}</p>
    </button>
  );
};

export default Button;
