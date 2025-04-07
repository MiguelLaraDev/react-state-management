import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useCartStore } from "../stores/cart.store";

const CartWidget = () => {
  const { cart } = useCartStore();
  const count = cart.length;

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded &&
        createPortal(
          <div className='absolute top-12 right-6 z-50'>Shopping cart!</div>,
          document.body
        )}

      <div className='relative'>
        {count > 0 && (
          <span
            className={classNames(
              "absolute -top-2 -left-3 w-4 h-4 bg-green-600 rounded-full",
              "flex items-center justify-center",
              "text-white text-xs"
            )}
          >
            {count}
          </span>
        )}

        <button
          className='w-6 h-full hover:[&_svg]:text-neutral-400 cursor-pointer'
          onClick={() => setExpanded((v) => !v)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </>
  );
};
export default CartWidget;
