import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ children, disabled, to, type ,onclick}) {
  const className = `inline-block rounded-3xl text-sm bg-yellow-400 font-semibold 
     uppercase tracking-wide text-stone-800 hover:bg-yellow-300 
      focus:ring  focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed   focus:outline-none `;
  const base = {
    primary: className + " p-4 mt-2",
    small: className + " p-3",
    secondary: `inline-block rounded-3xl  font-semibold border border-2 border-stone-300
    uppercase tracking-wide text-stone-600 hover:bg-stone-300 focus:bg-stone-300
    focus:outline-none focus:ring  focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed p-3 mt-2 `,
    round: className + "p-2"
  };
  if (to)
    return (
      <Link className={base[type]} to={to}>
        {children}
      </Link>
    );
  

    if(onclick) return (
      <button onClick={onclick} disabled={disabled} className={base[type]}>
        {children}
      </button>
    )
  return (
    <>
      <button disabled={disabled} className={base[type]}>
        {children}
      </button>
    </>
  );
}

export default Button;
