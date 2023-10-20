import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useLoaderData } from "react-router-dom";

function Menu() {
  const ApiMenu = useLoaderData();
  // console.log(ApiMenu);
  return (
    <>
      <ul className="divide-y divide-stone-200 ">
      {ApiMenu.map((pizza)=>(<MenuItem  pizza={pizza} key={ pizza.id}/>))}
      </ul>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const ApiMenu = await getMenu();
  return ApiMenu;
}
export default Menu;
