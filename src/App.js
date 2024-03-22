import { Fragment, useState } from "react";
import Navbar from "./Navbar/Uppernavbar";
import SUbNavbar from "./Navbar/lowerNavbar";
import FirstPage from "./components/firstPage/FirstPage";
import Product from "./components/Product";
import { Route, Routes } from "react-router";
import Error from "./Error/error";

const App = () => {
  const [data,setdata] = useState([]);
  const handleitems = items =>{
    let item = [...data];
    let index = item.findIndex(elem => elem.id === items[0].id);
    if(index>-1){
      item[index] = {
        ...item[index],
        quantity:item[index].quantity+1

      }
      setdata(item)
    }else{
      items[0].quantity = 1;
      setdata([...data,items[0]])
    }
  }
  const forremove = id =>{
    let array = data.filter(elem => elem.id !== id);
    setdata(array)
  }

  const handleitem = (id,value) =>{
    if(value === 1){
      let array = data.map(elem => elem.id === id ? {...elem,quantity:elem.quantity+1}: elem)
      setdata(array);
      console.log(data)
    }else if(value ===-1){
      let index = data.findIndex(elem => elem.id === id);
      if(data[index].quantity === 1){
        forremove(id)
      }else{
        let array = data.map(elem => elem.id === id ? {...elem,quantity:elem.quantity-1}: elem)
        setdata(array);
        
      }
    }
  }
  const removeallitems = () =>{
    setdata([])
  }


  return (
   <Fragment>
     
      
      
      <Navbar  item = {data}  removeitem = { (id) => forremove(id)}  emptyitem={removeallitems}   Handleitems = {(id,value) => handleitem(id,value)}  />
      <SUbNavbar/>
      <Routes>
        <Route path = {'/'} element = {<FirstPage/>}/>
        <Route path = {'/:Action?'} element = {<Product  onChange = {handleitems} />}/>
        <Route path = {'/Error4O4'} element = {<Error/>} />
        <Route  path={"*"} element = {<Error/>}  /> 
        
      </Routes>
    
      
   </Fragment>
  )
}

export default App;
