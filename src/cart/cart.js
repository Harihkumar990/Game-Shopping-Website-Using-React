import { Fragment } from "react"

const Cart = ({data,onchange,onchangequantity}) =>{
    const hanlderemove  = id =>{
        onchange(id)
    
    }
    const handlequantity = (id,value) =>{
        if(value === 1){
            return () => onchangequantity(id,1)
        }else if(value === -1){
           return () => onchangequantity(id,-1)
        }
    }
    
    return(
        <Fragment>
            <main  className="cart-main-container">
                <section className="sub-cart-container" >
                    
                    <div className="description-container" >
                        <div className="item-description">
                            <img src={data.image} alt={data.Name} />
                            <span>{data.Name}</span>
                            <span>{data.Genre}</span>
                        </div>
                        <div className="quantity-container" >
                            <span>{data.quantity}</span>
                            <div className="increment-and-decrement" >
                                <button onClick={handlequantity(data.id,-1)} >-</button>
                                <span>{data.quantity}</span>
                                <button onClick={handlequantity(data.id,1)} >+</button>
                            </div>
                        </div>
                        <div className="price-container"> 
                            <button onClick={() =>hanlderemove(data.id)} >Remove</button>
                            <span>{data.DiscoutedPrice * data.quantity}</span>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}


export default Cart