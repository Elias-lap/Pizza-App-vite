

import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "./DeleteItem";
import UpdateItemQuntity from "./UpdateItemQuntity";
import { GetCartsbyid } from "./CartSlice";

// eslint-disable-next-line react/prop-types
function CartItem({ item }) {

  // eslint-disable-next-line react/prop-types
  const { pizzaId, name, quantity, totalPrice } = item;
  const idpizza = useSelector(GetCartsbyid(pizzaId));
  return (
    <li className="p-4 flex   flex-col sm:flex-row  sm:justify-between">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} > Delete item</DeleteItem>
        <UpdateItemQuntity  idpizza={idpizza} pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
