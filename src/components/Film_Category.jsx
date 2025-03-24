import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Film_Category() {

      const [page,set_page] = useState(0)
  

  useEffect(()=>{

    load_film_category( page );

  },[ page ])

  const [film_categories,set_film_categories] = useState([

    // {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'},
    // {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'},
    // {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'}

])


const load_film_category = ( page ) => {

  axios.get(url+'/film_category/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_film_categories(response.data.film_category)
  
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
              <h3 className="card-title">Film Category</h3>
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
                    <th>Title film</th>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {film_categories.map(film =>{
                 return( <tr>
                    <td>{film.film_id}</td>
                    <td>{film.title}</td>
                    <td>{film.category_id}</td>
                    <td>{film.name}</td>

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
                { film_categories.length >= 10 &&
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
