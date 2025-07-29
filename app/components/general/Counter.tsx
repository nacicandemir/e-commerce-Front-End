
import { CardProductProps } from "../detail/DetailClient";

interface CounterProps {
  cardProduct: CardProductProps;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const Counter: React.FC<CounterProps> = ({
  cardProduct,
  increaseFunc,
  decreaseFunc,
}) => {
  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-md px-1 py-1 w-fit m-2 bg-gray-50">
  <button
    onClick={decreaseFunc}
    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-red-500 text-xl font-bold rounded-full transition-all duration-200 focus:outline-none"
    aria-label="Miktarı azalt"
  >
    −
  </button>
  <span className="text-md font-semibold text-gray-800 px-1 min-w-[20px] text-center">
    {cardProduct?.quantity}
  </span>
  <button
    onClick={increaseFunc}
    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-green-500 text-xl font-bold rounded-full transition-all duration-200 focus:outline-none"
    aria-label="Miktarı artır"
  >
    +
  </button>
</div>
  );
};

export default Counter;
