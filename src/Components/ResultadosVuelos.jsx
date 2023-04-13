import React, { useState } from "react";
import cheerio from "cheerio";
import axios from "axios";


const ResultadoVuelos = (props) => {
    const [mejorPrecio, setMejorPrecio] = useState(null);
  
    const obtenerMejorPrecio = async () => {
      const { aeropuertoOrigen, aeropuertoDestino, tipoVuelo, fechaIda, fechaVuelta } = props.valoresFormulario;
      console.log(aeropuertoOrigen);
      const url = tipoVuelo === "ida" ?
        `https://www.smiles.com.ar/emission?originAirportCode=${aeropuertoOrigen}&destinationAirportCode=${aeropuertoDestino}&departureDate=${fechaIda}&adults=1&children=0&infants=0&isFlexibleDateChecked=false&tripType=2&cabinType=all&currencyCode=BRL` :
        `https://www.smiles.com.ar/emission?originAirportCode=${aeropuertoOrigen}&destinationAirportCode=${aeropuertoDestino}&departureDate=${fechaIda}&adults=1&children=0&infants=0&isFlexibleDateChecked=false&tripType=2&cabinType=all&currencyCode=BRL&returnDate=${fechaVuelta}`;
      try {
        const response = await fetch(url);
        const html = await response.text();

        // aquí realizar el scraping de la página para obtener el mejor precio
        // y asignarlo a la variable mejorPrecio utilizando setMejorPrecio()
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        {/* aquí mostrar el mejor precio obtenido */}
      </div>
    );
  };
  
  export default ResultadoVuelos;