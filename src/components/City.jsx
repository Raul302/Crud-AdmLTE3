import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';


export default function City() {

  useEffect(()=>{

    loadCities();

  },[])

  const [cities,set_cities] = useState([
    {city_id:1 , city: 'Luis raul' , country_id: 1 , country : 'Nigeria',last_update:'12/12/12'},
    {city_id:2 , city: 'Jose raul' , country_id: 1 , country : 'China',last_update:'12/11/12'},
    {city_id:3 , city: 'Luis Angel' , country_id: 1 , country : 'Wakanda',last_update:'12/08/12'}
])


const loadCities = () => {

  axios.get(url+'/cities')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_cities(response.data.cities)
  
  }).catch(function( error) {
   console.log('Something was wrong')

   
  });

}




   
  return (
    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">
      

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
                    <th>Country ID</th>
                    <th>Country</th>
                    <th>Last update</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {cities.map(cit =>{
                 return( <tr>
                    <td>{cit.city_id}</td>
                    <td>{cit.city}</td>
                    <td>{cit.country_id}</td>
                    <td>{cit.country}</td>
                    <td>{cit.last_update}</td>

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
