import { combineReducers } from "redux";

const MainReducer = (state = {
    item:[],
    totalamount:0
},action) =>{
    const {type,payload} = action;
    switch(type){
        case "ADD_ITEM":
            console.log("true")
            let item = [...state.item]
            let index = item.findIndex(i => i.id === payload.item.id);
            if(index>-1){
                item[index] ={
                    ...item[index],
                    quantity: item[index].quantity+1
                }
            }else{
                item.push({
                    ...payload.item,
                    quantity:1
                })
            }
            const totalamount = state.totalamount  + payload.item.Discountprice
            return {
                ...state,
                item:item,
                totalamount:totalamount
            }
        case "REMOVE_ITEM":
            let item2 = [...state.item]
            let index2 = item2.findIndex(i => i.id === payload.id)
            let Totalamount = state.totalamount - item2[index2].Discountprice
            if(item2[index2].quantity === 1){
                item2.splice(index2,1);
            }else{
                item2[index2] = {
                    ...item2[index2],
                    quantity:item2[index2].quantity-1
                }
            }
            return{
                ...state,
                item:item2,
                totalamount:Totalamount
                
            }
        case "Clear_item":
            return{
                item:[],
                totalamount:0
            }
        
        default:
            return state;
    }
}

export default MainReducer;