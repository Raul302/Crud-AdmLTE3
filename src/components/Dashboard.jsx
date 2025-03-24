import React from 'react'

export default function Dashboard() {
  return (
    <div>


<div>
  {/* !-- Content Wrapper. Contains page content --&gt; */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>{/* /.col */}
         
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
 
  <div className="col-md-5">
  {/* Bar chart */}
  <div className="card card-primary card-outline">
    <div className="card-header">
      <h3 className="card-title">
        <i className="far fa-chart-bar" />
        Payments Chart
      </h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-minus" />
        </button>
        <button type="button" className="btn btn-tool" data-card-widget="remove">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
    <div className="card-body">
      <div id="bar-chart" style={{height: 300}} />
    </div>
    {/* /.card-body*/}
  </div>
  {/* /.card */}


  {/* /.card */}
</div>


    {/* /.content */}
  </div>
</div>

    </div>
  )
}
