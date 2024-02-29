import { Fragment, useRef,useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const Listitem = ({data , handleDisplay}) =>{
    
    const handlearray = id =>{
        handleDisplay(id)
    }
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline()

            tl.from(".imgcont",{
                duration:0.5,
                opacity:0,
                delay:1
            })
            tl.from(".cart",{
                scrollTrigger:{
                    trigger:".cart",
                    start: "20px 65%" ,
                    end:"-110px 40%",
                    toggleActions:"play pause reverse"
                    },
                opacity:0.2
                
            })

        },comp)
        return ()=>ctx.revert();
    },[])
    return(
        <Fragment>
            <main ref={comp} >
                <section className="cart" >
                    <div onClick={() =>handlearray(data.id)} className="imgcont">
                        <img src={data.image} alt={data.Name} />
                    </div>
                    <div className="descrip">
                        <h4>Title : {data.Title}</h4>
                        <h5>Genre : {data.Genre}</h5>
                        <small>Release-Date : {data.Release}</small>
                        
                        <div className="price">
                            <h4>Price : </h4>
                            <div>
                            <span className="span" >{data.DiscoutedPrice}</span>
                            <small>{data.Price}</small></div>
                        </div>
                        
                    </div>
                </section>
            </main>
            
        </Fragment>
    )
}

export default Listitem;