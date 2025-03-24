// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// export default function Payment() {
//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const [payments, setPayments] = useState([]);
//   const [payment, setPayment] = useState({
//     customer_id: '',
//     staff_id: '',
//     rental_id: '',
//     amount: '',
//     payment_date: '',
//     payment_id: 0
//   });

//   const loadPayments = () => {
//     axios.get(url+'/payment')
//       .then(response => {
//         console.log('Pagos cargados');
//         setPayments(response.data.payments);
//       })
//       .catch(error => console.log('Error al cargar', error));
//   };

//   const deletePayment = (id) => {
//     axios.post(`url+'/payment/delete?id=${id}`)
//       .then(() => {
//         console.log('Pago eliminado');
//         loadPayments();
//       })
//       .catch(error => console.log('Error al eliminar', error));
//   };

//   const saveOrEditPayment = () => {
//     const url = payment.payment_id === 0 ? 'create' : 'edit';
//     const objPayment = {
//       id: payment.payment_id !== 0 ? payment.payment_id : null,
//       customer_id: payment.customer_id,
//       staff_id: payment.staff_id,
//       rental_id: payment.rental_id,
//       amount: payment.amount,
//       payment_date: payment.payment_date
//     };

//     axios.post(`url+'/payment/${url}`, objPayment)
//       .then(() => {
//         console.log('Pago guardado');
//         loadPayments();
//       })
//       .catch(error => console.log('Error al guardar', error));
//   };

//   const editPayment = (payment) => {
//     setPayment(payment);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPayment({ ...payment, [name]: value });
//   };

//   return (
//     <section style={{ marginLeft: '20%' }} className="content">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="card card-primary">
//             <div className="card-header">
//               <h3 className="card-title">Payment</h3>
//             </div>
//             <form>
//               <div className="card-body">
//                 <div className="form-group">
//                   <label>Customer ID</label>
//                   <input type="number" className="form-control" name="customer_id" onChange={handleChange} value={payment.customer_id} placeholder="Enter customer ID" />
//                 </div>
//                 <div className="form-group">
//                   <label>Staff ID</label>
//                   <input type="number" className="form-control" name="staff_id" onChange={handleChange} value={payment.staff_id} placeholder="Enter staff ID" />
//                 </div>
//                 <div className="form-group">
//                   <label>Rental ID</label>
//                   <input type="number" className="form-control" name="rental_id" onChange={handleChange} value={payment.rental_id} placeholder="Enter rental ID (optional)" />
//                 </div>
//                 <div className="form-group">
//                   <label>Amount</label>
//                   <input type="number" step="0.01" className="form-control" name="amount" onChange={handleChange} value={payment.amount} placeholder="Enter amount" />
//                 </div>
//                 <div className="form-group">
//                   <label>Payment Date</label>
//                   <input type="datetime-local" className="form-control" name="payment_date" onChange={handleChange} value={payment.payment_date} />
//                 </div>
//               </div>
//               <div className="card-footer">
//                 <button type="button" onClick={saveOrEditPayment} className="btn btn-primary">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="col-md-10">
//           <div className="card card-info">
//             <div className="card-header">
//               <h3 className="card-title">Payment List</h3>
//             </div>
//             <div className="card-body p-0">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Customer ID</th>
//                     <th>Staff ID</th>
//                     <th>Rental ID</th>
//                     <th>Amount</th>
//                     <th>Payment Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {payments.map(p => (
//                     <tr key={p.payment_id}>
//                       <td>{p.payment_id}</td>
//                       <td>{p.customer_id}</td>
//                       <td>{p.staff_id}</td>
//                       <td>{p.rental_id || 'N/A'}</td>
//                       <td>{p.amount}</td>
//                       <td>{p.payment_date}</td>
//                       <td>
//                         <button onClick={() => editPayment(p)} className="btn btn-info btn-sm">
//                           <i className="fas fa-edit" />
//                         </button>
//                         <button onClick={() => deletePayment(p.payment_id)} className="btn btn-danger btn-sm">
//                           <i className="fas fa-trash" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
