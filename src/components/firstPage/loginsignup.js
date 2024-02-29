import { Fragment } from "react";
import { useRef , useEffect,useState } from "react";
import gsap  from "gsap";
import axios from "axios";

const LOGIN = () =>{
    const [error,seterror] = useState(false);
    const [response,setresponse] = useState(false);
    const [istoken,settoken] = useState(false);
  
    const [details,setdetails] = useState({
        email:"",
        password:"",
        phonenumber:"",
        name:""
    })
    const [login,setlogin] = useState({
        email:"",
        password:""
    })
    const [islogin,setislogin]  = useState(false)
    const comp = useRef(null)
    const handlelogin = () =>{
        setislogin(false)
    }
    const handlesignup = () =>{
        setislogin(true)
    }
    const logout = () =>{
        setresponse(false)
        localStorage.removeItem("token")
        settoken(false)
    }


    useEffect(()=>{
        const ctx = gsap.context(()=>{
            
            let tl = gsap.timeline()
            islogin ? tl.play():tl.pause();
            tl.to('.signup',{
                opacity:1,
                duration:1,
                
                ease:"bounce.in"
            })
            tl.to(".login",{
                opacity:0,
                duration:1,
                ease:"bounce.out"
            },0.3)
           
            

            
        },comp)
        return ()=>ctx.revert()
    },[islogin])
    const handleinput = (e,value) =>{
        if(value===1){
            setlogin({
                ...login,
                [e.target.name]:e.target.value,

            })
           
        }else if(value===-1){
            setdetails({
                ...details,
                [e.target.name]:e.target.value,
            })
            
        }
        

    }
    const handlesubmit = (e,value) =>{
        e.preventDefault();
        if(value===1){
            Senddetails(value)
        }else if(value===-1){
            Senddetails(value);
        }

    }

    const Senddetails = async (value) =>{
        //console.log("true")
        if(value===1){
            try{
                const responses = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvZmCI9IX3H-tqgf-NglN0QIGlBpVCYoA",{
                    email:login.email,
                    password:login.password
                })
                setresponse(true)

                localStorage.setItem("token",responses.data.idToken);

                
            }catch(error){
                seterror(true)
                alert("Invalid Email and PAssword");
                
            }
            setlogin({
                email:"",
                password:""
            })

        }else if(value===-1){
            try{
                const responses =  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvZmCI9IX3H-tqgf-NglN0QIGlBpVCYoA',{
                 name :details.name,
                 email:details.email,
                 phonenumber:details.phonenumber,
                 password:details.password,
                 returnSecureToken:true
                 
                })
                localStorage.setItem("token",responses.data.idToken)
                
                setresponse(true)
               
             }catch(err){

                 alert("Email Exist")
                 seterror(true)
             }
             setdetails({
                email:"",
                password:"",
                phonenumber:"",
                name:""
             })
        }
        
    }
   
    
    useEffect(()=>{
        
    const checkIdToken = () =>{
        let token = localStorage.getItem('token');
        if(token){
            settoken(true)
        }
        

    }
    checkIdToken();



    },[])
   


    return(
        <Fragment  >
            
            <div  className="scroll" ref={comp}>
                {
                    (response && !error) || istoken ? <div className="container">
                      <span className="span" >logout</span>  <span  onClick={logout} className="material-symbols-outlined user">logout</span>
                       <span className="span" >User</span> <span   className="material-symbols-outlined user">person</span>
                    </div>: <div>
                    <button  className="btns" onClick={handlelogin} >Login</button>
                    <button className="btns"  onClick={handlesignup}>Signup</button>
                    </div>
                }
                {
                   (response && !error) || istoken ? "":<section>
                    <form  onSubmit={(e)=>handlesubmit(e,1)}  className="labelinput login" >
                       <h3>Login</h3>
                       <label>ID :<input  onChange={(e)=>handleinput(e,1)}  value={login.email} name="email" className="email" type="text" placeholder="Enter Name" /></label>
                       <label>Password :<input  onChange={(e)=>handleinput(e,1)} value={login.password}  name="password" className="password" type="password" placeholder="Enter Passwd" /></label>
                       <button >Submit</button>
                   </form>
                   
                   
                   <div  className="signup">
                   <h3>Signup</h3>
                       <section className="container">
                           
                           <div className="name display" >
                               <h5>Name</h5>
                               <h5>Email</h5>
                               <h5>PH:Number</h5>
                               <h5>Password</h5>
   
                           </div>
                           <form  onSubmit={(e)=>handlesubmit(e,-1)}  className="inputtags display">
                               <input  onChange={(e)=>handleinput(e,-1)}  className="place" name="name" value={details.name} type="text" placeholder="Enter Name"/>
                               <input onChange={(e)=>handleinput(e,-1)} className="place" name="email" value={details.email} type="text" placeholder="Enter Email"/>
                               <input onChange={(e)=>handleinput(e,-1)} className="place" name="phonenumber" value={details.phonenumber} type="number" placeholder="Enter Number"/>
                               <input onChange={(e)=>handleinput(e,-1)} className="place" name="password" value={details.password} type="password" placeholder="Enter Password"/>
                               <button >Submit </button>
                           </form>
                           
                       </section>
                       
                   </div>
   
                   </section>
                   
                }
                

                                
                
            </div>
            
        </Fragment>
    )
}

export default LOGIN;