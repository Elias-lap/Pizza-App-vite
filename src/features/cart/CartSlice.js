import { createSlice } from "@reduxjs/toolkit"

const initialState ={
  cart:[]
    // cart :[ {
    //     pizzaId: 6,
    //     name: "Vegetale",
    //     quantity: 0,
    //     unitPrice: 13,
    //     totalPrice: 13,
    //   }]
}


const CartSlice=createSlice({
    name :'Cart' ,
    initialState ,
    reducers :{
        addItem(state , action){
             state.cart.push(action.payload)
        },
        deleteItem(state , action){
         state.cart=  state.cart.filter( pizza =>  pizza.pizzaId !== action.payload)
        },
        increaseItemQuantity(state , action){
          const item = state.cart.find(item=>item.pizzaId === action.payload)
          item.quantity ++;
          item.totalPrice = item.quantity * item.unitPrice
        },
        decraseItemQuantity(state , action){
            const item = state.cart.find(item=>item.pizzaId === action.payload)
            item.quantity --
            item.totalPrice = item.quantity * item.unitPrice;
            if(item.quantity === 0 ) CartSlice.caseReducers.deleteItem(state,action)
        },
        clearCart(state ){
          state.cart= []
        },
        
    }
})
 export let CartReducer =CartSlice.reducer ;
 export const {addItem ,deleteItem,increaseItemQuantity, decraseItemQuantity ,clearCart} =CartSlice.actions ;
 export const GetCarts=state=>state.cart.cart
 export const getTotalItemsQuantity=state=>state.cart.cart.reduce((sum ,item)=>sum +item.quantity ,0)
 export const getTotalItemsPrice=state=>state.cart.cart.reduce((sum ,item)=>sum +item.totalPrice ,0)
 export const GetCartsbyid =(id)=> (state)=>state.cart.cart.find((item)=>item.pizzaId === id)?.quantity ?? 0