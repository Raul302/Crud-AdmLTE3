import React from 'react'

export default function Film() {
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
        <input type="text" className="form-control" id="exampleInputtext1" placeholder="Enter first name" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputtext1">Description</label>
        <input type="textarea" className="form-control" id="exampleInputtext1" placeholder="Enter last name" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputtext1">Release year</label>
        <input type="number" min="1900" className="form-control" id="exampleInputtext1" placeholder="Enter year" />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputtext1">Length</label>
        <input type="number" min="1900" className="form-control" id="exampleInputtext1" placeholder="Enter year" />
      </div>
     

      <div className="form-group">
        <label htmlFor="exampleInputtext1">Duration</label>
        <input type="number" min="30" className="form-control" id="exampleInputtext1" placeholder="Enter duration" />
      </div>
     
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Submit</button>
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
                    <th>Duration</th>
                    <th>Actions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Scary movie</td>
                    <td>Its a movie about ghostface but in parody</td>
                    <td>2009</td>
                    <td>3</td>
                    <td>120min</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a href="#" className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>Scary movie</td>
                    <td>Its a movie about ghostface but in parody</td>
                    <td>2009</td>
                    <td>3</td>
                    <td>120min</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a href="#" className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>Scary movie</td>
                    <td>Its a movie about ghostface but in parody</td>
                    <td>2009</td>
                    <td>3</td>
                    <td>120min</td>

                    <td className="text-right py-0 align-middle">
                      <div className="btn-group btn-group-sm">
                        <a href="#" className="btn btn-info"><i className="fas fa-edit" /></a>
                        <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                      </div>
                    </td>
                  </tr>


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
