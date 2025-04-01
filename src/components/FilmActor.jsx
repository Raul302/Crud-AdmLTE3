// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TokenContext } from '../context/TokenContext';

// export default function FilmActor() {





    
//   const navigate = useNavigate();

//   const [ read_or_edit , set_read_or_edit ] = useState(false)
  
//   const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);

//     useEffect(()=>{
      
//          const hasPermission = routes_permited.find((route)=> route.url == '/film_actor')
//          if(hasPermission){
//           if(hasPermission.permission == 0 ) {
//             navigate("/login")

//           }
//            if( hasPermission.permission == 1){
//             set_read_or_edit(true)
//            }
          
//          } else {
//           navigate("/login")
//          }
      
//         },[])
    



//   useEffect(() => {
//     loadFilmActors();
//   }, []);

//   const [filmActors, setFilmActors] = useState([]);
//   const [actors, setActors] = useState([]);
//   const [films, setFilms] = useState([]);

//       const [page,set_page] = useState(0)
  
//       const [max_page , set_max_page] = useState(0)
  
//   const [filmActor, setFilmActor] = useState({
//     actor_id: '',
//     film_id: ''
//   });

//   // Cargar la lista de actores y películas
//   const loadFilmActors = () => {
//     axios.get(url+'/film-actors') // Cambia la URL según tu API
//       .then(response => {
//         setFilmActors(response.data.film_actors);
//         set_max_page(Math.ceil(response.data.total_pages) )

//       })
//       .catch(error => console.error('Error loading film actors:', error));

//     // Cargar actores disponibles
//     axios.get(url+'/actors')
//       .then(response => {
//         setActors(response.data.actors);
//       })
//       .catch(error => console.error('Error loading actors:', error));

//     // Cargar películas disponibles
//     axios.get(url+'/films')
//       .then(response => {
//         setFilms(response.data.films);
//       })
//       .catch(error => console.error('Error loading films:', error));
//   };

//   const deleteFilmActor = (actorId, filmId) => {
//     axios.post(`url+'/film-actor/delete?actor_id=${actorId}&film_id=${filmId}`)
//       .then(() => {
//         loadFilmActors();
//       })
//       .catch(error => console.error('Error deleting film actor:', error));
//   };

//   const saveOrEditFilmActor = () => {
//     const url = filmActor.actor_id && filmActor.film_id ? 'edit' : 'create';
//     axios.post(`url+'/film-actor/${url}`, filmActor)
//       .then(() => {
//         loadFilmActors();
//       })
//       .catch(error => console.error('Error saving film actor:', error));
//   };

//   const editFilmActor = (filmAct) => {
//     setFilmActor(filmAct);
//   };

//   return (
//     <section style={{ marginLeft: '20%' }} className="content">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="card card-primary">
//             <div className="card-header">
//               <h3 className="card-title">Film Actor</h3>
//             </div>
//             <form>
//               <div className="card-body">
//                 <div className="form-group">
//                   <label>Actor</label>
//                   <select 
//                     className="form-control" 
//                     onChange={e => setFilmActor({ ...filmActor, actor_id: e.target.value })} 
//                     value={filmActor.actor_id}
//                   >
//                     <option value="">Select Actor</option>
//                     {actors.map(actor => (
//                       <option key={actor.actor_id} value={actor.actor_id}>{actor.first_name} {actor.last_name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Film</label>
//                   <select 
//                     className="form-control" 
//                     onChange={e => setFilmActor({ ...filmActor, film_id: e.target.value })} 
//                     value={filmActor.film_id}
//                   >
//                     <option value="">Select Film</option>
//                     {films.map(film => (
//                       <option key={film.film_id} value={film.film_id}>{film.title}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="card-footer">
//                 <button 
//                   type="button" 
//                   onClick={saveOrEditFilmActor} 
//                   className="btn btn-primary"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="col-md-10">
//           <div className="card card-info">
//             <div className="card-header">
//               <h3 className="card-title">Film Actors List</h3>
//             </div>
//             <div className="card-body p-0">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Actor ID</th>
//                     <th>Film ID</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filmActors.map(filmActor => (
//                     <tr key={`${filmActor.actor_id}-${filmActor.film_id}`}>
//                       <td>{filmActor.actor_id}</td>
//                       <td>{filmActor.film_id}</td>
//                       <td>
//                         <button 
//                           onClick={() => editFilmActor(filmActor)} 
//                           className="btn btn-info"
//                         >
//                           Edit
//                         </button>
//                         <button 
//                           onClick={() => deleteFilmActor(filmActor.actor_id, filmActor.film_id)} 
//                           className="btn btn-danger"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="card-footer clearfix">
//               <ul className="pagination pagination-sm m-0 float-right">
//               { page != 0 &&
//                                                        <>
//                                                        <li className="page-item"><Link onClick={(e) => set_page(0) } className="page-link" >««</Link></li>
//                                                        <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
//                                                        </>
//                                                        }
//                                                        <>
//                                                        <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
//                                                        <li className="page-item"><Link onClick={(e) => set_page(max_page) } className="page-link" >»»</Link></li>
//                                                        </>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
