import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Category() {

  
    useEffect(()=>{
  
      loadCategories();
  
    },[])
  
    const [categories,set_categories] = useState([
      {category_id:1 , name: 'Categoria 1', last_update:'12/12/12'},
      {category_id:2 , name: 'Categoria 2 ',  last_update:'12/11/12'},
      {category_id:3 , name: 'Categoria 3', last_update:'12/08/12'}
  ])

  const [category,set_category] = useState({
    name : '',
    category_id: 0
  })

  const loadCategories = () => {

    axios.get('http://127.0.0.1:8000/api/categories')
    .then(function (response) {
     console.log('Carga exitoso')
     console.log(response);
     set_categories(response.data.categories)
    
    }).catch(function( error) {
     console.log('Something was wrong')
  
     
    });
  
  }
  
  
const delete_category = (id) => {
  axios.post('http://127.0.0.1:8000/api/category/delete?id=' + id)
         .then(function (response) {
          console.log('Eliminacion exitoso')
          loadCategories()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });
  
}

const save_or_edit_category = () => {
  const url = category.category_id == 0 ? 'create' : 'edit'
  const obj_category = {
    id : category.category_id != 0 ? category.category_id : null,
    name : category.name,
  }

   axios.post('http://127.0.0.1:8000/api/category/' + url,obj_category)
         .then(function (response) {
          console.log('Guardado exitoso')
          loadCategories()
         
         }).catch(function( error) {
          console.log('Something was wrong')

          
         });

}


const edit_category = (category) => {
  set_category(category)
}
const change_name = (e) =>{
  const value = e.target.value
  set_category({...category,name:value})
}


  return (
    <section style={{ marginLeft: '20%' }} class="content">
      <div class="row">
      <div class="col-md-6">
        <div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Category</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="text" onChange={(e) => change_name(e)} value={category.name} className="form-control" id="exampleInputtext1" placeholder="Enter  name" />
      </div>
      
     
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="button"  onClick={(e)=>save_or_edit_category()} className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

        </div>

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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                {categories.map(cat =>{
                 return( <tr>
                    <td>{cat.category_id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.last_update}</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a onClick={(e) => edit_category(cat)} className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a  onClick={(e) => delete_category(cat.category_id)} className="btn btn-danger"><i className="fas fa-trash" /></a>
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
