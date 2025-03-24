import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';


export default function Film_Actor() {

  useEffect(()=>{

    load_film_actor();

  },[])

  const [film_actors,set_film_actors] = useState([
    {actor_id:1 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'},
    {actor_id:2 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'},
    {actor_id:3 , fullname_actor:'nombre completo actor',film_id : 1 , title_film : 'fifty grey shadows'}
])


const load_film_actor = () => {

  axios.get(url+'/film_actors')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_film_actors(response.data.film_actors)
  
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
                    <td>{film.title_film}</td>

                  </tr>
                 )
                })}

                 


                </tbody>
              </table>
            </div>
            {/* /.card-body */}
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item"><a className="page-link" href="#">«</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">»</a></li>
              </ul>
            </div>
          </div>
          {/* /.card */}



        </div>
     
      </div>
    </section >
  )
}
