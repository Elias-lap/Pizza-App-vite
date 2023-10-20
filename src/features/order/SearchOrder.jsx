import { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const Navigate = useNavigate();
  const [idSearch, setidSearch] = useState("");
  console.log(idSearch);

  function handelsubmit(e) {
    e.preventDefault();
    if (!idSearch) return;
    Navigate(`/order/${idSearch}`);
    setidSearch("");
  }

  return (
    <form onSubmit={handelsubmit}>
      <input 
        className=" w-28 rounded-xl bg-yellow-100 py-2 transition-all duration-75  focus:ring focus:ring-yellow-400
         placeholder:ps-2 placeholder:text-stone-400 focus:w-28 focus:outline-none sm:w-64 sm:focus:w-72
         "
        value={idSearch}
        placeholder="Search Here #"
        onChange={(e) => setidSearch(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchOrder;
