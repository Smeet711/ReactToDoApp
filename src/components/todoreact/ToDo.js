import React, { useState, useEffect } from "react";
import "./style.css";

// get the localstorage data and display it

const getLocalData = () => {
  const list = localStorage.getItem("mytodo");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
//
//
const ToDo = () => {
  const [inputdata, setinputdata] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [editItem, seteditItem] = useState("");
  const [togglebtn, settogglebtn] = useState(false);

  //add the item function

  const addItem = () => {
    if (!inputdata) {
      alert("Please add ToDO ");
    } else if (inputdata && togglebtn) {
      setitems(
        items.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setinputdata("");
      seteditItem(null);
      settogglebtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setitems([...items, myNewInputData]);
      setinputdata("");
    }
  };
  //
  // to delete to do
  //

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updatedItems);
  };

  //
  //
  //  to remove all from todo function
  //
  //
  //

  const removeAll = () => {
    setitems([]);
  };

  //
  // edit the todo function
  //

  const editItemtodo = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setinputdata(item_todo_edited.name);
    seteditItem(index);
    settogglebtn(true);
  };

  //
  //
  // Adding to Local Storage Logic
  //
  //

  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(items));
  }, [items]);

  //
  //
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="../todo.svg" alt="todologo" />
            <figcaption>Add Your ToDo Here...</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              name=""
              id=""
              value={inputdata}
              onChange={(event) => setinputdata(event.target.value)}
              className="form-control"
              placeholder="Type ToDo List..."
            />
            {togglebtn ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our items  */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>

                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItemtodo(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                    ]
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
