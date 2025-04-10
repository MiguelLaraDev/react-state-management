import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface ButtonProps {
  className?: string;
  icon?: IconDefinition;
  label: string;
  onClick: () => void;
}

const Button = ({ className = "", icon, label, onClick }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "flex flex-row items-center gap-2 bg-black text-white text-sm px-4 py-1",
        "rounded-4xl",
        "hover:opacity-80 whitespace-nowrap",
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
