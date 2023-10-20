import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./CartSlice"

// eslint-disable-next-line react/prop-types
function DeleteItem({pizzaId , children}) {
    const dispatch=useDispatch()

    function handelDeleteItem(pizzaId){


        dispatch(deleteItem(pizzaId))
      }

    return (
      <><Button onclick={()=>handelDeleteItem(pizzaId)} type={"small"}>{children}</Button></>  
    )
}

export default DeleteItem
