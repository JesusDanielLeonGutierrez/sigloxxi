import React, { Component } from 'react';
import Navbar from './Navbar';
import '../assets/css/Encuestas.css';
import axios from 'axios';


class EncuestaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edad: '',
      imc: '',
      perimetroAbdominalHombres: '',
      perimetroAbdominalMujeres: '',
      actividadFisica: '',
      consumoFrutasVerduras: '',
      hipertension: '',
      nivelesAltosGlucosa: '',
      antecedentesDM: '',
      puntaje: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Lógica de cálculo de puntaje
calcularPuntaje = () => {
  let puntaje = 0;

  // Puntaje para la pregunta sobre la edad
 

  // Puntaje para la pregunta sobre el IMC
  if (this.state.imc === 'Menos de 25 kg/m²') {
    puntaje += 0;
  } else if (this.state.imc === 'Entre 25/30 kg/m²') {
    puntaje += 1;
  } else if (this.state.imc === 'Más de 30 kg/m²') {
    puntaje += 3;
  }

  // Puntaje para la pregunta sobre el género y el Perímetro abdominal
  const genero = this.state.genero;
  const perimetro = this.state.Pa;

  if (genero === 'hombre') {
    if (perimetro === 'Menos de 94 cm Menos de 80 cm') {
      puntaje += 0;
    } else if (perimetro === 'Entre 94-102 cm Entre 80-88 cm') {
      puntaje += 3;
    } else if (perimetro === 'Más de 102 cm Más de 88 cm') {
      puntaje += 4;
    }
  } else if (genero === 'mujer') {
    if (perimetro === 'Menos de 94 cm Menos de 80 cm') {
      puntaje += 0;
    } else if (perimetro === 'Entre 94-102 cm Entre 80-88 cm') {
      puntaje += 3;
    } else if (perimetro === 'Más de 102 cm Más de 88 cm') {
      puntaje += 4;
    }
  }

  // Puntaje para la pregunta sobre la actividad física
  if (this.state.Rf === 'Si') {
    puntaje += 0;
  } else if (this.state.Rf === 'No') {
    puntaje += 2;
  }
  

  // Puntaje para la pregunta sobre el consumo de frutas y verduras
  if (this.state.Ch === 'A diario') {
    puntaje += 0;
  } else if (this.state.Ch === 'No a diario') {
    puntaje += 2;
  }

  // Puntaje para la pregunta sobre la hipertensión
  if (this.state.La === 'Si') {
    puntaje += 2;
  } else if (this.state.La === 'No') {
    puntaje += 0;
  }
  

  // Puntaje para la pregunta sobre niveles altos de glucosa
  if (this.state.Ls === 'Si') {
    puntaje += 5;
  } else if (this.state.Ls === 'No') {
    puntaje += 0;
  }
  

  // Puntaje para la pregunta sobre antecedentes de Diabetes Mellitus en la familia
  if (this.state.Dm === 'No') {
    puntaje += 0;
  } else if (this.state.Dm === 'Si: abuelos, tíos o primos hermanos (pero no padres, hermanos o hijos)') {
    puntaje += 3;
  } else if (this.state.Dm === 'Si: padres, hermanos o hijos') {
    puntaje += 5;
  }
  


  // Actualiza el estado con el puntaje calculado
  this.setState({ puntaje });
}


  interpretarPuntaje = (puntaje) => {
    if (puntaje < 7) {
      return '1% Nivel de riesgo bajo';
    } else if (puntaje >= 7 && puntaje <= 11) {
      return '4% Nivel de riesgo ligeramente elevado';
    } else if (puntaje >= 12 && puntaje <= 14) {
      return '17% Nivel de riesgo moderado';
    } else if (puntaje >= 15 && puntaje <= 20) {
      return '33% Nivel de riesgo alto';
    } else {
      return '50% Nivel de riesgo muy alto';
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  

   
    // Calcula el puntaje antes de enviar los datos al backend
    this.calcularPuntaje();

    // URL de la API 
      const apiUrl = 'http://127.0.0.1:8000/api/encuesta';

      const data = {
        edad: this.state.edad,
        puntaje: this.state.puntaje
      };
    
    

      axios
      .post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
        // Puedes manejar la respuesta de la API aquí, por ejemplo, mostrar un mensaje al usuario.
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud a la API', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario.
      });
  };
  render() {
  
    return (
     
      <div>
         <Navbar />
        <h1>Encuesta de Diabetes Mellitus</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="card pregunta perimetro">
        <div className="card-body">
        <div className="pregunta edad">
        <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Cuál es su edad?</label>
            <br />
            <select name="edad" value={this.state.edad} 
            onChange={this.handleInputChange}
            className="pregunta-select">
              <option value="0">Seleccione una opción</option>
              <option value="45">Menos de 45 años</option>
              <option value="54">Entre 45-54 años</option>
              <option value="64">Entre 55-64 años</option>
              <option value="65">Más de 64 años</option>
            </select>
          </div>
          </div>
          </div>
          </div>
          </div>

           {/*////////////////////////////////////////////////////////////////////////////////////////*/}
          <div className="card pregunta perimetro">
          <div className="card-body">
          <div className="pregunta imc">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Cuál es su índice de masa corporal (IMC)?</label>
            <br />
            <select name="imc" value={this.state.imc} 
            onChange={this.handleInputChange}
            className="pregunta-select">
              <option value="">Seleccione una opción</option>
              <option value="Menos de 25 kg/m²">Menos de 25 kg/m²</option>
              <option value="Entre 25/30 kg/m²">Entre 25/30 kg/m²</option>
              <option value="Más de 30 kg/m²">Más de 30 kg/m²</option>
            </select>
          </div>
          </div>
          </div>
          </div>
          </div>

          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

          <div className="card pregunta perimetro">
          <div className="card-body">
          <div className="pregunta perimetro">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Cuál es su género?</label>
          <select name="genero" value={this.state.genero} onChange={this.handleInputChange} className="pregunta-select">
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
  
</select>

<select name="Pa" value={this.state.Pa} onChange={this.handleInputChange} className="pregunta-select">
  <option value="Menos de 94 cm Menos de 80 cm">(Menos de 94 cm) (Menos de 80 cm)</option>
  <option value="Entre 94-102 cm Entre 80-88 cm">(Entre 94-102) (Entre 80-88 cm)</option>
  <option value="Más de 102 cm Más de 88 cm">(Más de 102 cm) (Más de 88 cm)</option>
</select>

          </div>
          </div>
          </div>
          </div>
          </div>


          {/*////////////////////////////////////////////////////////////////////////////////////////*/}
          <div className="card pregunta perimetro">
          <div className="card-body">
          <div className="pregunta actividad">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Realiza normalmente al menos 30 minutos diarios de actividad física?</label>
            <br />
            <select name="Rf" value={this.state.Rf} onChange={this.handleInputChange} className="pregunta-select">
  <option value="">Seleccione una opción</option>
  <option value="Si">Si</option>
  <option value="No">No</option>
</select>

          </div>
          </div>
          </div>
          </div>
          </div>

 
        {/*////////////////////////////////////////////////////////////////////////////////////////*/}

        <div className="card pregunta perimetro">
        <div className="card-body">
          <div className="pregunta consumo">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Con qué frecuencia come frutas, verduras y hortalizas?</label>
            <br />
            <select name="Ch" value={this.state.Ch} 
            onChange={this.handleInputChange} className="pregunta-select">
            <option value="">Seleccione una opción</option>
            <option value="A diario">A diario</option>
            <option value="No a diario">No a diario</option>
            </select>
          </div>
          </div>
          </div>
          </div>
          </div>

          {/*////////////////////////////////////////////////////////////////////////////////////////*/}
        <div className="card pregunta perimetro">
        <div className="card-body">
          <div className="pregunta hipertension">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Le han recetado alguna vez medicamentos contra la Hipertensión arterial ?</label>
            <br />
            <select name="La" value={this.state.La} onChange={this.handleInputChange} className="pregunta-select">
            <option value="">Seleccione una opción</option>
            <option value="Si">Si</option>
          <option value="No">No</option>
            </select>

          </div>
          </div>
          </div>
          </div>
          </div>


          {/*////////////////////////////////////////////////////////////////////////////////////////*/}

        <div className="card pregunta perimetro">
        <div className="card-body">
          <div className="pregunta glucosa">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Le han detectado alguna vez niveles altos de glucosa en sangre?</label>
            <br />
            <select name="Ls" value={this.state.Ls} onChange={this.handleInputChange} className="pregunta-select">
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
               <option value="No">No</option>
                </select>

          </div>
          </div>
          </div>
          </div>
          </div>

        {/*////////////////////////////////////////////////////////////////////////////////////////*/}
        <div className="card pregunta perimetro">
        <div className="card-body">
          <div className="pregunta antecedentes">
          <div className="pregunta">
          <div>
          <label className="pregunta-label">¿Ha habido algún diagnóstico de DM (Diabetes Mellitus) en su familia?</label>
            <br />
            <select name="Dm" value={this.state.Dm} onChange={this.handleInputChange} className="pregunta-select">
            <option value="">Seleccione una opción</option>
            <option value="No">No</option>
            <option value="Si: abuelos, tíos o primos hermanos (pero no padres, hermanos o hijos)">Si: abuelos, tíos o primos hermanos (pero no padres, hermanos o hijos)</option>
          <option value="Si: padres, hermanos o hijos">Si: padres, hermanos o hijos</option>
            </select>


          </div>
          </div>
          </div>
          </div>
          </div>
          
       
        
          <button className="calcular-btn" onClick={this.calcularPuntaje}>
            Calcular Puntaje
            </button>
            </form>
            {this.state.puntaje !== null && (
  <div className="resultado">
    <p>Puntaje: {this.state.puntaje}</p>
    <p>Interpretación: {this.interpretarPuntaje(this.state.puntaje)}</p>
  </div>
)}
      </div>
    );
  }
}

export default EncuestaForm;
