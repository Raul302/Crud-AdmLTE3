import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Address() {


     useEffect(()=>{
    
        loadAddress();
        loadCities();
    
      },[])


      const [address,set_address] = useState([
        {address_id:1 , address: 'Av xochimilco', address2:'segunda adress' ,city_id:576,district: 'District', postal_code:'27100',phone:'8715661861',last_update:'12/12/12'},
        {address_id:2 , address: 'Av allende', address2:'perez Dominguez' ,city_id:576,district:'District', postal_code:'27100',phone:'8715661861',  last_update:'12/11/12'},
        {address_id:3 , address: 'Av hidalgo', address2:'Solorzano marin' ,city_id:576, district:'District', postal_code:'27100',phone:'8715661861',last_update:'12/08/12'}
    ])

    const [arr_id_city,set_arr_id_city] = useState([
        {city_id:1,city:'una'},
        {city_id:2,city:'dos'},
        {city_id:3,city:'tres'},
    ])
    const [single_address,set_single_address] = useState({
      address_id: 0,
      address : '',
      address2: '',
      district: '',
      city_id: 576,
      postal_code: '',
      phone: '',
    })

    const loadCities = () => {

        axios.get('http://127.0.0.1:8000/api/city')
        .then(function (response) {
         console.log('Carga exitoso')
         console.log(response);
         set_arr_id_city(response.data.cities)
        
        }).catch(function( error) {
         console.log('Something was wrong')
      
         
        });
      
      }

    const loadAddress = () => {

        axios.get('http://127.0.0.1:8000/api/addresses')
        .then(function (response) {
         console.log('Carga exitoso')
         console.log(response);
         set_address(response.data.address)
        
        }).catch(function( error) {
         console.log('Something was wrong')
      
         
        });
      
      }
      
      
      const delete_address = (id) => {
        axios.post('http://127.0.0.1:8000/api/adress/delete?id=' + id)
               .then(function (response) {
                console.log('Eliminacion exitoso')
                loadAddress()
               
               }).catch(function( error) {
                console.log('Something was wrong')
      
                
               });
        
      }
      
      const save_or_edit_address = () => {
        const url = single_address.address_id == 0 ? 'create' : 'edit'
        const obj_address = {
          id : single_address.address_id != 0 ? single_address.address_id : null,
          address : single_address.address,
          address2 : single_address.address2,
          district : single_address.district,
          city_id : single_address.city_id,
          postal_code : single_address.postal_code,
          phone : single_address.phone,
        }
      

         axios.post('http://127.0.0.1:8000/api/actor/' + url,obj_address)
               .then(function (response) {
                console.log('Guardado exitoso')
                loadAddress()
               
               }).catch(function( error) {
                console.log('Something was wrong')
      
                
               });
      
      }
      
      
      const edit_address = (address) => {
        console.log('Address',address);
        set_single_address(address)
      }
      const change_address = (e) =>{
        const value = e.target.value
        set_single_address({...single_address,address:value})
      }
      
      const change_address2 = (e) =>{
        const value = e.target.value
        set_single_address({...single_address,address2:value})
      }

      const change_city_id = (e) => {
        const value = e.target.value
        console.log(e.target.value);
        set_single_address({...single_address,city_id:value})

      }

      const change_district = (e) => {
        const value = e.target.value
        console.log(e.target.value);
        set_single_address({...single_address,district:value})

      }

      const change_postal_code = (e) => {
        const value = e.target.value
        console.log(e.target.value);
        set_single_address({...single_address,postal_code:value})

      }

      const change_phone = (e) => {
        const value = e.target.value
        console.log(e.target.value);
        set_single_address({...single_address,phone:value})

      }

  return (
    

    <section style={{ marginLeft: '20%' }} class="content">
    <div class="row">
    <div class="col-md-6">
      <div className="card card-primary">


      <div className="card-header">
    <h3 className="card-title">Address</h3>
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
                  <select  onChange={(e) => change_city_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
                    {arr_id_city.map(city => {
                        return(
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
    onClick={(e)=>save_or_edit_address()}
       className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>


      {/* <div class="form-group">
                  <label for="exampleSelectBorder">Bottom Border only <code>.form-control-border</code></label>
                  <select class="custom-select form-control-border" id="exampleSelectBorder">
                    <option>Value 1</option>
                    <option>Value 2</option>
                    <option>Value 3</option>
                  </select>
                </div> */}



      </div>

      <div class="col-md-10">
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
                  <th>District</th>
                  <th>Postal code</th>
                  <th>Phone</th>
                  <th>Last update</th>
                  <th>Actions</th>
                  <th />
                </tr>
              </thead>
              <tbody>
              {address.map(act =>{

// {address_id:1 , address: 'Luis raul', address2:'perez marin' ,district: 'District', city_id :'1233', postal_code:'27100',phone:'8715661861',last_update:'12/12/12'},


               return( <tr>
                  <td>{act.address_id}</td>
                  <td>{act.address}</td>
                  <td>{act.address2}</td>
                  <td>{act.city_id}</td>
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
          {/* /.card-body */}
        </div>
        {/* /.card */}



      </div>
   
    </div>
  </section >



  )
}
