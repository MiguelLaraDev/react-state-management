import { faCartShopping, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useCartStore, type CartStoreItem } from "../stores/cart.store";

const CartWidgetItem = ({ item, onRemove }: { item: CartStoreItem; onRemove: () => void }) => {
  const { id, name, price, quantity } = item;

  return (
    <div key={id} className='w-full flex flex-row items-center gap-4'>
      <img src='/images/img-example.webp' className='w-6 h-6' />
      <p className='flex-grow flex-1'>{name}</p>
      <p className='font-semibold'>{price} €</p>
      <p className='rounded-full px-2 py-0 bg-green-100 text-sm'>{quantity}</p>
      <button
        className={classNames(
          "w-4 h-4 p-3 flex items-center justify-center",
          "rounded-full bg-neutral-200 text-neutral-400",
          "cursor-pointer hover:bg-neutral-300"
        )}
        onClick={onRemove}
      >
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </div>
  );
};

const CartWidget = () => {
  const { cart, remove, getCount, getTotalPrice } = useCartStore();
  const count = getCount();
  const totalPrice = getTotalPrice();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setExpanded(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {expanded &&
        createPortal(
          <div
            className={classNames(
              "fixed top-10 right-6 z-50",
              "w-fit min-w-64 p-4 border border-neutral-200 bg-white",
              "flex flex-col gap-6 shadow-md rounded-xl"
            )}
          >
            <div className='flex flex-row items-center justify-between'>
              <h2 className='font-semibold text-xl'>Your shopping cart</h2>

              <button
                className={classNames(
                  "w-6 h-6 rounded-full ml-auto",
                  "relative -top-2 -right-2",
                  "flex items-center justify-center",
                  "hover:bg-neutral-200 cursor-pointer"
                )}
                onClick={() => setExpanded(false)}
              >
                <FontAwesomeIcon icon={faRemove} className='text-lg text-neutral-400' />
              </button>
            </div>

            {count > 0 && (
              <>
                {cart.map((item) => (
                  <CartWidgetItem key={item.id} item={item} onRemove={() => remove(item.id)} />
                ))}

                <div className='flex flex-row items-center gap-2 pt-3 border-t border-t-neutral-200'>
                  <p className='ml-auto font-semibold'>Total: {totalPrice} €</p>
                </div>
              </>
            )}

            {count === 0 && <p>No items yet!</p>}
          </div>,
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
