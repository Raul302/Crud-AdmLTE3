import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Film() {


  useEffect(() => {

    loadFilms();

  }, [])

  const [films, set_films] = useState([
    { film_id: 1, title: 'Luis raul', description: 'perez marin', release_year: '12/12/12', length: 0},
    { film_id: 2, title: 'Jose raul', description: 'perez Dominguez', release_year: '12/11/12', length: 0},
    { film_id: 3, title: 'Luis Angel', description: 'Solorzano marin', release_year: '12/08/12', length: 0}
  ])

  const [film, set_film] = useState({
    title: '',
    description: '',
    release_year: 0,
    length: 0,
    rating: 0,
  })

  const loadFilms = () => {

    axios.get('http://127.0.0.1:8000/api/films')
      .then(function (response) {
        console.log('Carga exitoso')
        console.log(response);
        set_films(response.data.films)

      }).catch(function (error) {
        console.log('Something was wrong')


      });

  }


  const delete_film = (id) => {
    axios.post('http://127.0.0.1:8000/api/film/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        loadFilms()

      }).catch(function (error) {
        console.log('Something was wrong')
      });
  }

  const save_or_edit_film = () => {
    const url = film.film_id == 0 ? 'create' : 'edit'
    const obj_film = {
      id : film.film_id != 0 ? film.film_id : null,
      title : film.title,
      description: film.description , 
      release_year: film.release_year,
      length: film.length, 
    }
  
     axios.post('http://127.0.0.1:8000/api/film/' + url,obj_film)
           .then(function (response) {
            console.log('Guardado exitoso')
            loadFilms()
           
           }).catch(function( error) {
            console.log('Something was wrong')
  
            
           });
  
  }
  
  
  const edit_film = (film) => {
    set_film(film)
  }
  const change_title = (e) =>{
    const value = e.target.value
    set_film({...film,title:value})
  }
  const change_description = (e) =>{
    const value = e.target.value
    set_film({...film,description:value})
  }
  const change_release_year = (e) =>{
    const value = e.target.value
    set_film({...film,release_year:value})
  }
  const change_length = (e) =>{
    const value = e.target.value
    set_film({...film,length:value})
  }

  return (
    <section style={{ marginLeft: '20%' }} class="content">
      <div class="row">
        <div class="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Films</h3>
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
                  <input type="textarea" onChange={(e) => change_description(e)} value={film.description}  className="form-control" id="exampleInputtext1" placeholder="Enter last name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputtext1">Release year</label>
                  <input type="number" min="1900" onChange={(e) => change_release_year(e)} value={film.release_year}  className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputtext1">Length</label>
                  <input type="number" min="1900" onChange={(e) => change_length(e)} value={film.length}  className="form-control" id="exampleInputtext1" placeholder="Enter year" />
                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="button" onClick={(e)=>save_or_edit_film()} className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>

        </div>

        <div class="col-md-10">
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
                    <th>Length</th>
                    <th>Actions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                  {films.map(fil =>{
                 return( <tr>
                    <td>{fil.film_id}</td>
                    <td>{fil.title}</td>
                    <td>{fil.description}</td>
                    <td>{fil.release_year}</td>
                    <td>{fil.length}</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a onClick={(e) => edit_film(fil)} className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a  onClick={(e) => delete_film(fil.film_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
                      </div>
                    </td>
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
