import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url_api from '../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';



export default function Address() {


  const [page,set_page] = useState(0)


  useEffect(() => {

    // Checking front end branch
    loadAddress(page);
    loadCities();

  }, [page])


  const [address, set_address] = useState([

    // { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 1, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
    // { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 2, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' },
    // { address_id: 3, address: 'Av hidalgo', address2: 'Solorzano marin', city_id: 3, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/08/12' },

    // { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 1, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
    // { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 2, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' },
    // { address_id: 3, address: 'Av hidalgo', address2: 'Solorzano marin', city_id: 3, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/08/12' },


    // { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 1, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
    // { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 1, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' },
    // { address_id: 3, address: 'Av hidalgo', address2: 'Solorzano marin', city_id: 1, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/08/12' },


    // { address_id: 1, address: 'Av xochimilco', address2: 'segunda adress', city_id: 2, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/12/12' },
    // { address_id: 2, address: 'Av allende', address2: 'perez Dominguez', city_id: 2, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/11/12' },
    // { address_id: 3, address: 'Av hidalgo', address2: 'Solorzano marin', city_id: 2, district: 'District', postal_code: '27100', phone: '8715661861', last_update: '12/08/12' },



  ])

  const [arr_id_city, set_arr_id_city] = useState([
    { city_id: 1, city: 'una' },
    { city_id: 2, city: 'dos' },
    { city_id: 3, city: 'tres' },
  ])

  const [operation, set_operation] = useState('Create');
  const [editing_or_creating, set_editing_or_creating] = useState(false);



  const [single_address, set_single_address] = useState({
    address_id: 0,
    address: '',
    address2: '',
    district: '',
    city_id: 576,
    postal_code: '',
    phone: '',
  })

  console.log('SINGLE',single_address);


  const reset_address = () => {
    set_single_address(
      {
        address_id: 0,
        address: '',
        address2: '',
        district: '',
        city_id: '',
        postal_code: '',
        phone: '',
      }
    )
  }
  const loadCities = () => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/cities/display/select')
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_arr_id_city(response.data.cities)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const loadAddress = ( page = 0) => {

    axios.get(url_api + '/addresses/'+page)
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_address(response.data.addresses)

      }).catch(function (error) {
        console.log('Something was wrong')


      });

  }


  const delete_address = (id) => {
    axios.post(url_api + '/address/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        loadAddress( page )
        toast.success('Operation compelte!')


      }).catch(function (error) {
        toast.error('Something was wrong')
      });

  }

  const save_or_edit_address = () => {
    const url = single_address.address_id == 0 ? 'create' : 'edit'
    const obj_address = {
      id: single_address.address_id != 0 ? single_address.address_id : null,
      address: single_address.address,
      address2: single_address.address2,
      district: single_address.district,
      city_id: single_address.city_id,
      postal_code: single_address.postal_code,
      phone: single_address.phone,
    }


    axios.post(url_api + '/address/' + url, obj_address)
      .then(function (response) {
        console.log('Guardado exitoso')
        loadAddress( page )
        toast.success('Operation compelte!')
        close_form()

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const open_form = () => {
    set_operation('Create')
    reset_address();
    set_editing_or_creating(true);
  }
  const close_form = () => {
    reset_address();
    set_editing_or_creating(false);
  }


  const edit_address = (address) => {
    set_operation('Edit')
    set_editing_or_creating(true)
    console.log('ADDRESS',address);
    set_single_address(address)
  }
  const change_address = (e) => {
    const value = e.target.value
    set_single_address({ ...single_address, address: value })
  }

  const change_address2 = (e) => {
    const value = e.target.value
    set_single_address({ ...single_address, address2: value })
  }

  const change_city_id = (e) => {
    const value = e.target.value
    console.log(e.target.value);
    set_single_address({ ...single_address, city_id: value })

  }

  const change_district = (e) => {
    const value = e.target.value
    console.log(e.target.value);
    set_single_address({ ...single_address, district: value })

  }

  const change_postal_code = (e) => {
    const value = e.target.value
    console.log(e.target.value);
    set_single_address({ ...single_address, postal_code: value })

  }

  const change_phone = (e) => {
    const value = e.target.value
    console.log(e.target.value);
    set_single_address({ ...single_address, phone: value })

  }

  return (


    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">

        <div style={{ display: 'flex', textAlign: 'right' }} class="col-md-12 mb-5">
          <button type="button" onClick={(e) => open_form()} className="btn btn-primary">Create</button>
          {/* <button onClick={notify}>Notify !</button> */}
          <ToastContainer />
        </div >

        {editing_or_creating &&

          <div class="col-md-2">
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
                    <label htmlFor="exampleInputEmail1">Address</label>
                    <input type="text" className="form-control"
                      onChange={(e) => change_address(e)} value={single_address.address}
                      id="exampleInputtext1" placeholder="Enter first name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Address 2</label>
                    <input type="text" className="form-control"
                      onChange={(e) => change_address2(e)} value={single_address.address2}
                      id="exampleInputtext1" placeholder="Enter last name" />
                  </div>

                  <div class="form-group">
                    <label for="exampleSelectBorder">City ID</label>
                    <select value={single_address.city_id} onChange={(e) => change_city_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
                      {arr_id_city.map(city => {
                        return (
                          <option value={city.city_id}>{city.city}</option>
                        )
                      })}

                    </select>
                    <div className="form-group">
                      <label htmlFor="exampleInputtext1">District</label>
                      <input type="text" className="form-control"
                        onChange={(e) => change_district(e)} value={single_address.district}
                        id="exampleInputtext1" placeholder="Enter last name" />

                      <div className="form-group">
                        <label htmlFor="exampleInputtext1">Postal code</label>
                        <input type="text" className="form-control"
                          onChange={(e) => change_postal_code(e)} value={single_address.postal_code}
                          id="exampleInputtext1" placeholder="Enter last name" />

                        <div className="form-group">
                          <label htmlFor="exampleInputtext1">Phone</label>
                          <input type="text" className="form-control"
                            onChange={(e) => change_phone(e)} value={single_address.phone}
                            id="exampleInputtext1" placeholder="Enter last name" />
                        </div>
                      </div>

                    </div>
                  </div>


                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="button"
                    onClick={(e) => save_or_edit_address()}
                    className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>



          </div>
        }

        <div className={editing_or_creating ? "col-md-9" : "col-md-11"}>
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Address</h3>
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
                    <th>Adress ID</th>
                    <th>Address</th>
                    <th>Address 2</th>
                    <th>City ID</th>
                    <th>City</th>
                    <th>District</th>
                    <th>Postal code</th>
                    <th>Phone</th>
                    <th>Last update</th>
                    <th>Actions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {address.map(act => {

                    // {address_id:1 , address: 'Luis raul', address2:'perez marin' ,district: 'District', city_id :'1233', postal_code:'27100',phone:'8715661861',last_update:'12/12/12'},


                    return (<tr>
                      <td>{act.address_id}</td>
                      <td>{act.address}</td>
                      <td>{act.address2}</td>
                      <td>{act.city_id}</td>
                      <td>{act.city}</td>
                      <td>{act.district}</td>
                      <td>{act.postal_code}</td>
                      <td>{act.phone}</td>
                      <td>{act.last_update}</td>
                      <td className="text-right py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <a
                            onClick={(e) => edit_address(act)}
                            // onClick={(e) => edit_actor(act)} 
                            className="btn btn-info"><i className="fas fa-edit" /></a>
                          <a
                            onClick={(e) => delete_address(act.address_id)}
                            className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
                      </td>

                    </tr>
                    )
                  })}







                </tbody>
              </table>
            </div>

            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
              { page != 0 &&
                <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                }
                <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
              </ul>
            </div>

            {/* /.card-body */}
          </div>
          {/* /.card */}



        </div>

      </div>
    </section >



  )
}
