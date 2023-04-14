import React, { useState } from "react";
import ResultadoVuelos from "./ResultadosVuelos";
import moment from "moment-timezone";
import "moment-timezone/builds/moment-timezone-with-data";

const FormularioVuelos = () => {
  const [aeropuertoOrigen, setAeropuertoOrigen] = useState("");
  const [aeropuertoDestino, setAeropuertoDestino] = useState("");
  const [tipoVuelo, setTipoVuelo] = useState("ida");
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const fecha = new Date(fechaIda + "T00:00:00");
    // const fechaIdaUnix = Math.floor(fecha.getTime() / 1000);

    // const prueba = fechaIdaUnix * 1000;
    // const fechaVueltaUnix = tipoVuelo
    //   ? null
    //   : new Date(fechaVuelta).getTime() / 1000;

    // console.log(prueba);

    const airportCode = "EZE"; // aeropuerto de origen
    const dateStr = "2023-12-15"; // fecha de salida
    const timeZone = ""; // timezone del aeropuerto de origen

    fetch(
      "https://raw.githubusercontent.com/mwgg/Airports/master/airports.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const aeropuerto = Object.values(data).find(
          (airport) => airport.iata === aeropuertoOrigen
        );
        if (aeropuerto) {
          const timeZone = aeropuerto.tz;

          const departureDate = moment.tz(`${fechaIda} 12:00:00`, timeZone);

          // verifica si la zona horaria del aeropuerto observa la hora de verano en la fecha de salida
          const isDst = departureDate.isDST();
      
          // si la zona horaria del aeropuerto observa la hora de verano en la fecha de salida, ajusta la hora en consecuencia
          if (isDst) {
            departureDate.subtract(1, "hour");
          }
      
          // calcula el timestamp Unix
          const timestampUnix = departureDate.valueOf();
          console.log(timestampUnix);

        } else {
          console.log(
            `No se encontró ningún aeropuerto con el código IATA ${aeropuertoOrigen}`
          );
        }
      })
      .catch((error) => console.error(error));

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
      {mostrarResultados && (
        <ResultadoVuelos
          aeropuertoOrigen={aeropuertoOrigen}
          aeropuertoDestino={aeropuertoDestino}
          fechaIda={fechaIda}
          fechaVuelta={fechaVuelta}
          tipoVuelo={tipoVuelo}
        />
      )}
    </form>
  );
};

export default FormularioVuelos;
