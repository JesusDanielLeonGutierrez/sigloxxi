import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'
import LogoutButton from './LogoutButton'
import {AuthContext} from "../context/AuthProvider";
import axios from "axios";
import {API_URL} from "../Config";

function Navbar() {

  const [clicked, setClicked] = useState(false)
  const [rol, setRol] = useState(null);
  const [tokenAccess, setTokenAccess] = useState(null);

  const {auth} = useContext(AuthContext);


  useEffect(() => {
    try {
      setTokenAccess(localStorage.getItem('token').replace(/['"]+/g, ''));

      axios.get(API_URL +'/api/user', {
        headers: {
          Authorization: `Bearer ${tokenAccess}`
        }
      })
          .then((response) => {
            setRol(response.data.rol_id);
            // console.log(response.data);
          })
          .catch((error) => {
            // console.error(error);
          });
    } catch (e) {
      setTokenAccess(null);
    }
  }, [tokenAccess]);

  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  }

  return (
    <>
      <NavContainer>
        <a onClick={handleClick} href="./Inicio"><h2>Encuesta de riesgo Diabetes</h2></a>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <a onClick={handleClick} href="./">Inicio</a>
          <a onClick={handleClick} href="./Encuesta">Encuesta</a>
          {auth ? (<>{rol !== 3 ? (<a onClick={handleClick} href="./Citas">Citas</a>) : null}
            {rol === 1 ? (
                <>
                  <a onClick={handleClick} href="./Doctores">Doctores</a>
                  <a onClick={handleClick} href="./Registro">Registrar Médico</a>
                  <a onClick={handleClick} href="./Pacientes">Pacientes</a>
                </>
              ) : null}
            { rol === 2 ? (<>
                  <a onClick={handleClick} href="./Pacientes">Pacientes</a>
                  <a onClick={handleClick} href="./RegistroPacientes">Registrar pacientes</a>
                </>
              ) : null}
          </>) : null}
          {tokenAccess === null ? (<a onClick={handleClick} href="./Login">Iniciar sesión</a>) : (
              <a onClick={handleLogout} href="./">Cerrar sesión</a>)}
        </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  )
}

export default Navbar

const NavContainer = styled.nav`
  h2 {
    color: white;
    font-weight: 400;

    span {
      font-weight: bold;
    }
  }

  padding: .4rem;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }

  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;

    a {
      color: white;
      font-size: 2rem;
      display: block;
    }

    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        color: white;
        display: inline;
      }

      display: block;
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;

    a {
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }

  .burguer {
    @media (min-width: 768px) {
      display: none;
    }
  }
`

const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease;

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`