import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Film_Text() {

        const [page,set_page] = useState(0)
  

  useEffect(()=>{

    load_film_text( page );

  },[ page ])

  const [film_text,set_film_text] = useState([
    // {film_id : 1 , title : 'fifty grey shadows', description: 'Description 1 '},
    // {film_id : 1 , title : 'fifty grey shadows', description: 'description 2 '},
    // {film_id : 1 , title : 'fifty grey shadows', description: 'description 3'}
])


const load_film_text = (page) => {

  axios.get(url+'/film_text/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_film_text(response.data.film_text)
  
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
              <h3 className="card-title">Film Text</h3>
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
                    <th>Film ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {film_text.map(film =>{
                 return( <tr>
                    <td>{film.film_id}</td>
                    <td>{film.title}</td>
                    <td>{film.description}</td>

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
                { film_text.length >= 10 &&
                <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
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
