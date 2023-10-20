import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { GetCarts, clearCart } from "./CartSlice";

function Cart() {
  const cart = useSelector(GetCarts);
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  function handelClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className=" px-4 py-4">
      <LinkButton
        className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="mt-3 divide-y-2 ">
        {cart.map((cart, index) => (
          <CartItem key={index} item={cart} />
        ))}
      </ul>
      <div className="mt-4 space-x-4">
        <Button type={"primary"} to="/order/new">
          Order pizzas
        </Button>
        <span className="ms-2">
          <Button onclick={handelClearCart} type={"secondary"}>
            {" "}
            Clear cart
          </Button>
        </span>
      </div>
    </div>
  );
}

export default Cart;
