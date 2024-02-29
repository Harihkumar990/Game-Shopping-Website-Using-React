const SearchBox = () =>{
    const hanldesubmit = e =>{
        e.preventDefault();
    }
    
    return(
        <>
            
            <form  onSubmit={hanldesubmit} className={"Searchparent displayflex"}>
                    <span className="material-symbols-outlined">notifications</span>
                    <search className="displayflex">
                        <input type="text" placeholder="Search"></input>
                        <button>Search</button>
                    </search>
                </form>
        </>
    )
}

export default SearchBox;