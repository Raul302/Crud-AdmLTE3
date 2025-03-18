import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function City() {

  useEffect(()=>{

    loadCities();

  },[])

  const [cities,set_cities] = useState([
    {city_id:1 , city: 'Luis raul' , last_update:'12/12/12'},
    {city_id:2 , city: 'Jose raul' , last_update:'12/11/12'},
    {city_id:3 , city: 'Luis Angel' , last_update:'12/08/12'}
])

const [city,set_city] = useState({
  city : '',
  last_update: '',
  city_id: 0
})


const loadCities = () => {

  axios.get('http://127.0.0.1:8000/api/city')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_cities(response.data.cities)
  
  }).catch(function( error) {
   console.log('Something was wrong')

   
  });

}


const delete_city = (id) => {
  axios.post('http://127.0.0.1:8000/api/actor/delete?id=' + id)
         .then(function (response) {
          console.log('Eliminacion exitoso')
          loadCities()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });
  
}

const save_or_edit_city = () => {
  const url = city.city_id == 0 ? 'create' : 'edit'
  const obj_city = {
    id : city.city_id != 0 ? city.city_id : null,
    city : city.city,
    last_update : city.last_update
  }

   axios.post('http://127.0.0.1:8000/api/actor/' + url,obj_city)
         .then(function (response) {
          console.log('Guardado exitoso')
          loadCities()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });

}


const edit_city = (city) => {
  console.log('city',city);
  set_city(city)
}
const change_name = (e) =>{
  const value = e.target.value
  set_city({...city,city:value})
}


   
  return (
    <section style={{ marginLeft: '20%' }} class="content">
      <div class="row">
      <div class="col-md-6">
        <div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">City</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="text"  onChange={(e) => change_name(e)} value={city.city} className="form-control" id="exampleInputtext1" placeholder="Enter first name" />
      </div>
    
     
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="button" onClick={(e)=>save_or_edit_city()}className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

        </div>

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">City</h3>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Last update</th>
                    <th>action</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {cities.map(cit =>{
                 return( <tr>
                    <td>{cit.city_id}</td>
                    <td>{cit.city}</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a onClick={(e) => edit_city(cit)} className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a  onClick={(e) => delete_city(cit.city_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
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
