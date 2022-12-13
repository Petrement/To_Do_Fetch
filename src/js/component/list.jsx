import React, { useEffect, useState } from "react";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
    if(items.length > 0){
      fetch('https://assets.breatheco.de/apis/fake/todos/user/petrement', {
      method: "PUT",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.jason; 
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });}
    

  },[items])
  
  /* fetch('https://assets.breatheco.de/apis/fake/todos/user/petrement', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      items
    })
   }); */
  
  function addItem() {
    if (!inputValue) {
      alert("Item can't be empty");
      return;
    }
    let aux = {label : inputValue, done : false }
    setItems((prevList) => [...prevList, aux]);
    setInputValue("");
  }
  function handleRemove(i) {      
    let temp = [...items]
    temp[i].done = !temp[i].done
    setItems(temp)
    
  }

  
  return (
    <div className="d-inline-flex flex-column w-100 container justify-content-center align-items-center shadows">
      <div className="row">
        <h1 className="col-12">To-Do List</h1>
      </div>

      <div className="row mt-3">
        <input
          className="col-8"
          size="60"
          type="text"
          placeholder="Add an item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="col-4" onClick={() => addItem()}>
          Add
        </button>
      </div>

      <ul id="list" className="list-group col-6 mt-3">
        {items.length == 0 ? 
          (<li className="list-group-item text-center">
            Add a task
          </li>)
         : 
          items.map((item, i) => (
            
              <li
                className="list-group-item text-center"
                id={i}
                key={i}
                onClick={(e)=>{
                  handleRemove(i)
                }}
              >
                {console.log(item.done)}
               <span className={item.done ?"text-decoration-line-through" : null}>{item.label}</span>
              </li>
            
          )
        )}
        <li className="list-group-item text-center text-black-50">{`${items.length} item left`}</li>
        <div className="fondo1"></div>
        <div className="fondo2"></div>
      </ul>
    </div>
  );
};

export default List;