import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Rental() {
  useEffect(() => {
    loadRentals();
  }, []);

  const [rentals, setRentals] = useState([]);
  const [rental, setRental] = useState({
    rental_date: '',
    inventory_id: '',
    customer_id: '',
    return_date: '',
    staff_id: '',
    rental_id: 0
  });

  const loadRentals = () => {
    axios.get(url+'/rental')
      .then(response => {
        console.log('Carga exitosa');
        setRentals(response.data.rentals);
      })
      .catch(error => console.log('Error al cargar', error));
  };

  const deleteRental = (id) => {
    axios.post(`url+'/rental/delete?id=${id}`)
      .then(() => {
        console.log('Eliminación exitosa');
        loadRentals();
      })
      .catch(error => console.log('Error al eliminar', error));
  };

  const saveOrEditRental = () => {
    const url = rental.rental_id === 0 ? 'create' : 'edit';
    const objRental = {
      id: rental.rental_id !== 0 ? rental.rental_id : null,
      rental_date: rental.rental_date,
      inventory_id: rental.inventory_id,
      customer_id: rental.customer_id,
      return_date: rental.return_date,
      staff_id: rental.staff_id
    };

    axios.post(`url+'/rental/${url}`, objRental)
      .then(() => {
        console.log('Guardado exitoso');
        loadRentals();
      })
      .catch(error => console.log('Error al guardar', error));
  };

  const editRental = (rental) => {
    setRental(rental);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value });
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Rental</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>Rental Date</label>
                  <input type="datetime-local" className="form-control" name="rental_date" onChange={handleChange} value={rental.rental_date} />
                </div>
                <div className="form-group">
                  <label>Inventory ID</label>
                  <input type="number" className="form-control" name="inventory_id" onChange={handleChange} value={rental.inventory_id} placeholder="Enter inventory ID" />
                </div>
                <div className="form-group">
                  <label>Customer ID</label>
                  <input type="number" className="form-control" name="customer_id" onChange={handleChange} value={rental.customer_id} placeholder="Enter customer ID" />
                </div>
                <div className="form-group">
                  <label>Return Date</label>
                  <input type="datetime-local" className="form-control" name="return_date" onChange={handleChange} value={rental.return_date} />
                </div>
                <div className="form-group">
                  <label>Staff ID</label>
                  <input type="number" className="form-control" name="staff_id" onChange={handleChange} value={rental.staff_id} placeholder="Enter staff ID" />
                </div>
              </div>
              <div className="card-footer">
                <button type="button" onClick={saveOrEditRental} className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Rental List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Rental Date</th>
                    <th>Inventory ID</th>
                    <th>Customer ID</th>
                    <th>Return Date</th>
                    <th>Staff ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map(r => (
                    <tr key={r.rental_id}>
                      <td>{r.rental_id}</td>
                      <td>{r.rental_date}</td>
                      <td>{r.inventory_id}</td>
                      <td>{r.customer_id}</td>
                      <td>{r.return_date}</td>
                      <td>{r.staff_id}</td>
                      <td>
                        <button onClick={() => editRental(r)} className="btn btn-info btn-sm">
                          <i className="fas fa-edit" />
                        </button>
                        <button onClick={() => deleteRental(r.rental_id)} className="btn btn-danger btn-sm">
                          <i className="fas fa-trash" />
                        </button>
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
