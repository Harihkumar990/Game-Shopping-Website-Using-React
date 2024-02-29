import { Fragment, useState } from "react";
import Cart from "../cart/cart";
import { useNavigate } from "react-router";
import SearchBox from "./search";
import Modal from "../modal/Modal";
import OrderModal from "../modal/orderModal";


const Navbar  = ({item,removeitem,Handleitems,emptyitem}) =>{
    

    const [order,setorder] = useState(false);
    const [modal,setmodal] = useState(false);

    const orderNow = () =>{
      
        setorder(previous => !previous)
    }
    
    const handleitem = (id,value) =>{
        if(value === 1){
            Handleitems(id,value)
        }else if(value === -1){
            Handleitems(id,value)
        }
    }
    
    const navigate = useNavigate();
    const itemremove = id =>{
        removeitem(id)
        
    }
    

    const homepage = () =>{
        navigate('/')
    }
   
    
    const handlemodal = () =>{
        setmodal(previous => !previous)
    }

    const orderSendfirebase = () =>{
        let array  = localStorage.getItem("token")
        if(array){
            setorder(previous => !previous)
            setmodal(false)
            emptyitem()
        }else{
            alert("You have to login first")
            navigate("/")
            
            setorder(false)
            setmodal(false)
            emptyitem()
        }        
    }
    return (
        <Fragment>
            <nav className="NavParent displayflex bg-dark" >
                <div className = {"headingparent displayflex"} >
                    <h5>URBAN GAME</h5>
                    <div className="displayflex">

                        <button onClick={homepage} ><span className="material-symbols-outlined home">home</span></button>
                        <button onClick={handlemodal} ><span className="material-symbols-outlined carts ">shopping_cart</span><span className="displaycart">{item.length}</span></button>
                    </div>
                </div>
                <SearchBox/>
                {
                    modal && <Modal onClose=  {handlemodal} className = "animate">
                        {
                            item?.length >0 ?  <section className="cart-container" >
                            <div className="name-container" >
                                <span className="desc" >Description</span>
                                <span className="quan">Quantity</span>
                                <span className="rem" >Remove</span>
                                <sapn className ="pri" >Price</sapn>
                            </div>
                            {
                                item.map(elem => <Cart  key={elem.id}  data = {elem} onchange ={(id) => itemremove(id)}  onchangequantity={(id,value) =>handleitem(id,value)} />)
                            }
                            <section className="order" > 
                                <div className="totalprice" >
                                    <span>TotalPrice :</span>
                                    <sapn>{
                                            item.reduce((acc,curr)=>{
                                                return acc  + (curr.DiscoutedPrice * curr.quantity)
                                            },0)
                                        }</sapn>
                                </div>
                                <button onClick={orderSendfirebase}   >Order Now</button>
                            </section>
                        </section> : <h1>Add Item</h1>
                        }
                    </Modal>
                    
                    }
                    {
                        order && <OrderModal  onClose = {orderNow} />
                    }

                
            </nav>
            
        </Fragment>
    )
}

export default Navbar;