import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Header = () => {
  return (
    <header
      className={classNames(
        "sticky w-full h-12 py-2 px-6 bg-neutral-50 shadow",
        "flex flex-row items-center justify-between"
      )}
    >
      <div>left</div>

      <div>logo</div>

      <div>
        <button>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </header>
  );
};

export default Header;
