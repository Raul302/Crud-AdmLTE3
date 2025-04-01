import axios from 'axios';
import React, { useContext, useState } from 'react'

import { Link , useNavigate } from 'react-router-dom'
import url_api from '../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import { TokenContext } from '../context/TokenContext';
import routes from '../routes/routes';


export default function Login() {

  const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);
  const navigate = useNavigate();

  const [user, set_user] = useState({
    email: '',
    password: '' , 
    otp : null
  });


  const [verification, set_verification] = useState(0);

  const [token, set_token] = useState( null );



  const login = () => {
    if (verification == 1 && user.otp) {
      first_auth('/login/auth/otp');
    }
    else {
      first_auth('/login/auth');
    }

  }


  const load_modules_permited = async (bearer_token) => {


    let routes_permited = [];
  
      // toast.info('Loading data!',{autoClose:1000})
      await axios.get(url_api + '/permissions', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearer_token}`,
          baseURL: "http://localhost:8000",
          withCredentials: true,
        }
  
  
      })
        .then(function (response) {
  
          response.data.permissions.map((element) => {
           routes.map( (route) => {
              if(route.url == element.route){
                   if(element.permission != 0){
                    routes_permited.push({...route,permission:element.permission})
                   }
              }
            })
          })
          
          // set_most_actor_apparitions(response.data.most_apparitions)
          // set_less_actor_aparitions(response.data.less_apparitions)
          
        }).catch(function (error) {
          // toast.error('Something was wrong!',{autoClose:1000})
          
          // toast.error('Something was wrong')
          
          
        });
        set_routes_permited(routes_permited);
        navigate("/");

    
  
  }


  const first_auth = ( route ) => {
    // toast.info('Loading data!',{autoClose:1000})
    axios.post(url_api + route, user, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`,
        baseURL: "http://localhost:8000",
        withCredentials: true,
      }


    })
      .then(function (response) {

        if (response.status == 200) {

          // set_token(response.data.token)
          set_verification(1)
         toast.info('OTP sent!',{autoClose:1000})

        } else if (response.status == 201){
          set_bearer_token(response.data.token)
          set_user_data(response.data.user)
          load_modules_permited(response.data.token)
          //  window.location.href = '/dashboard'
          console.log(' Response 400', response.data.token);
        }
        // set_most_actor_apparitions(response.data.most_apparitions)
        // set_less_actor_aparitions(response.data.less_apparitions)

      }).catch(function (error) {
        toast.error('Something was wrong!',{autoClose:1000})

        // toast.error('Something was wrong')


      });
  }


  return (
    <div className='box_auth mt-5'>
      <div className="login-box">
        <div className="login-logo">
          <Link to={'/'}><b>Admin</b>LTE</Link>
                <ToastContainer />
        
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form method="post">
              <div className="input-group mb-3">
                <input type="email" onChange={(e) => set_user({ ...user, email: e.target.value })} className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" onChange={(e) => set_user({ ...user, password: e.target.value })} className="form-control" placeholder="Password" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {verification == 1 &&

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} className="col-4">
                  <input type="text" onChange={(e) => set_user({ ...user, otp: e.target.value })} className="form-control" placeholder="OTP" />

                </div>
              }
              <div className="row">

                <div className="col-8">

                </div>
                {/* /.col */}
                <div className="col-4">
                  <button type="button" onClick={(e) => login()} className="btn btn-primary btn-block">Sign In</button>
                </div>
                {/* /.col */}
              </div>
            </form>

            {/* /.social-auth-links */}
            <p className="mb-1">
              <Link to={'/recoverypassword'} >I forgot my password</Link>
            </p>

          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      {/* /.login-box */}


    </div>
  )
}
