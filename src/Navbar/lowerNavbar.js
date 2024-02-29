import { Fragment } from "react"
import gsap from "gsap"
import { useEffect,useRef } from "react"
import { NavLink } from "react-router-dom"
const SUbNavbar = () =>{
    const comp = useRef(null)
   
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline()
            tl.to(".ul",{
                yPercent:166,
                zIndex:1,
                delay:0.2,
                duration:2,
                ease:"elastic"
            })
            return ()=>ctx.revert()
        },comp)
    },[])
    return(
        <Fragment >
            <div ref={comp} >
            <ul className="ul">
                <li><NavLink  className={"navlink"} exact = "true" to={"/Action"} > Action</NavLink></li>
                <li><NavLink  className={"navlink"} exact = "true" to={"/Adventure"} >Adventure</NavLink></li>
                <li><NavLink  className={"navlink"} exact = "true"to={"/Shotting"} >  Shotting </NavLink> </li>
                <li> <NavLink  className={"navlink"} exact = "true" to={"/Fighting"} > Fighting </NavLink> </li>
                <li> <NavLink  className={"navlink"} exact = "true" to={"/Rpg"} > RPG  </NavLink></li>
                
            </ul>
            
            </div>
            
        </Fragment>
    )
}
export default SUbNavbar