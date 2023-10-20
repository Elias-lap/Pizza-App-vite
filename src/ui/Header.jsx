import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";





function Header() {
 
  return (
    <header className=" flex justify-between border-b   border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link className="tracking-widest" to={'/'} >
        The React App....
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
