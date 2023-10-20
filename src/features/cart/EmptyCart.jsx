import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mt-4">
      <LinkButton
        className=" text-sm text-blue-500 hover:text-blue-600 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <p className="py-3 font-semibold">
        {" "}
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
