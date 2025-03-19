import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Staff() {
  useEffect(() => {
    loadStaff();
  }, []);

  const [staff, setStaff] = useState([]);
  const [staffMember, setStaffMember] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    store_id: '',
    address_id: '',
    staff_id: 0
  });

  const loadStaff = () => {
    axios.get('http://127.0.0.1:8000/api/staff')
      .then(response => {
        console.log('Carga exitosa');
        setStaff(response.data.staff);
      })
      .catch(error => console.log('Error al cargar', error));
  };

  const deleteStaff = (id) => {
    axios.post(`http://127.0.0.1:8000/api/staff/delete?id=${id}`)
      .then(() => {
        console.log('Eliminación exitosa');
        loadStaff();
      })
      .catch(error => console.log('Error al eliminar', error));
  };

  const saveOrEditStaff = () => {
    const url = staffMember.staff_id === 0 ? 'create' : 'edit';
    const objStaff = {
      id: staffMember.staff_id !== 0 ? staffMember.staff_id : null,
      first_name: staffMember.first_name,
      last_name: staffMember.last_name,
      email: staffMember.email,
      username: staffMember.username,
      store_id: staffMember.store_id,
      address_id: staffMember.address_id
    };

    axios.post(`http://127.0.0.1:8000/api/staff/${url}`, objStaff)
      .then(() => {
        console.log('Guardado exitoso');
        loadStaff();
      })
      .catch(error => console.log('Error al guardar', error));
  };

  const editStaff = (staff) => {
    setStaffMember(staff);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffMember({ ...staffMember, [name]: value });
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Staff</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" name="first_name" onChange={handleChange} value={staffMember.first_name} placeholder="Enter first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" name="last_name" onChange={handleChange} value={staffMember.last_name} placeholder="Enter last name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} value={staffMember.email} placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name="username" onChange={handleChange} value={staffMember.username} placeholder="Enter username" />
                </div>
                <div className="form-group">
                  <label>Store ID</label>
                  <input type="number" className="form-control" name="store_id" onChange={handleChange} value={staffMember.store_id} placeholder="Enter store ID" />
                </div>
                <div className="form-group">
                  <label>Address ID</label>
                  <input type="number" className="form-control" name="address_id" onChange={handleChange} value={staffMember.address_id} placeholder="Enter address ID" />
                </div>
              </div>
              <div className="card-footer">
                <button type="button" onClick={saveOrEditStaff} className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Staff List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Store ID</th>
                    <th>Address ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(member => (
                    <tr key={member.staff_id}>
                      <td>{member.staff_id}</td>
                      <td>{member.first_name}</td>
                      <td>{member.last_name}</td>
                      <td>{member.email}</td>
                      <td>{member.username}</td>
                      <td>{member.store_id}</td>
                      <td>{member.address_id}</td>
                      <td>
                        <button onClick={() => editStaff(member)} className="btn btn-info btn-sm">
                          <i className="fas fa-edit" />
                        </button>
                        <button onClick={() => deleteStaff(member.staff_id)} className="btn btn-danger btn-sm">
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
