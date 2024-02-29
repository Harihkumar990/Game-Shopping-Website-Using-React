import { Fragment } from "react";
import ReactDom from "react-dom"

export const Backdrop = props =>{
    const handleclick = () =>{
        if(props.onClose){
            props.onClose()
        }
    }
    return(
        <div className="loading-overlay" onClick={handleclick}></div>
    )
}


const Loading = () =>{
    

    return(
        ReactDom.createPortal(
            <>
                <Backdrop/>
                <div className="loading-containr">
                    <div className="loading-text" >Loading</div>

                    <div className="loading" ></div>
                </div>
            </>,
            document.getElementById("loader")
        )
    )
}

export default Loading;