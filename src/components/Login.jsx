import React, {useState, useContext} from 'react';
import '../assets/scss/Login.scss';
import Navbar from './Navbar';
import {AuthContext} from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <Navbar />
      <div className='bodyLogin'>
        <div className='wrapperLogin'>
          <div className='innerLogin'>

            <form className='formLogin' id='form_login' onSubmit={handleSubmit}>
              <h3 className='h3Login'>
                <a className='aLogin'>Iniciar Sesión</a>
              </h3>
              <div className='form-holderLogin active'>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='CORREO'
                  className='form-controlLogin'
                />
              </div>
              <div className='form-holderLogin'>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='CONTRASEÑA'
                  className='form-controlLogin'
                />
              </div>
              <div className='form-loginLogin'>
                <button className='buttonLogin' type='submit'>
                  Acceder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;