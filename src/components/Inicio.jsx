import React from 'react';
import Navbar from './Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../assets/css/Inicio.css';

// Importa las imágenes desde la carpeta de assets
import imagen1 from '../assets/images/azucar.jpg';
import imagen2 from '../assets/images/diabetes.png';
import imagen3 from '../assets/images/diabetesimg.jpg';
import diabetesImage from '../assets/images/Diabetes.jpg';

const Inicio = () => {
  
  const images = [
    { src: imagen1, alt: 'Imagen 1' },
    { src: imagen2, alt: 'Imagen 2' },
    { src: imagen3, alt: 'Imagen 3' },
  ];

  return (
    <><Navbar />
    <div className="inicio-container">


      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">

              <div className="card-body">
                <h1 className="card-title">Diabetes Mellitus</h1>
                <img
                  src={diabetesImage}
                  alt="Diabetes Mellitus"
                  className="card-img-top"
                  style={{ maxWidth: '900px', maxHeight: '700px' }} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <Carousel>
              {images.map((image, index) => (
                <div key={index} className="custom-carousel-item">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="carousel-image img-fluid" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  <span className="highlight-text">¿Qué es la Diabetes Mellitus?</span>
                </h2>
                <p className="card-text">
                  La diabetes mellitus (DM) es una enfermedad metabólica crónica
                  que está adquiriendo proporciones de epidemia en los últimos
                  años.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Se Caracteriza por</h2>
                <p className="card-text">
                  Se caracteriza por alteraciones en los niveles de azúcar en
                  la sangre, lo que puede tener graves repercusiones en la salud
                  si no se controla adecuadamente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Tipos de Diabetes:</h2>
                <ul className="card-text">
                  <li>Diabetes Tipo 1</li>
                  <li>Diabetes Tipo 2</li>
                  <li>Diabetes Gestacional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Síntomas comunes:</h2>
                <ul className="card-text">
                  <li>Aumento de la sed</li>
                  <li>Aumento de la micción</li>
                  <li>Aumento del hambre</li>
                  <li>Fatiga</li>
                  <li>Pérdida de peso inexplicada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Estrategias de manejo:</h2>
                <ul className="card-text">
                  <li>Control de la dieta</li>
                  <li>Actividad física</li>
                  <li>Monitoreo de glucosa</li>
                  <li>Tratamiento farmacológico</li>
                  <li>Educación en diabetes</li>
                  <li>Manejo del estrés</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Inicio;
