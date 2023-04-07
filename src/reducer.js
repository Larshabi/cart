import { act } from "react-dom/test-utils"

const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart:[]}
    }
    if(action.type === 'REMOVE'){
        const removeItem = state.cart.filter((cartItem)=> cartItem.id !== action.payload)
        return {...state, cart:removeItem}
    }
    if(action.type === 'INCREASE'){
        let item = state.cart.map((cartItem)=>{
            if(cartItem.id === action.payload){
                return {...cartItem, amount:cartItem.amount + 1}
            }
            return cartItem
        })
        return {...state, cart:item}
    }
    if(action.type === 'DECREASE'){
        let item = state.cart.map((cartItem)=>{
            if(cartItem.id === action.payload){
                return {...cartItem, amount:cartItem.amount - 1}
            }
            return cartItem
        }).filter((cartItem)=> cartItem.amount !== 0)
        return {...state, cart:item}
    }
    if(action.type === 'GET_TOTALS'){
        let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem
            const itemTotal = price * amount
            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        }, {
            total:0,
            amount:0
        })
        total = parseFloat(total.toFixed(2))
        return {...state, total, amount}
    }
    if(action.type === 'LOADING'){
        return {...state, loading:true}
    }
    if(action.type === 'DISPLAY_ITEMS'){
        return {...state, cart:action.payload, loading:false}
    }

    return state
}

export default reducer;