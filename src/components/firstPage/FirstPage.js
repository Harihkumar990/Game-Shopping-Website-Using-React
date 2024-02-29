import { Fragment } from "react";
import { useEffect , useRef} from "react";
import gsap from "gsap";
import LOGIN from "./loginsignup";


const FirstPage =() =>{
    
    const comp = useRef(null)
    useEffect(()=>{
        const context = gsap.context(()=>{
            let tl = gsap.timeline()
            tl.from('#txt1',{
                xPercent:-40,
                opacity:0,
                delay:0.2,
                stagger:0.5,
                duration:1
            })
        },comp)
        return ()=>context.revert()
    },[])
    return(
        <Fragment>
            
            <div className="box" ref={comp}>
                
                <div className="quotes" >
                    <h1 id="txt1">Level UP </h1>
                    <h1 id="txt1">YOUR GAMING</h1>
                    <h1 id="txt1" className="txt3">EXPERIENCE</h1>
                    <h1 id="txt1" className="txt4">WITH URBAN GAMES</h1>

                </div>
                
                <LOGIN  />

                
            </div>
        </Fragment>
    )
}
export default FirstPage