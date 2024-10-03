import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function TrackingPage() {
    const [orderExist, setOrderExist] = useState("form");
    const [order, setOrder] = useState("store");
    const [orderNo, setOrderNo] = useState('');
    const [direccion, setDireccion] = useState('');



    const getOrderExist = () => {
        const trnumber = orderNo;
        const url = `http://localhost:3001/api/data/${trnumber}`;
        axios.get(url)
            .then(response => {
                const data = response.data[0];
                setOrder(data.status);
                setDireccion(data.direccion);
                setOrderExist("exist");
            }).catch(error => {
                console.error('Error al obtener la orden:', error);
            });
    }

    const returnForm = () => {
        setOrderExist('form');
    }


    if (orderExist === "form") {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 style={{ color: '#285943', textAlign: 'center' }}>Order Track</h1>
                    <form className="p-4" onSubmit={(e) => { e.preventDefault(); getOrderExist(); }} style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="form-group">
                            <label htmlFor="orderNumber">Número de Orden</label>
                            <input
                                type="text"
                                className="form-control"
                                id="orderNumber"
                                placeholder="No. Orden"
                                autoComplete="off"
                                value={orderNo} // Establecer el valor del input
                                onChange={(e) => setOrderNo(e.target.value)} // Actualizar el estado
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block mx-auto defaultButt" >Buscar</button>
                    </form>
                </div>
            </div>
        );
    }

    if (orderExist === "notExist") {
        return (
            <div id="trackingDiv">
                <h1 className="bigFont boldFont darkFont"> Orden no encontrada! </h1>
            </div>
        );
    }

    if (orderExist === "exist") {
        return (
            <div id="trackingDiv">
                <div id="trackingContainer">
                    <div id="orderNo">
                        <h1 className="bigFont boldFont whiteFont">ORDEN NÚMERO: {orderNo}</h1>
                    </div>
                    <div id="dataOrder">
                        <h1 className="defaultFont darkFont">Estado: {capitalizeFirstLetter(order)}</h1>
                        <h1 className="defaultFont darkFont">Dirección de envío: {capitalizeFirstLetter(direccion)}</h1>
                    </div>
                    <div id="statusGraph">
                        <img src="/icons/clip.svg" className="trackIcon" />
                        <img
                            src={order === "surtiendose" ||
                                 order === "empacandose" ||
                                 order === "en_ruta" ||
                                 order === "entregada" ? "/icons/line.svg" : "/icons/no_line.svg"}
                            className="trackLine"
                        />
                        <img
                            src={order === "surtiendose" ||
                                order === "empacandose" ||
                                order === "en_ruta" ||
                                order === "entregada" ? "/icons/shop.svg" : "/icons/no_shop.svg"}
                            className="trackIcon"
                        />
                        <img
                            src={order === "empacandose" ||
                                 order === "en_ruta" ||
                                 order === "entregada" ? "/icons/line.svg" : "/icons/no_line.svg"}
                            className="trackLine"
                        />
                        <img
                            src={order === "empacandose" ||
                                order === "en_ruta" ||
                                order === "entregada" ? "/icons/box.svg" : "/icons/no_box.svg"}
                            className="trackIcon"
                        />
                        <img
                            src={order === "en_ruta" ||
                                 order === "entregada" ? "/icons/line.svg" : "/icons/no_line.svg"}
                            className="trackLine"
                        />
                        <img
                            src={order === "en_ruta" ||
                                order === "entregada" ? "/icons/truck.svg" : "/icons/no_truck.svg"}
                            className="trackIcon"
                        />
                        <img
                            src={order === "entregada" ? "/icons/line.svg" : "/icons/no_line.svg"}
                            className="trackLine"
                        />
                        <img
                            src={order === "entregada" ? "/icons/check.svg" : "/icons/no_check.svg"}
                            className="trackIcon"
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-primary mt-3 d-block mx-auto defaultButt" onClick={returnForm}>Regresar</button>
            </div>
        );
    }
}

export default TrackingPage;