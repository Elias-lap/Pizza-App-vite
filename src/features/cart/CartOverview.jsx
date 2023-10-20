import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalItemsQuantity, getTotalItemsPrice } from "./CartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const CartQuantity = useSelector(getTotalItemsQuantity);
  const TotalItemsPrice = useSelector(getTotalItemsPrice);
  if(!CartQuantity) return null
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-300 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-200 sm:space-x-6">
        <span>{CartQuantity} pizzas</span>
        <span>{formatCurrency(TotalItemsPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
