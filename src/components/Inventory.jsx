import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Inventory() {
  useEffect(() => {
    loadInventory();
  }, []);

  const [inventory, setInventory] = useState([]);
  
  const [item, setItem] = useState({
    film_id: '',
    store_id: '',
  });

  const loadInventory = () => {
    axios.get('http://127.0.0.1:8000/api/inventory') // Cambia la URL según tu API
      .then(response => {
        setInventory(response.data.inventory);
      })
      .catch(error => console.error('Error loading inventory:', error));
  };

  const deleteInventory = (id) => {
    axios.post(`http://127.0.0.1:8000/api/inventory/delete?id=${id}`)
      .then(() => {
        loadInventory();
      })
      .catch(error => console.error('Error deleting inventory item:', error));
  };

  const saveOrEditInventory = () => {
    const url = item.inventory_id ? 'edit' : 'create';
    axios.post(`http://127.0.0.1:8000/api/inventory/${url}`, item)
      .then(() => {
        loadInventory();
      })
      .catch(error => console.error('Error saving inventory item:', error));
  };

  const editInventory = (inv) => {
    setItem(inv);
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Inventory</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>Film ID</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    onChange={e => setItem({ ...item, film_id: e.target.value })}
                    value={item.film_id} 
                    placeholder="Enter film ID" 
                  />
                </div>
                <div className="form-group">
                  <label>Store ID</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    onChange={e => setItem({ ...item, store_id: e.target.value })}
                    value={item.store_id} 
                    placeholder="Enter store ID" 
                  />
                </div>
              </div>
              <div className="card-footer">
                <button 
                  type="button" 
                  onClick={saveOrEditInventory} 
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Inventory List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Film ID</th>
                    <th>Store ID</th>
                    <th>Last Update</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.inventory_id}>
                      <td>{item.inventory_id}</td>
                      <td>{item.film_id}</td>
                      <td>{item.store_id}</td>
                      <td>{item.last_update}</td>
                      <td>
                        <button onClick={() => editInventory(item)} className="btn btn-info">Edit</button>
                        <button onClick={() => deleteInventory(item.inventory_id)} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
