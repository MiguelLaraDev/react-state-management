import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import logo from "@assets/logo.svg";

const Header = () => {
  return (
    <header
      className={classNames(
        "sticky w-full h-12 py-2 px-6 bg-white shadow",
        "flex flex-row items-center justify-between"
      )}
    >
      <button>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div>
        <img src={logo} alt='Logo' className='h-8' />
      </div>

      <div>
        <button>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </header>
  );
};

export default Header;
