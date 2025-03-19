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
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>150</h3>
                <p>Actors</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="actor" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
                <p>Film</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="film" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

             {/* ./col */}
             <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>44</h3>
                <p>Address</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="address" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>


          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Category</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="category" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

        

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>44</h3>
                <p>Country</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="country" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Customer</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="customer" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>44</h3>
                <p>Category</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="category" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Film Actor</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="film_actor" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>


           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>44</h3>
                <p>Film Category</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="film_category" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>44</h3>
                <p>Category</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="category" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Film text</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="film_text" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>44</h3>
                <p>Inventory</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="inventory" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>44</h3>
                <p>Language</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="language" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Payment</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="payment" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>

           {/* ./col */}
           <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>44</h3>
                <p>Rental</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="rental" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>
                <p>Staff</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="staff" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}



    
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>
</div>

    </div>
  )
}
