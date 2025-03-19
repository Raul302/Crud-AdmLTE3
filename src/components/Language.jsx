import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Language() {
  useEffect(() => {
    loadLanguages();
  }, []);

  const [languages, setLanguages] = useState([]);

  const [language, setLanguage] = useState({
    name: '',
  });

  const loadLanguages = () => {
    axios.get('http://127.0.0.1:8000/api/languages') // Cambia la URL según tu API
      .then(response => {
        setLanguages(response.data.languages);
      })
      .catch(error => console.error('Error loading languages:', error));
  };

  const deleteLanguage = (id) => {
    axios.post(`http://127.0.0.1:8000/api/language/delete?id=${id}`)
      .then(() => {
        loadLanguages();
      })
      .catch(error => console.error('Error deleting language:', error));
  };

  const saveOrEditLanguage = () => {
    const url = language.language_id ? 'edit' : 'create';
    axios.post(`http://127.0.0.1:8000/api/language/${url}`, language)
      .then(() => {
        loadLanguages();
      })
      .catch(error => console.error('Error saving language:', error));
  };

  const editLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <section style={{ marginLeft: '20%' }} className="content">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Languages</h3>
            </div>
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label>Language Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => setLanguage({ ...language, name: e.target.value })}
                    value={language.name} 
                    placeholder="Enter language name" 
                  />
                </div>
              </div>
              <div className="card-footer">
                <button 
                  type="button" 
                  onClick={saveOrEditLanguage} 
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
              <h3 className="card-title">Languages List</h3>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Language Name</th>
                    <th>Last Update</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map(lang => (
                    <tr key={lang.language_id}>
                      <td>{lang.language_id}</td>
                      <td>{lang.name}</td>
                      <td>{lang.last_update}</td>
                      <td>
                        <button onClick={() => editLanguage(lang)} className="btn btn-info">Edit</button>
                        <button onClick={() => deleteLanguage(lang.language_id)} className="btn btn-danger">Delete</button>
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
