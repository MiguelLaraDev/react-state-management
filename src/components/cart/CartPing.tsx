import { useEffect, useState } from "react";

interface CartPingProps {
  count: number;
}

const CartPing = ({ count }: CartPingProps) => {
  const [lastCount, setLastCount] = useState(0);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setLastCount(0);
      return;
    }

    if (count <= lastCount) return;

    setEnable(true);
    setLastCount(count);

    const timeout = setTimeout(() => setEnable(false), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

  if (!enable) {
    return null;
  }

  return (
    <span id="cart-ping" className="absolute flex size-8 -top-1 -left-1">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
      <span className="absolute inline-flex size-4 rounded-full animate-ping bg-green-500 top-2 left-2 opacity-75"></span>
    </span>
  );
};

export default CartPing;
