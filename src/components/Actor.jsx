import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Actor() {

  useEffect(()=>{

    loadActors();

  },[])

  const [actors,set_actors] = useState([
    {actor_id:1 , first_name: 'Luis raul', last_name:'perez marin' , last_update:'12/12/12'},
    {actor_id:2 , first_name: 'Jose raul', last_name:'perez Dominguez' , last_update:'12/11/12'},
    {actor_id:3 , first_name: 'Luis Angel', last_name:'Solorzano marin' , last_update:'12/08/12'}
])

const [actor,set_actor] = useState({
  first_name : '',
  last_name: '',
  actor_id: 0
})

const loadActors = () => {

  axios.get('http://127.0.0.1:8000/api/actors')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_actors(response.data.actors)
  
  }).catch(function( error) {
   console.log('Something was wrong')

   
  });

}


const delete_actor = (id) => {
  axios.post('http://127.0.0.1:8000/api/actor/delete?id=' + id)
         .then(function (response) {
          console.log('Eliminacion exitoso')
          loadActors()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });
  
}

const save_or_edit_actor = () => {
  const url = actor.actor_id == 0 ? 'create' : 'edit'
  const obj_actor = {
    id : actor.actor_id != 0 ? actor.actor_id : null,
    first_name : actor.first_name,
    last_name : actor.last_name
  }

   axios.post('http://127.0.0.1:8000/api/actor/' + url,obj_actor)
         .then(function (response) {
          console.log('Guardado exitoso')
          loadActors()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });

}


const edit_actor = (actor) => {
  console.log('Actor',actor);
  set_actor(actor)
}
const change_first_name = (e) =>{
  const value = e.target.value
  set_actor({...actor,first_name:value})
}

const change_last_name = (e) =>{
  const value = e.target.value
  set_actor({...actor,last_name:value})
}

  return (
    <section style={{ marginLeft: '20%' }} class="content">
      <div class="row">
      <div class="col-md-6">
        <div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Actors</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">First name</label>
        <input type="text" className="form-control" onChange={(e) => change_first_name(e)} value={actor.first_name} id="exampleInputtext1" placeholder="Enter first name" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputtext1">last name</label>
        <input type="text" className="form-control" onChange={(e) => change_last_name(e)} value={actor.last_name} id="exampleInputtext1" placeholder="Enter last name" />
      </div>
     
     
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="button" onClick={(e)=>save_or_edit_actor()} className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

        </div>

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Actors</h3>
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
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Last update</th>
                    <th>action</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                {actors.map(act =>{
                 return( <tr>
                    <td>{act.actor_id}</td>
                    <td>{act.first_name}</td>
                    <td>{act.last_name}</td>
                    <td>{act.last_update}</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a onClick={(e) => edit_actor(act)} className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a  onClick={(e) => delete_actor(act.actor_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
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
