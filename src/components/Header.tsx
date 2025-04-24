import classNames from "classnames";
import { Link } from "react-router-dom";

import logo from "@assets/logo.svg";
import CartWidget from "./cart/CartWidget";

const Header = () => {
  return (
    <header
      className={classNames(
        "fixed w-full h-12 py-2 px-4 z-1 bg-white shadow",
        "flex flex-row items-center justify-between",
        "md:z-50 md:px-6",
      )}
    >
      <div className="w-8" />

      <Link to="/">
        <img src={logo} alt="Logo" className="h-8" />
      </Link>

      <CartWidget />
    </header>
  );
};

export default Header;
