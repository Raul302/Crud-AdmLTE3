import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';


export default function Film_Actor() {

      const [page,set_page] = useState(0)
        const [max_page , set_max_page] = useState(0)
  



        const navigate = useNavigate();

        const [ read_or_edit , set_read_or_edit ] = useState(false)
        
        const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);
      
          useEffect(()=>{
            
               const hasPermission = routes_permited.find((route)=> route.url == '/film_actor')
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

    load_film_actor( page );

  },[ page ])

  const [film_actors,set_film_actors] = useState([
    // {actor_id:1 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'},
    // {actor_id:2 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'},
    // {actor_id:3 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'}
])


const load_film_actor = ( page = 0) => {

  axios.get(url+'/film_actor/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_film_actors(response.data.film_actor)
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
              <h3 className="card-title">Film Actor</h3>
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
                    <th>Actor ID</th>
                    <th>Fullname Actor</th>
                    <th>Film ID</th>
                    <th>Title Film</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {film_actors.map(film =>{
                 return( <tr>
                    <td>{film.actor_id}</td>
                    <td>{film.fullname_actor}</td>
                    <td>{film.film_id}</td>
                    <td>{film.title}</td>

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
          {/* /.card */}



        </div>
     
      </div>
    </section >
  )
}
