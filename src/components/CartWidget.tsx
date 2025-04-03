import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "../stores/cart.store";

const CartWidget = () => {
  const count = useCartStore((state) => state.cart.length);

  return (
    <div className='relative'>
      {count > 0 && <span className='absolute'>{count}</span>}
      <button>
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
};
export default CartWidget;
