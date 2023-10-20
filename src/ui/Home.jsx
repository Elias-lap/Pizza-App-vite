// import AppLayout from "./AppLayout";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
function Home() {


  const userName = useSelector(state=>state.user.userName)
  console.log(userName)
  return (
    <div className="my-10 p-4 text-center sm:my-16">
      {/* <AppLayout/> */}
      <h1 className=" mb-8  text-xl font-semibold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName === ''  ? (<CreateUser /> ): (<Button type={"primary"} to={'/menu'}>Back TO Mene ,{userName}</Button> )}
     
     
      
    </div>
  );
}

export default Home;
