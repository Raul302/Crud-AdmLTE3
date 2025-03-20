import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Customer() {
  useEffect(() => {
    loadCustomers();
  }, []);

  const [customers, setCustomers] = useState([]);

  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    store_id: '',
    address_id: '',
    active: true
  });

  const loadCustomers = () => {
    axios.get('http://127.0.0.1:8000/api/customers')
      .then(response => {
        setCustomers(response.data.customers);
      })
      .catch(error => console.error('Error loading customers:', error));
  };

  const deleteCustomer = (id) => {
    axios.post(`http://127.0.0.1:8000/api/customer/delete?id=${id}`)
      .then(() => {
        loadCustomers();
      })
      .catch(error => console.error('Error deleting customer:', error));
  };

  const saveOrEditCustomer = () => {
    const url = customer.customer_id ? 'edit' : 'create';
    axios.post(`http://127.0.0.1:8000/api/customer/${url}`, customer)
      .then(() => {
        loadCustomers();
      })
      .catch(error => console.error('Error saving customer:', error));
  };

  const editCustomer = (cust) => {
    setCustomer(cust);
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Customers</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" onChange={e => setCustomer({ ...customer, first_name: e.target.value })} value={customer.first_name} placeholder="Enter first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" onChange={e => setCustomer({ ...customer, last_name: e.target.value })} value={customer.last_name} placeholder="Enter last name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" onChange={e => setCustomer({ ...customer, email: e.target.value })} value={customer.email} placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Store ID</label>
                  <input type="number" className="form-control" onChange={e => setCustomer({ ...customer, store_id: e.target.value })} value={customer.store_id} />
                </div>
                <div className="form-group">
                  <label>Address ID</label>
                  <input type="number" className="form-control" onChange={e => setCustomer({ ...customer, address_id: e.target.value })} value={customer.address_id} />
                </div>
              </div>
              <div className="card-footer">
                <button type="button" onClick={saveOrEditCustomer} className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Customers</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Store ID</th>
                    <th>Address ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(cust => (
                    <tr key={cust.customer_id}>
                      <td>{cust.customer_id}</td>
                      <td>{cust.first_name}</td>
                      <td>{cust.last_name}</td>
                      <td>{cust.email}</td>
                      <td>{cust.store_id}</td>
                      <td>{cust.address_id}</td>
                      <td>
                        <button onClick={() => editCustomer(cust)} className="btn btn-info">Edit</button>
                        <button onClick={() => deleteCustomer(cust.customer_id)} className="btn btn-danger">Delete</button>
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