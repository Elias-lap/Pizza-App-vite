import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decraseItemQuantity, increaseItemQuantity } from "./CartSlice";

// eslint-disable-next-line react/prop-types
function UpdateItemQuntity({ pizzaId, idpizza }) {
  const dispatch = useDispatch();

  return (
    <div className="space-x-2">
      <Button
        onclick={() => dispatch(increaseItemQuantity(pizzaId))}
        type={"round"}
      >
        +
      </Button>
      <span className="px-1"> {idpizza}</span>
      <Button
        onclick={() => dispatch(decraseItemQuantity(pizzaId))}
        type={"round"}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuntity;
