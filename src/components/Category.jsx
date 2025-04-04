import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

export default function Category() {

  const [page,set_page] = useState(0)

  const [ read_or_edit , set_read_or_edit ] = useState(false)
  const navigate = useNavigate();
  const [max_page , set_max_page] = useState(0)

    
    const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);


  useEffect(()=>{
  
     const hasPermission = routes_permited.find((route)=> route.url == '/category')
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


  useEffect(() => {

    loadCategories(page);

  }, [ page ])

  const [categories, set_categories] = useState([
    // { category_id: 1, name: 'Categoria 1', last_update: '12/12/12' },
    // { category_id: 2, name: 'Categoria 2 ', last_update: '12/11/12' },
    // { category_id: 3, name: 'Categoria 3', last_update: '12/08/12' }
  ])

  const [category, set_category] = useState({
    name: '',
    category_id: 0
  })

  const loadCategories = ( page = 0) => {

//<<<<<<< front_end
    axios.get(url+'/categories/'+page)
//=======
  //  axios.get(url+'/categories')
//>>>>>>> main
    .then(function (response) {
     console.log('Carga exitoso')
     console.log(response);
     set_categories(response.data.categories)
     set_max_page(Math.ceil(response.data.total_pages) )

    
    }).catch(function( error) {
     console.log('Something was wrong')
  
     
    });
  
  }



  return (
    <section style={{ marginLeft: '20%', marginTop:'3%' }} class="content">
      <div class="row">
        

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Category</h3>
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
                  </tr>
                </thead>
                <tbody>

                  {categories.map(cat => {
                    return (<tr>
                      <td>{cat.category_id}</td>
                      <td>{cat.name}</td>
                      <td>{cat.last_update}</td>

                      
                    </tr>
                    )
                  })}



                </tbody>
              </table>
            </div>
            {/* /.card-body */}
            
          </div>
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
          {/* /.card */}



        </div>

      </div>
    </section >
  )
}
