import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FilmCategory() {
  useEffect(() => {
    loadFilmCategories();
  }, []);

  const [filmCategories, setFilmCategories] = useState([]);
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [filmCategory, setFilmCategory] = useState({
    film_id: '',
    category_id: ''
  });

  // Cargar la lista de categorías y films
  const loadFilmCategories = () => {
    axios.get(url+'/film-categories') // Cambia la URL según tu API
      .then(response => {
        setFilmCategories(response.data.film_categories);
      })
      .catch(error => console.error('Error loading film categories:', error));

    // Cargar films disponibles
    axios.get(url+'/films')
      .then(response => {
        setFilms(response.data.films);
      })
      .catch(error => console.error('Error loading films:', error));

    // Cargar categorías disponibles
    axios.get(url+'/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => console.error('Error loading categories:', error));
  };

  const deleteFilmCategory = (filmId, categoryId) => {
    axios.post(`url+'/film-category/delete?film_id=${filmId}&category_id=${categoryId}`)
      .then(() => {
        loadFilmCategories();
      })
      .catch(error => console.error('Error deleting film category:', error));
  };

  const saveOrEditFilmCategory = () => {
    const url = filmCategory.film_id && filmCategory.category_id ? 'edit' : 'create';
    axios.post(`url+'/film-category/${url}`, filmCategory)
      .then(() => {
        loadFilmCategories();
      })
      .catch(error => console.error('Error saving film category:', error));
  };

  const editFilmCategory = (filmCat) => {
    setFilmCategory(filmCat);
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Film Category</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>Film</label>
                  <select 
                    className="form-control" 
                    onChange={e => setFilmCategory({ ...filmCategory, film_id: e.target.value })} 
                    value={filmCategory.film_id}
                  >
                    <option value="">Select Film</option>
                    {films.map(film => (
                      <option key={film.film_id} value={film.film_id}>{film.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control" 
                    onChange={e => setFilmCategory({ ...filmCategory, category_id: e.target.value })} 
                    value={filmCategory.category_id}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-footer">
                <button 
                  type="button" 
                  onClick={saveOrEditFilmCategory} 
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
              <h3 className="card-title">Film Categories List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Film ID</th>
                    <th>Category ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filmCategories.map(filmCategory => (
                    <tr key={`${filmCategory.film_id}-${filmCategory.category_id}`}>
                      <td>{filmCategory.film_id}</td>
                      <td>{filmCategory.category_id}</td>
                      <td>
                        <button 
                          onClick={() => editFilmCategory(filmCategory)} 
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteFilmCategory(filmCategory.film_id, filmCategory.category_id)} 
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
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
