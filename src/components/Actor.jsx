import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url_api from '../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Actor() {
  

  const [page,set_page] = useState(0)
  
  
  useEffect(() => {

    loadActors(page);

  }, [page])


  const [actors, set_actors] = useState([
    // { actor_id: 1, first_name: 'Luis raul', last_name: 'perez marin', last_update: '12/12/12' },
    // { actor_id: 2, first_name: 'Jose raul', last_name: 'perez Dominguez', last_update: '12/11/12' },
    // { actor_id: 3, first_name: 'Luis Angel', last_name: 'Solorzano marin', last_update: '12/08/12' },
    
    // { actor_id: 1, first_name: 'Luis raul', last_name: 'perez marin', last_update: '12/12/12' },
    // { actor_id: 2, first_name: 'Jose raul', last_name: 'perez Dominguez', last_update: '12/11/12' },
    // { actor_id: 3, first_name: 'Luis Angel', last_name: 'Solorzano marin', last_update: '12/08/12' },

    // { actor_id: 1, first_name: 'Luis raul', last_name: 'perez marin', last_update: '12/12/12' },
    // { actor_id: 2, first_name: 'Jose raul', last_name: 'perez Dominguez', last_update: '12/11/12' },
    // { actor_id: 3, first_name: 'Luis Angel', last_name: 'Solorzano marin', last_update: '12/08/12' },

    // { actor_id: 1, first_name: 'Luis raul', last_name: 'perez marin', last_update: '12/12/12' },
    // { actor_id: 2, first_name: 'Jose raul', last_name: 'perez Dominguez', last_update: '12/11/12' },
    // { actor_id: 3, first_name: 'Luis Angel', last_name: 'Solorzano marin', last_update: '12/08/12' }
  ])


  const [actor, set_actor] = useState({
    first_name: '',
    last_name: '',
    actor_id: 0
  })

  const [ operation , set_operation ] = useState('Create');
  const [ editing_or_creating , set_editing_or_creating ] = useState(false);

  const reset_actor = () => {
    set_actor(
      {
        first_name: '',
        last_name: '',
        actor_id: 0
      }
    )
  }

  console.log('JEEJEJEJEJ',actors)

  const loadActors = (page = 0) => {

    toast.info('Loading data!',{autoClose:1000})
    axios.get(url_api+'/actors/'+page)
      .then(function (response) {
        console.log(response);
        set_actors(response.data.actors)

      }).catch(function (error) {
        toast.error('Something was wrong')


      });

  }


  const delete_actor = (id) => {
    axios.post(url_api+'/actor/delete?id=' + id)
      .then(function (response) {
        console.log('Eliminacion exitoso')
        loadActors(page)
        toast.success('Operation compelte!')

      }).catch(function (error) {
        toast.error('Something was wrong')

      });

  }

  const save_or_edit_actor = () => {
    const url = actor.actor_id == 0 ? 'create' : 'edit'
    const obj_actor = {
      actor_id: actor.actor_id != 0 ? actor.actor_id : null,
      first_name: actor.first_name,
      last_name: actor.last_name
    }

    axios.post(url_api+'/actor/'+url, obj_actor)
      .then(function (response) {
        console.log('Guardado exitoso')
        loadActors(page)
        toast.success('Operation compelte!')
        close_form()


      }).catch(function (error) {
        toast.error('Something was wrong')

      });


  }

  const open_form = () => {
    set_operation('Create')
    reset_actor();
    set_editing_or_creating(true);
  }
  const close_form = () => {
    reset_actor();
    set_editing_or_creating(false);
  }

  const edit_actor = (actor) => {
    set_operation('Edit')
    set_editing_or_creating(true)
    console.log('Actor', actor);
    set_actor(actor)
  }
  const change_first_name = (e) => {
    const value = e.target.value
    set_actor({ ...actor, first_name: value })
  }

  const change_last_name = (e) => {
    const value = e.target.value
    set_actor({ ...actor, last_name: value })
  }

  return (
    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">
      <div  style={{display:'flex',textAlign:'right'}}class="col-md-12 mb-5">
      <button type="button" onClick={(e) => open_form()} className="btn btn-primary">Create</button>
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer />
      </div >
        {editing_or_creating &&
        
        <div class="col-md-4">
        <div className="card card-primary">
          <div style={{display:'flex'}} className="card-header">
            <div class="col-md-11">
            <h3 className="card-title">{operation}</h3>
            </div>
            <div onClick = {(e) => close_form()} class="col-xs-1 col-md-1" style={{ cursor:'pointer', justifyContent:'right',textAlign:'right',alignItems:'right',display:'flex'}}>
            <h3 className="card-title">x</h3>
            </div>
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
              <button type="button" onClick={(e) => save_or_edit_actor()} className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

      </div>

        }
      

        <div className={editing_or_creating ? "col-md-6" : "col-md-12"}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Actors</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Last update</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                {actors.map(act => {
                    return (<tr>
                      <td>{act.actor_id}</td>
                      <td>{act.first_name}</td>
                      <td>{act.last_name}</td>
                      <td>{act.last_update}</td>

                      <td className="text-right py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <a onClick={(e) => edit_actor(act)} className="btn btn-info"><i className="fas fa-edit" /></a>
                          <a onClick={(e) => delete_actor(act.actor_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
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
                <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                }
                <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
              </ul>
            </div>
          </div>
          {/* /.card */}

        </div>

      </div>
    </section >
  )
}
