// import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// function Crud() {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.crud);
//   return <div></div>;
// }

// export default Crud;
/////////////////////

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");

  // Function to handle adding a new item
  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };

  // Function to handle editing an existing item
  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };

  // Function to handle deleting an item
  const handleDeleteItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h2>CRUD Table</h2>
      <input type="search" placeholder="search smth" />

      {/* Add Item Section */}
      <div>
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Table for CRUD Operations */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingItemId === item.id ? (
                  <>
                    <button onClick={() => handleUpdateItem(item.id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingItemId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditingItemName(item.name);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
