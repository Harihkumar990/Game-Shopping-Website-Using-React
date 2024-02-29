import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../modal/loading";
import Listitem from "./ListItems";
import { useParams,useNavigate } from "react-router";

const Product = ({onChange}) =>{
    const [showloading,setshowloading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const [obj,setobj] = useState([]);
  
    const [array ,setarray] = useState([
        {
            "Name":"Lies Of P",
            "DiscoutedPrice":2000,
            "Genre":"Action, Adventure,RPG",
            "Release":"18 Sep,2023",
            "Title":"Lies of P Deluxe Edition Multi12-ElAmingo",
            "image":"./content/lies.jpg"
        }
    ]);
    useEffect(()=>{
        let slug;
        if(params.Action){
            slug = params.Action;
        }
        const getdata = async () =>{
            try{
                const { data } = await axios.get(`https://games-606b9-default-rtdb.firebaseio.com/${slug}.json`);
                if(!data){
                    throw Error
                    
                }else{
                    setshowloading(false)
                    setobj(data);

                }
                
            }catch(error){
                navigate('/Error4O4');
            }
        }
        getdata()
    },[params,navigate])

   const handleDisplay = id =>{
    let list =obj.filter(item=>item.id===id);
    setarray(list);
    
   }
   const handleorder = (id) =>{
        onChange(array)


   }



    return(
        <Fragment>
            {
                showloading && <Loading/>
            }
            <div  className={"image-container"}>
               <img src="listgame.avif" alt="noimage"/>
               <section className="sections displayflex" >
                    <div className="nameprice">
                        <div className="orderbtn displayflex">
                        
                        <h1>{array[0].Name}</h1>
                        <button onClick={()=> handleorder(array[0].id)} >Order</button>
                        </div>
                        
                        <div className="small"> <small>{array[0].Release}</small></div>
                        
                        <div className="description">
                            <span>
                                Genre : {array[0].Genre}
                            </span>
                            <br/>
                            <span>
                            {array[0].Title}
                            </span>
                            
                            <br/>
                            <span> Price : {array[0].DiscoutedPrice}</span>
                        </div>
                        
                    </div>
                    <div className="gamebox">
                        <img src={array[0].image} alt="noimage"/>
                    </div>
                    
                </section> 
            </div>
            <div className="main"  >
                    
                {
                    obj.map(item => <Listitem   key={item.id}  handleDisplay={handleDisplay} data = {item}/>)
                }
            </div>
        </Fragment>
    )
}

export default Product;