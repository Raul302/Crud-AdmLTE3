import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';
import { toast, ToastContainer } from 'react-toastify';
import url_api from '../constants/constants';


export default function Staff() {

  const [page, set_page] = useState(0);
  const [max_page, set_max_page] = useState(0)



  const navigate = useNavigate();

  const [read_or_edit, set_read_or_edit] = useState(false)

  const { routes_permited, set_routes_permited, user_data, set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);

   const [addresses, set_addresses] = useState([
  
      { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 576, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
      { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 576, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' } 
      ])

      const [roles, set_roles] = useState([
  
        { id: 1, name: 'Av xochimilco' },
        { id: 2, name: 'Av allende', } 
        ])
      
    const [ operation , set_operation ] = useState('Create');
    const [ editing_or_creating , set_editing_or_creating ] = useState(false);
    const [staff_ind, set_ind_staff] = useState({
      staff_id : 0 , first_name : '', rol_id : 10 , last_name :'' , address_id:1,email:'',store_id:'',active:1,username:'',password:'' 

    })
    const [staff, set_staff] = useState([
    
    ])
  


    const reset_staff = () => {
      set_ind_staff(
        {
          staff_id : 0 , first_name : '',rol_id: 10 ,last_name :'' , address_id:1,email:'',store_id:'',active:1,username:'',password:'' 
        }
      )
    }


  useEffect(() => {

     const hasPermission = routes_permited.find((route) => route.url == '/staff')
     if (hasPermission) {
       if (hasPermission.permission == 0) {
         navigate("/login")

       }
       if (hasPermission.permission == 1) {
         set_read_or_edit(true)
       }

     } else {
       navigate("/login")
     }

  }, [])


  useEffect(() => {

    load_staff(page);
    load_roles();
    loadAddresses();

  }, [page])


  const load_roles = () => {

    
    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/roles')
      .then(function (response) {
        console.log('JE',response)
        set_roles(response.data.roles)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });


  }
  const loadAddresses = () => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/addresses')
      .then(function (response) {
        set_addresses(response.data.addresses)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const load_staff = (page) => {

    axios.get(url + '/staff/' + page)
      .then(function (response) {
        set_staff(response.data.staff)
        set_max_page(Math.ceil(response.data.total_pages))


      }).catch(function (error) {
        console.log('Something was wrong')


      });

  }


  const open_form =() =>{

    set_operation('Create')
    reset_staff();
    set_editing_or_creating(true);

  }

  const close_form = () => {

    reset_staff();
    set_editing_or_creating(false);

  }

  const edit_staff = ( element ) => {

    console.log( ' EELEMTN ', element);
    set_operation('Edit')
      set_editing_or_creating(true)
      set_ind_staff(element)

  }

  const delete_staff = (id) => {
    axios.post(url_api+'/staff/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        load_staff( page)
        toast.success('Operation compelte!')

      }).catch(function (error) {
        toast.error('Something was wrong')

      });

  }

  const save_or_edit_staff = () => {
    const url = staff_ind.staff_id == 0 ? 'create' : 'edit'
    const obj_staff = {
      id: staff_ind.staff_id != 0 ? staff_ind.staff_id : null,
      first_name: staff_ind.first_name,
      last_name: staff_ind.last_name,
      store_id : staff_ind.store_id ? staff_ind.store_id : 1,
      email : staff_ind.email,
      address_id : staff_ind.address_id,
      active: staff_ind.active,
      rol_id: staff_ind.rol_id,
      active: staff_ind.active,
      username: staff_ind.username,
      password:staff_ind.password



    }

    axios.post(url_api+'/staff/' + url, obj_staff)
      .then(function (response) {
        console.log('Guardado exitoso')
        load_staff(page)
        toast.success('Operation compelte!')
        close_form()


      }).catch(function (error) {
        toast.error('Something was wrong')

      });

  }

  const change_first_name = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, first_name: value })
  }

  const change_last_name = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, last_name: value })
  }

  const change_address_id = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, address_id: value })
  }

  const change_store_id = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, store_id: value })
  }

  const change_active = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, active: value })
  }

  const change_username = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, username: value })
  }

  const change_password = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, password: value })
  }

  const change_rol_id = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, rol_id: value })
  }

  const change_email = (e) => {
    const value = e.target.value
    set_ind_staff({ ...staff_ind, email: value })
  }


  return (
    <section style={{ marginLeft: '20%', marginTop: '3%' }} class="content">
      <div class="row">
      <div  style={{display:'flex',textAlign:'right'}}class="col-md-12 mb-5">
      { !read_or_edit &&
      <button type="button" disabled={read_or_edit} onClick={(e) => open_form()} className="btn btn-primary">Create</button>
      }
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
                <label htmlFor="exampleInputEmail1">First name</label>
                <input type="text" className="form-control" 
                onChange={(e) => change_first_name(e)} 
                value={staff_ind.first_name}
                 id="exampleInputtext1" placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputtext1">last name</label>
                <input type="text" className="form-control" 
                onChange={(e) => change_last_name(e)} 
                value={staff_ind.last_name} 
                id="exampleInputtext1" placeholder="Enter last name" />
              </div>

              <div className="form-group">
              <label for="exampleSelectBorder">Roles</label>
                    <select value={staff_ind.rol_id} 
                    onChange={(e) => change_rol_id(e)}
                     class="custom-select form-control-border" id="exampleSelectBorder">
                      {roles.map(rol => {
                        return (
                          <option value={rol.id}>{rol.name}</option>
                        )
                      })}

                    </select>
              </div>

              <div className="form-group">
                <label for="exampleSelectBorder">Address ID</label>
                    <select value={staff_ind.address_id} 
                    onChange={(e) => change_address_id(e)}
                     class="custom-select form-control-border" id="exampleSelectBorder">
                      {addresses.map(address => {
                        return (
                          <option value={address.address_id}>{address.address}</option>
                        )
                      })}

                    </select>
              </div>


              <div className="form-group">
                <label htmlFor="exampleInputtext1">Email</label>
                <input type="text" className="form-control" 
                onChange={(e) => change_email(e)} 
                value={staff_ind.email} 
                id="exampleInputtext1" placeholder="Enter last name" />
              </div>

              <div className="form-group">
              <label for="exampleSelectBorder">Store</label>
                    <select value={staff.store_id} 
                    onChange={(e) => change_store_id(e)}
                     class="custom-select form-control-border" id="exampleSelectBorder">
                     <option value="1">1</option>
                     <option value="2">2</option>


                    </select>
              </div>

              <div className="form-group">
              <label for="exampleSelectBorder">Active</label>
                    <select value={staff.active} 
                    onChange={(e) => change_active(e)}
                     class="custom-select form-control-border" id="exampleSelectBorder">
                     <option value="1">1</option>
                     <option value="2">2</option>


                    </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputtext1">Username</label>
                <input type="text" className="form-control" 
                onChange={(e) => change_username(e)} 
                value={staff_ind.username} 
                id="exampleInputtext1" placeholder="Enter last name" />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputtext1">Password</label>
                <input type="password" className="form-control" 
                onChange={(e) => change_password(e)} 
                value={staff_ind.password} 
                id="exampleInputtext1" placeholder=" ********* " />
              </div>


            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="button"   disabled={read_or_edit}
               onClick={(e) => save_or_edit_staff()}
                className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

      </div>

        }

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Staff</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Full Name</th>
                    <th>Address ID</th>
                    <th>Address </th>
                    <th>Picture </th>
                    <th>Email </th>
                    <th>Store ID </th>
                    <th>Active</th>
                    <th>Rol ID</th>
                    <th>Rol</th>
                    <th>Username</th>
                    <th>Actions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>

                  {staff.map(staf => {
                    return (<tr>
                      <td>{staf.staff_id}</td>
                      <td>{staf.fullname_staff}</td>
                      <td>{staf.address_id}</td>
                      <td>{staf.address}</td>
                      <td><img className="blob-to-image" src={"data:image/png;base64," + staf.picture}></img> </td>

                      <td>{staf.email}</td>
                      <td>{staf.store_id}</td>
                      <td>{staf.active}</td>
                      <td>{staf.rol_id}</td>
                      <td>{staf.name}</td>
                      <td>{staf.username}</td>
                      <td className="text-right py-0 align-middle">
                          {
                            !read_or_edit
                          &&
                        <div className="btn-group btn-group-sm">
                          <a onClick={(e) => edit_staff(staf)} className="btn btn-info"><i className="fas fa-edit" /></a>
                          <a onClick={(e) => delete_staff(staf.staff_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
                           }
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
                {page != 0 &&
                  <>
                    <li className="page-item"><Link onClick={(e) => set_page(0)} className="page-link" >««</Link></li>
                    <li className="page-item"><Link onClick={(e) => set_page(page - 1)} className="page-link" >«</Link></li>
                  </>
                }
               { staff.length >= 10
               &&
               
               <>
               <li className="page-item"><Link onClick={(e) => set_page(page + 1)} className="page-link" >»</Link></li>
               <li className="page-item"><Link onClick={(e) => set_page(max_page)} className="page-link" >»»</Link></li>
             </>
             
             }
              </ul>
            </div>
          </div>
          {/* /.card */}



        </div>

      </div>
    </section >
  )
}
