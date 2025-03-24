import React, { useEffect, useState } from 'react'
import { Chart as ChartJs } from 'chart.js/auto';
import { Bar,Doughnut, Line } from 'react-chartjs-2'
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../constants/constants';

export default function Dashboard() {

  const [ most_rentals , set_most_rentals] = useState([{}]);
  const [ avg_films_rentals_bycategory , set_avg_films_rentals_bycategory] = useState([{}]);
  const [ most_actor_apparitions , set_most_actor_apparitions] = useState([{}]);
  const [ less_actor_aparitions , set_less_actor_aparitions] = useState([{}]);

  

  
  
  useEffect(()=>{
    most_films_rentals();
    avg_films_rentals_category()
    actor_apparitions_load()
  },[])



  // colors
  const background_color = [
    "rgba(43,63,229,0.8)",
    "rgba(250,63,229,0.8)",
    "rgba(229, 43, 173, 0.8)",
    "rgba(135, 136, 153, 0.8)",
    "rgba(3, 214, 84, 0.8)",
    "rgba(185, 8, 8, 0.8)",
    "rgba(43,63,229,0.8)",
    "rgba(111, 1, 255, 0.8)",
    "rgba(40, 16, 71, 0.8)",
    "rgba(229, 142, 43, 0.8)",
  ]

  const randomBack = () =>{
    const position = Math.floor(Math.random() * 10);
    return background_color[position]
  }



  

  const actor_apparitions_load = () => {
    // toast.info('Loading data!',{autoClose:1000})
    axios.get(url+'/dashboard/actor_appearances')
      .then(function (response) {
        set_most_actor_apparitions(response.data.most_apparitions)
        set_less_actor_aparitions(response.data.less_apparitions)
     console.log('RES[PONSESSE',response)
      }).catch(function (error) {
        // toast.error('Something was wrong')


      });
  }
  const avg_films_rentals_category = () => {
    // toast.info('Loading data!',{autoClose:1000})
    axios.get(url+'/dashboard/avg_films_rentals_bycategory')
      .then(function (response) {
        set_avg_films_rentals_bycategory(response.data.avg_films_rentals_bycategory);
        // set_actors(response.data.actors)

      }).catch(function (error) {
        // toast.error('Something was wrong')


      });
  }
  const most_films_rentals = () =>{

    
    // toast.info('Loading data!',{autoClose:1000})
    axios.get(url+'/dashboard/most_film_rentals')
      .then(function (response) {
        set_most_rentals(response.data.most_rentals);
        // set_actors(response.data.actors)

      }).catch(function (error) {
        // toast.error('Something was wrong')


      });
    
}
  return (
    <div>


<div>
  {/* !-- Content Wrapper. Contains page content --&gt; */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-12">
            <h1 className="m-0">Dashboard</h1>
          </div>{/* /.col */}
         
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
 
    <div className="row">

    <div className="col-md-8 col-xs-8 col-lg-6 ml-2">
  {/* Bar chart */}
  <div className="card card-primary card-outline">
    <div className="card-header">
      <h3 className="card-title">
        <i className="far fa-chart-bar" />
        &nbsp; 10 Most popular films
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
      <div id="bar-chart"  />
      <Bar 
      data={{
        labels:most_rentals.map((rental)=>rental.title),
        datasets:[{
          label:"Quantity Rental",
          data:most_rentals.map((rental) =>rental.quantity_rentals),
          backgroundColor: most_rentals.map((rental)=> randomBack())
        }]
      }}
      ></Bar>


    </div>
    {/* /.card-body*/}
  </div>
  {/* /.card */}


  {/* /.card */}
</div>


<div className="col-md-5 col-xs-5 col-lg-5">
  {/* Bar chart */}
  <div className="card card-primary card-outline">
    <div className="card-header">
      <h3 className="card-title">
        <i className="far fa-chart-bar" />
        &nbsp; AVG most rentals films by category
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
      <div id="bar-chart"  />
      <Line 
      data={{
        labels:avg_films_rentals_bycategory.map((rental)=>rental.rating),
        datasets:[{
          label:"AVG rentals by category",
          data:avg_films_rentals_bycategory.map((rental) =>rental.quantity_rentals),
          backgroundColor: avg_films_rentals_bycategory.map((rental)=> randomBack())
        }]
      }}
      ></Line>

    </div>
    {/* /.card-body*/}
  </div>
  {/* /.card */}


  {/* /.card */}
</div>

    </div>

    <div className="row">

<div className="col-md-6">
{/* Bar chart */}
<div className="card card-primary card-outline">
<div className="card-header">
  <h3 className="card-title">
    <i className="far fa-chart-bar" />
    &nbsp; Actors with more participations
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
  <div id="bar-chart"  />
  <Bar 
  data={{
    labels:most_actor_apparitions.map((rental)=>rental.fullname),
    datasets:[{
      label:most_actor_apparitions.map((rental)=>rental.fullname),
      data:most_actor_apparitions.map((rental) =>rental.apparitions),
      backgroundColor: most_actor_apparitions.map((rental)=> randomBack())
    }]
  }}
  ></Bar>


</div>
{/* /.card-body*/}
</div>
{/* /.card */}


{/* /.card */}
</div>


<div className="col-md-6">
{/* Bar chart */}
<div className="card card-primary card-outline">
<div className="card-header">
  <h3 className="card-title">
    <i className="far fa-chart-bar" />
    &nbsp; Actors with less participations
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
  <div id="bar-chart"  />
  <Bar 
  data={{
    
    labels:less_actor_aparitions.map((rental)=>rental.fullname),
    datasets:[{
      label:most_actor_apparitions.map((rental)=>rental.fullname),
      data:less_actor_aparitions.map((rental) =>rental.apparitions),
      backgroundColor: less_actor_aparitions.map((rental)=> randomBack())
    }]
  }}
  ></Bar>

</div>
{/* /.card-body*/}
</div>
{/* /.card */}


{/* /.card */}
</div>

</div>





    {/* /.content */}
  </div>
</div>

    </div>
  )
}
