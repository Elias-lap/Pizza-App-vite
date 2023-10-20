// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { GetCarts, clearCart, getTotalItemsPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { store } from "../../Store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAdress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(GetCarts);
  const submitting = useNavigation();
  const isSubmitting = submitting.state === "submitting";
  const errorsForm = useActionData();
  const {
    userName,
    adress,
    position,
    status: adressStatus,
    error: errorsLocation,
  } = useSelector((state) => state.user);
  const isFetching = adressStatus === "loading";
  const totalPrice = useSelector(getTotalItemsPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriority = totalPrice + priorityPrice;
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold ">Ready to order? Let s go!</h2>

      <Form method="POST" className="mt-6">
        <div className="mt-6 flex grow flex-col gap-2  sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">Phone number</label>

          <div className="grow  ">
            <input type="tel" name="phone" required className="input w-full" />
            {errorsForm?.phone && (
              <p className="rounded-md bg-red-400 p-2 text-sm text-red-600">
                {errorsForm.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" relative mb-2 mt-6 flex flex-col gap-2 sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow ">
            <input
              className=" input  w-full"
              type="text"
              name="address"
              required
              disabled={isFetching}
              defaultValue={adress}
            />
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-9  sm:top-[2px] ">
              <Button
                disabled={isFetching}
                type={"small"}
                onclick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAdress());
                }}
              >
                Get Adress
              </Button>
            </span>
          )}
        </div>
        {adressStatus === "error" && (
          <p className="rounded-md bg-red-400 p-2 text-sm text-red-600">
            {errorsLocation}
          </p>
        )}
        <div className="mt-4 flex gap-5">
          <input
            className="focus:rinng h-6  w-6 accent-yellow-400 focus:ring-yellow-400 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}  , ${position.longitude}` : ''  } />
          <Button type={"primary"} disabled={isSubmitting || isFetching}>
            {" "}
            {isSubmitting
              ? "placing order..."
              : `order now from ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  store.dispatch(clearCart());
  const newOrder = await createOrder(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please Enter a valid number for contacting with you ";
  if (Object.keys(errors).length > 0) return errors;
  // return null
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
