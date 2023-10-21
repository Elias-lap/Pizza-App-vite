import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { GetCarts, GetCartsbyid, addItem } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import { useSelector } from "react-redux";
import UpdateItemQuntity from "../cart/UpdateItemQuntity";
// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const idpizza = useSelector(GetCartsbyid(id));
  const IsInCard = idpizza > 0;
  const dispatch = useDispatch();
  function handelAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 p-4">
      <img
        className={` ${soldOut ? "opacity-70 grayscale" : ""}   w-24`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-grow  flex-col ">
        <p>{name}</p>

        <p className=" capitalize italic text-stone-500 ">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {!soldOut && !IsInCard && (
            <>
              <Button onclick={handelAddToCart}  type={"small"}>
                add to Cart
              </Button>
            </>
          )}
          {IsInCard ? (
            <>
              <DeleteItem pizzaId={id}>Delete </DeleteItem>
              <span className="hidden sm:inline-block"><UpdateItemQuntity idpizza={idpizza} pizzaId={id}/></span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
