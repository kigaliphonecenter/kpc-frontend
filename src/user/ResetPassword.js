import React, { useState, useEffect } from 'react';
import Menu from '../core/Menu'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    textChange: 'Submit'
  });
  const { password1, password2, textChange, token } = formData;

  useEffect(() => {
    let token = match.params.token
    if (token) {
      setFormData({ ...formData, token, })
    }

  }, [])
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetPassword`, {
          newPassword: password1,
          resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
          setFormData({
            ...formData,
            password1: '',
            password2: ''
          });
          toast.success(res.data.message);

        })
        .catch(err => {
          toast.error('Something is wrong try again');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };
  return (
   <div>
      <Menu />
   
    <div className='min-h-screen bg-yellow-400 text-gray-900 flex justify-center'>
      <ToastContainer />
   
          
           
<div className="reset-container">
     <div className="header-container">
      <div className="signin-header">
      <div className="signin-title">
        <h3>Reset Password</h3>
      </div>
    </div>
    </div>
  
    <div className="email">
          <label for="email">New Password <span>*</span></label>
          <input type="password" name="register" id="password"
       
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
          required/>
        </div>
    <div className="email">
          <label for="email">Re-Write Password <span>*</span></label>
          <input type="password" name="register" id="password"
       
                 placeholder='Confirm password'
                  onChange={handleChange('password2')}
                  value={password2}
          required/>
        </div>

        <div className="button">
          <button onClick={handleSubmit}  type="submit">Reset Password</button>
        </div>
  </div>
             
    </div>
    </div>
  );
};

export default ResetPassword;
