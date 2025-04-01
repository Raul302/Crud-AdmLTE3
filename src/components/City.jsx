import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';


export default function City() {

    const [page,set_page] = useState(0)
  
    
      const [max_page , set_max_page] = useState(0)
    
  const navigate = useNavigate();

  const [ read_or_edit , set_read_or_edit ] = useState(false)
  
  const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);

    useEffect(()=>{
      
         const hasPermission = routes_permited.find((route)=> route.url == '/city')
         if(hasPermission){
          if(hasPermission.permission == 0 ) {
            navigate("/login")

          }
           if( hasPermission.permission == 1){
            set_read_or_edit(true)
           }
          
         } else {
          navigate("/login")
         }
      
        },[])
    

  useEffect(()=>{

    loadCities( page );

  },[ page ])

  const [cities,set_cities] = useState([
    // {city_id:1 , city: 'Luis raul' , country_id: 1 , country : 'Nigeria',last_update:'12/12/12'},
    // {city_id:2 , city: 'Jose raul' , country_id: 1 , country : 'China',last_update:'12/11/12'},
    // {city_id:3 , city: 'Luis Angel' , country_id: 1 , country : 'Wakanda',last_update:'12/08/12'}
])


const loadCities = ( page = 0) => {

  axios.get(url+'/cities/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_cities(response.data.cities)
   set_max_page(Math.ceil(response.data.total_pages) )

  
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
          <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
              { page != 0 &&
                                                       <>
                                                       <li className="page-item"><Link onClick={(e) => set_page(0) } className="page-link" >««</Link></li>
                                                       <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                                                       </>
                                                       }
                                                       <>
                                                       <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
                                                       <li className="page-item"><Link onClick={(e) => set_page(max_page) } className="page-link" >»»</Link></li>
                                                       </>
              </ul>
            </div>



        </div>
     
      </div>
    </section >
  )
}
