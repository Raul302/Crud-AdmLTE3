import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Language() {

  const [ page , set_page ] = useState(0)

  useEffect(()=>{

    load_languages( page );

  },[ page ])

  const [languages,set_languages] = useState([

    // {language_id: 1 , name: 'Spanish'},
    // {language_id: 1 , name: 'Spanish'},
    // {language_id: 1 , name: 'Spanish'}

])


const load_languages = ( page = 0) => {

  axios.get(url+'/languages')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_languages(response.data.languages)
  
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
              <h3 className="card-title">Languages</h3>
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
                    <th>Language ID</th>
                    <th>name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {languages.map(language =>{
                 return( <tr>
                    <td>{language.language_id}</td>
                    <td>{language.name}</td>

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
                { languages.length >= 10 &&
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
