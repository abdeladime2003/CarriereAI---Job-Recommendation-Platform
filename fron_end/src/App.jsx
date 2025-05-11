import React from 'react';
// import private route
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/Client';
import Signup from './components/Signup_user';
import NotFound  from './components/NotFound';
import Signin from './components/Signin';
import CVUpload from './components/CvUpload';
import VerifyEmail from './components/verifyemail';
import JobResults from './components/JobResults';
import Dashboard from './components/dashbord';
import WelcomePage from './components/Home' ;
import EnterpriseSignup from './components/Signup_compagny' ;
import EnterpriseSignin from './components/Signin_company' ;  
import EnterpriseDashboard from './components/dashboard_compagny' ;
import JobPostingForm from './components/post_job';
import JobSearchInterface from './components/jobs';
function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<WelcomePage/>}/>
        <Route path="/client" element={<Client />} />
        <Route path="/client/signup" element={<Signup />}/>
        <Route path='/client/signin' element = {<Signin/>}/> 
        <Route path="/client/upload" element={<PrivateRoute Component={CVUpload}/>}/>
        <Route path="/verify-email/:token" component={VerifyEmail} />
        <Route path="/client/jobs" element={<PrivateRoute Component={JobResults}/>}/>
        <Route path="/client/job_search" element={<PrivateRoute Component={JobSearchInterface}/>}/>
        <Route path="/client/dashboard" element={<PrivateRoute Component={Dashboard}/>}/>
        <Route path="/Compagny/signup" element={<EnterpriseSignup />}/>
        <Route path="/Compagny/signin" element={<EnterpriseSignin />}/>
        <Route path="/Compagny/post_job" element={<JobPostingForm />} />
        <Route path="/Compagny/dashboard" element={<EnterpriseDashboard/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
