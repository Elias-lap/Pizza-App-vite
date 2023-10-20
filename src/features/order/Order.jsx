// Test ID: IIDSAT
import { useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  console.log(cart);
  return (
    <div className=" space-y-8 px-4 py-6">
      <div className=" flex flex-wrap justify-between ">
        <h2 className=" mb-3  text-xl font-semibold"> order {id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="  bg-red-500 px-2 py-1 font-semibold tracking-wide text-red-50 ">
              Priority
            </span>
          )}
          <span className="bg-green-500 px-2 py-1 font-semibold tracking-wide text-red-50 ">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between bg-stone-300 px-4 py-6 ">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="space-y-2  divide-y-2 border-t-2 ">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>
      <div className=" space-y-4 py-6">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const idOrder = await getOrder(params.orderId);
  return idOrder;
}
export default Order;
