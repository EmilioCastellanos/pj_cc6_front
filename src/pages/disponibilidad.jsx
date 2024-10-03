import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';



const Disponibilidad = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/disponibilidad');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th> // Encabezados de la tabla
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, subIndex) => (
                <td key={subIndex}>{value}</td> // Valores de cada fila
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

  export default Disponibilidad;