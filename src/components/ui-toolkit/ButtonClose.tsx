import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface ButtonCloseProps {
  onClick: () => void;
}

const ButtonClose = ({ onClick }: ButtonCloseProps) => {
  return (
    <button
      className={classNames(
        "w-6 h-6 rounded-full ml-auto",
        "relative -top-2 -right-2",
        "flex items-center justify-center",
        "hover:bg-neutral-200 cursor-pointer",
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faRemove} className="text-lg text-neutral-400" />
    </button>
  );
};

export default ButtonClose;
