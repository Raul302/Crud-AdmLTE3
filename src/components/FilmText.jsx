import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FilmText() {
  useEffect(() => {
    loadFilms();
  }, []);

  const [films, setFilms] = useState([]);
  
  const [film, setFilm] = useState({
    film_id: '',
    title: '',
    description: ''
  });

  const loadFilms = () => {
    axios.get(url+'/film-text') // Cambia la URL según tu API
      .then(response => {
        setFilms(response.data.film_text);
      })
      .catch(error => console.error('Error loading films:', error));
  };

  const deleteFilm = (id) => {
    axios.post(`url+'/film-text/delete?id=${id}`)
      .then(() => {
        loadFilms();
      })
      .catch(error => console.error('Error deleting film:', error));
  };

  const saveOrEditFilm = () => {
    const url = film.film_id ? 'edit' : 'create';
    axios.post(`url+'/film-text/${url}`, film)
      .then(() => {
        loadFilms();
      })
      .catch(error => console.error('Error saving film:', error));
  };

  const editFilm = (filmData) => {
    setFilm(filmData);
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Film Text</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>Film ID</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    onChange={e => setFilm({ ...film, film_id: e.target.value })}
                    value={film.film_id} 
                    placeholder="Enter film ID" 
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => setFilm({ ...film, title: e.target.value })}
                    value={film.title} 
                    placeholder="Enter title" 
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    className="form-control" 
                    onChange={e => setFilm({ ...film, description: e.target.value })}
                    value={film.description} 
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button 
                  type="button" 
                  onClick={saveOrEditFilm} 
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Films List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Film ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {films.map(film => (
                    <tr key={film.film_id}>
                      <td>{film.film_id}</td>
                      <td>{film.title}</td>
                      <td>{film.description}</td>
                      <td>
                        <button onClick={() => editFilm(film)} className="btn btn-info">Edit</button>
                        <button onClick={() => deleteFilm(film.film_id)} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
