import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';


export default function Payments() {

  const [ page , set_page] = useState( 0 )
      const [max_page , set_max_page] = useState(0)



            
  const navigate = useNavigate();

  const [ read_or_edit , set_read_or_edit ] = useState(false)
  
  const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);

    useEffect(()=>{
      
         const hasPermission = routes_permited.find((route)=> route.url == '/payments')
         if(hasPermission){
          if(hasPermission.permission == 0 ) {
            navigate("/login")

          }
           if( hasPermission.permission == 1){
            set_read_or_edit(true)
           }
          
         } else {
          navigate("/login")
         }
      
        },[])

        
  useEffect(()=>{

    load_payments( page );

  },[ page ])

  const [payments,set_payments] = useState([
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'},
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'},
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'}
])


const load_payments = ( page ) => {

  axios.get(url+'/payments/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_payments(response.data.payments)
   set_max_page(Math.ceil(response.data.total_pages) )

  
  }).catch(function( error) {
   console.log('Something was wrong')

   
  });

}




   
  return (
    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">
      

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Payments</h3>
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
                    <th>Payment ID</th>
                    <th>Customer ID</th>
                    <th>Customer fullname</th>
                    <th>Staff ID</th>
                    <th>Staff Fullname</th>
                    <th>Rental ID</th>
                    <th>Rental Date</th>
                    <th>Amount</th>
                    <th>Payment date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {payments.map(payment =>{
                 return( <tr>
                    <td>{payment.payment_id}</td>
                    <td>{payment.customer_id}</td>
                    <td>{payment.fullname_customer}</td>
                    <td>{payment.staff_id}</td>
                    <td>{payment.fullname_staff}</td>
                    <td>{payment.rental_id}</td>
                    <td>{payment.rental_date}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.payment_date}</td>

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
                                                                      <>
                                                                      <li className="page-item"><Link onClick={(e) => set_page(0) } className="page-link" >««</Link></li>
                                                                      <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                                                                      </>
                                                                      }
                                                                    {payments.length >=10 &&
                                                                    
                                                                    <>
                                                                    <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
                                                                    <li className="page-item"><Link onClick={(e) => set_page(max_page) } className="page-link" >»»</Link></li>
                                                                    </>
                                                                    }
              </ul>
            </div>
          </div>
          {/* /.card */}



        </div>
     
      </div>
    </section >
  )
}
