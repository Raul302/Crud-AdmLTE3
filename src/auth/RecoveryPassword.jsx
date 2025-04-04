import React, { useState } from 'react'
import url_api from '../constants/constants';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RecoveryPassword() {

  const [ step ,set_setp] = useState(0)
  const [ user , set_user] = useState({
    email : '',
    otp : '',
    temporary_password : '',
    new_password : ''
  })
  const navigate = useNavigate();




  const request_new_password = (  ) => {
    const route = step == 0 ?'/request_new_password' :  '/update/new_password'
    // toast.info('Loading data!',{autoClose:1000})
    axios.post(url_api + route, user, {
      headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${bearer_token}`,
        baseURL: "http://localhost:8000",
        withCredentials: true,
      }


    })
      .then(function (response) {

        if(response.status == 200) {
          set_setp(1)
          console.log('RESPONSE',response);
        }
        if(response.status == 201) {
         toast.info('New password changed!',{autoClose:1000})
          navigate("/login");

        }
        if(response.status == 202){
          toast.error('Something was wrong!',{autoClose:1000})
        }


      }).catch(function (error) {
        toast.error('Something was wrong!',{autoClose:1000})

        // toast.error('Something was wrong')


      }).catch(function (error) {
      
        console.log('ERROR',error);
      })
      }


  return (
    <div className='box_auth mt-5'>
                <ToastContainer />

     <div className="login-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
      <form  method="post">
      { step == 0 &&
      
      <div className="input-group mb-3">
      <input type="email" className="form-control"   disabled={step == 1 ? true : false} onChange={(e) => set_user( {...user,email:e.target.value })} placeholder="Email" />
      <div className="input-group-append">
        <div className="input-group-text">
          <span className="fas fa-envelope" />
        </div>
      </div>
    </div>
    }

       { step == 1 &&
       
     <>
       <label > Temporary password</label>
       <div className="input-group mb-3">
         <input type="password" className="form-control"  onChange={(e) => set_user( {...user,temporary_password:e.target.value })} placeholder="Insert password received" />
         <div className="input-group-append">
           <div className="input-group-text">
             <span className="fas fa-envelope" />
           </div>
         </div>
       </div>


       <label > New password</label>

<div className="input-group mb-3">
  <input type="password" className="form-control" onChange={(e) => set_user( {...user,new_password:e.target.value })} placeholder="Insert new password" />
  <div className="input-group-append">
    <div className="input-group-text">
      <span className="fas fa-envelope" />
    </div>
  </div>
</div>

<label > OTP</label>

<div className="input-group mb-3">
  <input type="text" className="form-control" onChange={(e) => set_user( {...user,otp:e.target.value })} placeholder="OTP" />
  <div className="input-group-append">
    <div className="input-group-text">
      <span className="fas fa-envelope" />
    </div>
  </div>
</div>

       </>
       }

       


        <div className="row">
          <div className="col-12">
            <button type="button" onClick={(e) => request_new_password()} className="btn btn-primary btn-block">
              { step == 0 ? 
              'Request new password'
              :
              'Send new password'       
            }
              </button>
          </div>
          {/* /.col */}
        </div>
      </form>
    </div>
    {/* /.login-card-body */}
  </div>
</div>



    </div>
  )
}
