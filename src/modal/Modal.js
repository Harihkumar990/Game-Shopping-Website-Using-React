import { Fragment } from "react";
import ReactDOM  from "react-dom";
import { Backdrop } from "./loading";
import { useRef,useEffect } from "react";
import gsap from "gsap";
const Modal = ({onClose,children}) =>{
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            tl.from('.test',{
                yPercent:-70,
                opacity:0,
                duration:0.5,
                
            })
        },comp)
        return ()=>ctx.revert();
    },[])

    return(
        <Fragment>
            {
                ReactDOM.createPortal(
                    <div ref={comp} >
                        <Backdrop onClose = {onClose}/>
                        <div className="test"   >
                            <div className="closebtn" ><button onClick={onClose} >X</button></div>
                            {children}
                        </div>
                    </div>,
                    document.getElementById("modal-root")

                )
            }
        </Fragment>
    )
}
export default Modal;