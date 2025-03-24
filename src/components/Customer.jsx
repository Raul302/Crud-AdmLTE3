import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url_api from '../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Customer() {

    const [page,set_page] = useState(0)
  

  useEffect(() => {

    loadCustomers(page);
    loadStores();
    loadAddresses();

  }, [ page ])

  const [addresses, set_addresses] = useState([

    { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 576, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
    { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 576, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' } 
    ])

    const [stores, set_stores] = useState([

      { store_id: 1 },
      { store_id: 2 } 
      ])




  const [customers, set_customers] = useState([
    // { customer_id: 1,store_id: 1 ,  first_name: 'Luis raul', last_name: 'perez marin', email: 'email@email.com',address_id : 1 ,active : 1  },
    // { customer_id: 2,store_id: 1 ,  first_name: 'Jose raul', last_name: 'perez Dominguez', email: 'email@email.com',address_id : 1 ,active : 1  },
    // { customer_id: 3,store_id: 1 ,  first_name: 'Luis Angel', last_name: 'Solorzano marin', email: 'email@email.com',address_id : 2 ,active : 1  },
    
    // { customer_id: 1,store_id: 1 ,  first_name: 'Luis raul', last_name: 'perez marin', email: 'email@email.com',address_id : 1 ,active : 0  },
    // { customer_id: 2,store_id: 2 ,  first_name: 'Jose raul', last_name: 'perez Dominguez', email: 'email@email.com',address_id : 1 ,active : 1  },
    // { customer_id: 3,store_id: 1 ,  first_name: 'Luis Angel', last_name: 'Solorzano marin', email: 'email@email.com',address_id : 1 ,active : 1  },

    // { customer_id: 1,store_id: 1 ,  first_name: 'Luis raul', last_name: 'perez marin', email: 'email@email.com',address_id : 1 ,active : 0 },
    // { customer_id: 2,store_id: 2 ,  first_name: 'Jose raul', last_name: 'perez Dominguez', email: 'email@email.com',address_id : 2 ,active : 1  },
    // { customer_id: 3,store_id: 1 ,  first_name: 'Luis Angel', last_name: 'Solorzano marin', email: 'email@email.com',address_id : 1 ,active : 1  },

    // { customer_id: 1,store_id: 1 ,  first_name: 'Luis raul', last_name: 'perez marin', email: 'email@email.com',address_id : 1 ,active : 1  },
    // { customer_id: 2,store_id: 1 ,  first_name: 'Jose raul', last_name: 'perez Dominguez', email: 'email@email.com',address_id : 1 ,active : 1  },
    // { customer_id: 3,store_id: 3,  first_name: 'Luis Angel', last_name: 'Solorzano marin', email: 'email@email.com',address_id : 1 ,active : 1  }

  ])

  const [customer, set_customer] = useState({
    customer_id: 0,store_id: 1 ,  first_name:'' , last_name: '', email: '',address_id : 1 ,active : 1
  })

  const [ operation , set_operation ] = useState('Create');
  const [ editing_or_creating , set_editing_or_creating ] = useState(false);

  const reset_customer = () => {
    set_customer(
      {
        customer_id: 0,store_id: 1 ,  first_name:'' , last_name: '', email: '',address_id : 1 ,active : 1
      }
    )
  }



  const loadStores = () => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/stores')
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_stores(response.data.stores)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const loadAddresses = () => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/addresses')
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_addresses(response.data.addresses)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const loadCustomers = ( page = 0) => {

    toast.info('Loading data!',{autoClose:1000})
    axios.get(url_api+'/customers/'+page)
      .then(function (response) {
        console.log(response);
        set_customers(response.data.customers)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }


  const delete_customer = (id) => {
    axios.post(url_api+'/customer/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        loadCustomers( page)
        toast.success('Operation compelte!')

      }).catch(function (error) {
        toast.error('Something was wrong')

      });

  }

  const save_or_edit_customer = () => {
    const url = customer.customer_id == 0 ? 'create' : 'edit'
    const obj_customer = {
      id: customer.customer_id != 0 ? customer.customer_id : null,
      first_name: customer.first_name,
      last_name: customer.last_name,
      store_id : customer.store_id ? customer.store_id : 1,
      email : customer.email,
      address_id : customer.address_id,
      active: customer.active


    }

    axios.post(url_api+'/customer/' + url, obj_customer)
      .then(function (response) {
        console.log('Guardado exitoso')
        loadCustomers(page)
        toast.success('Operation compelte!')
        close_form()


      }).catch(function (error) {
        toast.error('Something was wrong')

      });


  }

  const open_form = () => {
    set_operation('Create')
    reset_customer();
    set_editing_or_creating(true);
  }
  const close_form = () => {
    reset_customer();
    set_editing_or_creating(false);
  }

  const edit_customer = (customer) => {
    set_operation('Edit')
    set_editing_or_creating(true)
    console.log('customer', customer);
    set_customer(customer)
  }
  const change_first_name = (e) => {
    const value = e.target.value
    set_customer({ ...customer, first_name: value })
  }

  const change_last_name = (e) => {
    const value = e.target.value
    set_customer({ ...customer, last_name: value })
  }

  const change_address_id = (e) => {
    const value = e.target.value
    set_customer({ ...customer, address_id: value })
  }

  const change_store_id = (e) => {
    const value = e.target.value
    set_customer({ ...customer, store_id: value })
  }

  
  const change_email = (e) => {
    const value = e.target.value
    set_customer({ ...customer, email: value })
  }

  const change_active = (e) => {
    const value = e.target.value
    set_customer({ ...customer, active: value })
  }


  return (
    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">
      <div  style={{display:'flex',textAlign:'right'}}class="col-md-12 mb-5">
      <button type="button" onClick={(e) => open_form()} className="btn btn-primary">Create</button>
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer />
      </div >
        {editing_or_creating &&
        
        <div class="col-md-4">
        <div className="card card-primary">
          <div style={{display:'flex'}} className="card-header">
            <div class="col-md-11">
            <h3 className="card-title">{operation}</h3>
            </div>
            <div onClick = {(e) => close_form()} class="col-xs-1 col-md-1" style={{ cursor:'pointer', justifyContent:'right',textAlign:'right',alignItems:'right',display:'flex'}}>
            <h3 className="card-title">x</h3>
            </div>
          </div>
          
          {/* /.card-header */}
          {/* form start */}
          <form>
            <div className="card-body">

            <div className="form-group">

            <label for="exampleSelectBorder">Address ID</label>
                    <select value={customer.address_id} onChange={(e) => change_address_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
                      {addresses.map(address => {
                        return (
                          <option value={address.address_id}>{address.address}</option>
                        )
                      })}

                    </select>
                    </div>

                    <div className="form-group">

<label for="exampleSelectBorder">Store ID</label>
        <select value={customer.store_id} onChange={(e) => change_store_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
          {stores.map(store => {
            return (
              <option value={store.store_id}>{store.store_id}</option>
            )
          })}

        </select>
        </div>


              <div className="form-group">
                <label htmlFor="exampleInputEmail1">First name</label>
                <input type="text" className="form-control" onChange={(e) => change_first_name(e)} value={customer.first_name} id="exampleInputtext1" placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputtext1">last name</label>
                <input type="text" className="form-control" onChange={(e) => change_last_name(e)} value={customer.last_name} id="exampleInputtext1" placeholder="Enter last name" />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputtext1">Email</label>
                <input type="email" className="form-control" onChange={(e) => change_email(e)} value={customer.email} id="exampleInputtext1" placeholder="Enter last name" />
              </div>


              <div className="form-group">

<label for="exampleSelectBorder">Active</label>
        <select value={customer.active} onChange={(e) => change_active(e)} class="custom-select form-control-border" id="exampleSelectBorder">
        <option value={1}>Active</option>
        <option value={0}>desactived</option>


        </select>
        </div>


            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="button" onClick={(e) => save_or_edit_customer()} className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

      </div>

        }
      

        <div className={editing_or_creating ? "col-md-6" : "col-md-12"}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Customers</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>ID</th>
                  <th>Store ID</th>
                  <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Address ID</th>
                    <th>Address</th>
                    <th>Active</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                {customers.map(act => {
                    return (<tr>
                      <td>{act.customer_id}</td>
                      <td>{act.store_id}</td>
                      <td>{act.first_name}</td>
                      <td>{act.last_name}</td>
                      <td>{act.email}</td>
                      <td>{act.address_id}</td>
                      <td>{act.address}</td>

              
                      <td>{act.active}</td>

                      <td className="text-right py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <a onClick={(e) => edit_customer(act)} className="btn btn-info"><i className="fas fa-edit" /></a>
                          <a onClick={(e) => delete_customer(act.customer_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
              { page != 0 &&
                <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                }
                <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>

              </ul>
            </div>
          </div>
          {/* /.card */}

        </div>

      </div>
    </section >
  )
}
