import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url_api from '../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';


export default function Film() {

  const [ read_or_edit , set_read_or_edit ] = useState(false)
  const navigate = useNavigate();

    
    const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);



  const [page,set_page] = useState(0)
    const [ max_page , set_max_page ] = useState(0)
  



  
    useEffect(()=>{
    
       const hasPermission = routes_permited.find((route)=> route.url == '/film')
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

    loadFilms(page);
    loadLanguages();

  }, [page])


  const [languages,set_languages] = useState([
    {language_id : 1 , name : 'Spanish'},
    {language_id : 2, name : 'English'},
    {language_id : 3 , name : 'Chekoslovakyu'},
    {language_id : 4 , name : 'Indu'},
  ])
  const [films, set_films] = useState([
    // {
    //   film_id: 1, title: 'Luis raul', description: 'perez marin', release_year: '12/12/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 2, title: 'Jose raul', description: 'perez Dominguez', release_year: '12/11/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 3, title: 'Luis Angel', description: 'Solorzano marin', release_year: '12/08/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },

    // {
    //   film_id: 1, title: 'Luis raul', description: 'perez marin', release_year: '12/12/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 2, title: 'Jose raul', description: 'perez Dominguez', release_year: '12/11/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 3, title: 'Luis Angel', description: 'Solorzano marin', release_year: '12/08/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },

    // {
    //   film_id: 1, title: 'Luis raul', description: 'perez marin', release_year: '12/12/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 2, title: 'Jose raul', description: 'perez Dominguez', release_year: '12/11/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 3, title: 'Luis Angel', description: 'Solorzano marin', release_year: '12/08/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },


    // {
    //   film_id: 1, title: 'Luis raul', description: 'perez marin', release_year: '12/12/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 2, title: 'Jose raul', description: 'perez Dominguez', release_year: '12/11/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // },
    // {
    //   film_id: 3, title: 'Luis Angel', description: 'Solorzano marin', release_year: '12/08/12', language_id: 1, original_language_id: 2, rental_duration: 3,
    //   rental_rate: 4.50, length: 0, replacement_cost: 20.99, rating: 'G', special_features: 'Shalalala', last_update: '12/12/12'
    // }

  ])

  const [film, set_film] = useState({
    title: '',
    description: '',
    release_year: 0,
    length: 0,
    rating: 0,
    film_id : 0
  })




  const [operation, set_operation] = useState('Create');
  const [editing_or_creating, set_editing_or_creating] = useState(false);



  const reset_film = () => {
    set_film(
      {
        title: '',
        description: '',
        release_year: 0,
        length: 0,
        rating: 0,
        film_id:0
      }
    )
  }

  const loadLanguages = () => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/languages/select')
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_languages(response.data.languages)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }

  const loadFilms = ( page = 0) => {

    toast.info('Loading data!', { autoClose: 1000 })
    axios.get(url_api + '/films/'+page)
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_films(response.data.films)
        set_max_page(Math.ceil(response.data.total_pages) )


      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }


  const delete_film = (id) => {
    axios.post(url_api + '/film/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        loadFilms(page)
        toast.success('Operation compelte!')

      }).catch(function (error) {
        toast.error('Something was wrong')
      });
  }

  const save_or_edit_film = () => {
    const url = film.film_id == 0 ? 'create' : 'edit'
    const obj_film = {
      film_id: film.film_id != 0 ? film.film_id : null,
      title: film.title,
      description: film.description,
      release_year: film.release_year,
      length: film.length,
    }
    console.log('URRLL',obj_film);
    console.log('URRLL',film);


    axios.post(url_api + '/film/' + url, obj_film)
      .then(function (response) {
        console.log('Guardado exitoso')
        loadFilms(page)
        toast.success('Operation compelte!')
        close_form()


      }).catch(function (error) {
        toast.error('Something was wrong')


      });


  }



  const open_form = () => {
    set_operation('Create')
    reset_film();
    set_editing_or_creating(true);
  }
  const close_form = () => {
    reset_film();
    set_editing_or_creating(false);
  }



  const edit_film = (film) => {
    set_operation('Edit')
    set_editing_or_creating(true)
    set_film(film)
  }
  const change_title = (e) => {
    const value = e.target.value
    set_film({ ...film, title: value })
  }
  const change_description = (e) => {
    const value = e.target.value
    set_film({ ...film, description: value })
  }
  const change_release_year = (e) => {
    const value = e.target.value
    set_film({ ...film, release_year: value })
  }
  const change_length = (e) => {
    const value = e.target.value
    set_film({ ...film, length: value })
  }

  const change_language_id = (e) => {
    const value = e.target.value
    set_film({ ...film, language_id: value })
  }
  
  const change_original_language_id = (e) =>{
    const value = e.target.value
    set_film({ ...film, original_language_id: value })
  }

  const change_rental_duration = (e) => {
    const value = e.target.value
    set_film({ ...film, rental_duration: value })
  }

  const change_rental_rate = (e) => {
    const value = e.target.value
    set_film({ ...film, rental_rate: value })
  }

  const change_replacement_cost = (e) => {
    const value = e.target.value
    set_film({ ...film, replacement_cost: value })
  }


  const change_rating = (e) => {
    const value = e.target.value
    set_film({ ...film, rating: value })
  }

  
  const change_special_features = (e) => {
    const value = e.target.value
    set_film({ ...film, special_features: value })
  }


  return (
    <section style={{ marginLeft: '20%', marginTop: '3%' }} class="content">
      <div class="row">

        <div style={{ display: 'flex', textAlign: 'right' }} class="col-md-12 mb-5">
          { !read_or_edit &&
          <button type="button" disabled={read_or_edit} onClick={(e) => open_form()} className="btn btn-primary">Create</button>
          }
          {/* <button onClick={notify}>Notify !</button> */}
          <ToastContainer />
        </div >
        {editing_or_creating &&

          <div class="col-md-4">
            <div className="card card-primary">
              <div style={{ display: 'flex' }} className="card-header">
                <div class="col-md-11">
                  <h3 className="card-title">{operation}</h3>
                </div>
                <div onClick={(e) => close_form()} class="col-xs-1 col-md-1" style={{ cursor: 'pointer', justifyContent: 'right', textAlign: 'right', alignItems: 'right', display: 'flex' }}>
                  <h3 className="card-title">x</h3>
                </div>
              </div>


              {/* /.card-header */}
              {/* form start */}
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" onChange={(e) => change_title(e)} value={film.title} className="form-control" id="exampleInputtext1" placeholder="Enter first name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Description</label>
                    <input type="textarea" onChange={(e) => change_description(e)} value={film.description} className="form-control" id="exampleInputtext1" placeholder="Enter last name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Release year</label>
                    <input type="text" onChange={(e) => change_release_year(e)} value={film.release_year} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Length</label>
                    <input type="text" onChange={(e) => change_length(e)} value={film.length} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div class="form-group">
                    <label for="exampleSelectBorder">Language ID</label>
                    <select value={film.language_id} onChange={(e) => change_language_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
                      {languages.map(language => {
                        return (
                          <option value={language.language_id}>{language.name}</option>
                        )
                      })}

                    </select>
                    </div>

                    <div class="form-group">
                    <label for="exampleSelectBorder">Original ID</label>
                    <select value={film.original_language_id} onChange={(e) => change_original_language_id(e)} class="custom-select form-control-border" id="exampleSelectBorder">
                      {languages.map(language => {
                        return (
                          <option value={language.language_id}>{language.name}</option>
                        )
                      })}

                    </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="exampleInputtext1">Rental duration</label>
                    <input type="text" onChange={(e) => change_rental_duration(e)} value={film.rental_duration} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Rental rate</label>
                    <input type="text" onChange={(e) => change_rental_rate(e)} value={film.rental_rate} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Replacement cost</label>
                    <input type="text" onChange={(e) => change_replacement_cost(e)} value={film.replacement_cost} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Rating</label>
                    <input type="text" onChange={(e) => change_rating(e)} value={film.rating} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputtext1">Special features</label>
                    <input type="text" onChange={(e) => change_special_features(e)} value={film.special_features} className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                  </div>


                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="button" onClick={(e) => save_or_edit_film()} className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>

          </div>
        }

        <div className={editing_or_creating ? "col-xs-12 col-md-12 col-lg-12" : "col-md-12"}>
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Films</h3>
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Release year</th>
                    <th>Language ID</th>
                    <th>Original Language ID</th>
                    <th>Rental Duration</th>
                    <th>Rental Rate</th>
                    <th>Length</th>
                    <th>Replacement cost</th>
                    <th>Rating</th>
                    <th>Special Features</th>
                    <th>Last update</th>
                    <th>Actions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>

                  {films.map(fil => {
                    return (<tr>
                      <td>{fil.film_id}</td>
                      <td>{fil.title}</td>
                      <td>{fil.description}</td>
                      <td>{fil.release_year}</td>
                      <td>{fil.language_id}</td>
                      <td>{fil.original_language_id}</td>
                      <td>{fil.rental_duration}</td>
                      <td>{fil.rental_rate}</td>
                      <td>{fil.length}</td>
                      <td>{fil.replacement_cost}</td>
                      <td>{fil.rating}</td>
                      <td>{fil.special_features}</td>
                      <td>{fil.last_update}</td>

                      <td className="text-right py-0 align-middle">

                        {
                          !read_or_edit &&

                        <div className="btn-group btn-group-sm">
                          <a onClick={(e) => edit_film(fil)} className="btn btn-info"><i className="fas fa-edit" /></a>
                          <a onClick={(e) => delete_film(fil.film_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
                      }
                      </td>
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
            {/* /.card-body */}
          </div>
          {/* /.card */}



        </div>

      </div>
    </section >
  )
}
