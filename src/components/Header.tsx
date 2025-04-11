import classNames from "classnames";

import logo from "@assets/logo.svg";
import CartWidget from "./cart/CartWidget";

const Header = () => {
  return (
    <header
      className={classNames(
        "fixed w-full h-12 py-2 px-4 z-0 bg-white shadow",
        "flex flex-row items-center justify-between",
        "md:z-50 md:px-6",
      )}
    >
      <div className="w-8" />

      <div>
        <img src={logo} alt="Logo" className="h-8" />
      </div>

      <CartWidget />
    </header>
  );
};

export default Header;
