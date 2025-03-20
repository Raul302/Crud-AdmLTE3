import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';


export default function Film_Category() {

  useEffect(()=>{

    load_film_category();

  },[])

  const [film_categories,set_film_categories] = useState([
    {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'},
    {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'},
    {film_id : 1 , title_film : 'fifty grey shadows',category_id: 1 , name: 'drama'}
])


const load_film_category = () => {

  axios.get(url+'/film_categories')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_film_categories(response.data.film_categories)
  
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
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {film_categories.map(film =>{
                 return( <tr>
                    <td>{film.film_id}</td>
                    <td>{film.title_film}</td>
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
