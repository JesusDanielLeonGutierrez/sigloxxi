import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import {Registro} from './components/Registro';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Citas from './components/Citas';
import Encuesta from './components/Encuesta';
import Doctores from './components/Doctores';
import Pacientes from './components/Pacientes';
import RegistroPacientes from './components/RegistroPacientes';
import {AuthProvider} from "./context/AuthProvider";

function App() {
    return (<div className="App">
            <header>
                <div>
                    <BrowserRouter>
                        <AuthProvider>
                            <Routes>
                                <Route exact path="/" element={<Inicio/>}/>
                                <Route exact path="/Login" element={<Login/>}/>
                                <Route exact path="/Registro" element={<Registro/>}/>
                                <Route exact path="/RegistroPacientes" element={<RegistroPacientes/>}/>
                                <Route exact path="/Navbar" element={<Navbar/>}/>
                                <Route exact path="/Encuesta" element={<Encuesta/>}/>
                                <Route exact path="/Citas" element={<Citas/>}/>
                                <Route exact path="/Doctores" element={<Doctores/>}/>
                                <Route exact path="/Pacientes" element={<Pacientes/>}/>
                            </Routes>
                        </AuthProvider>
                    </BrowserRouter>
                </div>
            </header>
        </div>);
}

export default App;
