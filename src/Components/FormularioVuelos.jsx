import React, { useState } from "react";
import ResultadoVuelos from "./ResultadosVuelos";
import moment from "moment-timezone";

const FormularioVuelos = () => {
  const [aeropuertoOrigen, setAeropuertoOrigen] = useState("");
  const [aeropuertoDestino, setAeropuertoDestino] = useState("");
  const [tipoVuelo, setTipoVuelo] = useState("ida");
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const fechaIdaUnix = new Date(fechaIda).getTime() / 1000;
    const fechaVueltaUnix = tipoVuelo ? null : new Date(fechaVuelta).getTime() / 1000;
    
    console.log(fechaIdaUnix);
    ;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="aeropuerto-origen">Aeropuerto de origen:</label>
        <input
          type="text"
          id="aeropuerto-origen"
          value={aeropuertoOrigen}
          onChange={(event) => setAeropuertoOrigen(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="aeropuerto-destino">Aeropuerto de destino:</label>
        <input
          type="text"
          id="aeropuerto-destino"
          value={aeropuertoDestino}
          onChange={(event) => setAeropuertoDestino(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tipo-vuelo">Tipo de vuelo:</label>
        <select
          id="tipo-vuelo"
          value={tipoVuelo}
          onChange={(event) => setTipoVuelo(event.target.value)}
        >
          <option value="ida">Sólo ida</option>
          <option value="ida-vuelta">Ida y vuelta</option>
        </select>
      </div>
      {tipoVuelo === "ida" ? (
        <div>
          <label htmlFor="fecha-ida">Fecha de ida:</label>
          <input
            type="date"
            id="fecha-ida"
            value={fechaIda}
            onChange={(event) => setFechaIda(event.target.value)}
          />
        </div>
      ) : (
        <div>
          <label htmlFor="fecha-ida">Fecha de ida:</label>
          <input
            type="date"
            id="fecha-ida"
            value={fechaIda}
            onChange={(event) => setFechaIda(event.target.value)}
          />
          <label htmlFor="fecha-vuelta">Fecha de vuelta:</label>
          <input
            type="date"
            id="fecha-vuelta"
            value={fechaVuelta}
            onChange={(event) => setFechaVuelta(event.target.value)}
          />
        </div>
      )}
      <button onClick={() => setMostrarResultados(true)}>Buscar vuelos</button>
{mostrarResultados && <ResultadoVuelos
  aeropuertoOrigen={aeropuertoOrigen}
  aeropuertoDestino={aeropuertoDestino}
  fechaIda={fechaIda}
  fechaVuelta={fechaVuelta}
  tipoVuelo={tipoVuelo}
/>}

    </form>
  );
};

export default FormularioVuelos;