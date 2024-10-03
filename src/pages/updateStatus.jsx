import { useState } from "react";
import axios from "axios";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function UpdateStatus() {
    const [isAdmin, setIsAdmin] = useState('');
    const [pass, setPass] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [actualState, setActualState] = useState('');

    const getOrder = () => {
        const trnumber = orderNo;
        const url = `http://localhost:3001/api/data/${trnumber}`;
        axios.get(url)
            .then(response => {
                const data = response.data[0];
                setActualState(data.status);
                setIsAdmin('inOrder');
            }).catch(error => {
                console.error('Error al obtener la orden:', error);
            });
    }

    const checkAdmin = () => {
        if (pass === 'horcus420') {
            setIsAdmin('is');
        } else {
            alert('Contraseña incorrecta!');
        }
    }

    const nextStatus = async () => {
        const url = `http://localhost:3001/api/updateStatus`;

        if (actualState === 'orden_nueva') {
            const newData = {
                newStatus: 'surtiendose',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'surtiendose') {
            const newData = {
                newStatus: 'empacandose',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'empacandose') {
            const newData = {
                newStatus: 'en_ruta',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'en_ruta') {
            const newData = {
                newStatus: 'entregada',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        }
    }

    const prevStatus = async () => {
        const url = `http://localhost:3001/api/updateStatus`;

        if (actualState === 'entregada') {
            const newData = {
                newStatus: 'en_ruta',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'surtiendose') {
            const newData = {
                newStatus: 'orden_nueva',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'empacandose') {
            const newData = {
                newStatus: 'surtiendose',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        } else if (actualState === 'en_ruta') {
            const newData = {
                newStatus: 'empacandose',
                orderNo
            };
            await axios.post(url, newData)
                .then(response => {
                }).catch(error => {
                    console.error('Error al cambiar de estado:', error);
                });
            getOrder();
        }
    }

    if (isAdmin === 'is') {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 style={{ color: '#285943', textAlign: 'center' }}>Order Track</h1>
                    <form className="p-4" onSubmit={(e) => { e.preventDefault(); getOrder(); }} style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="form-group">
                            <label htmlFor="orderNumber">Número de Orden</label>
                            <input
                                type="text"
                                className="form-control"
                                id="orderNumber"
                                placeholder="No. Orden"
                                autoComplete="off"
                                required
                                value={orderNo} // Establecer el valor del input
                                onChange={(e) => setOrderNo(e.target.value)} // Actualizar el estado
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block mx-auto defaultButt">Buscar</button>
                    </form>
                </div>
            </div>
        );
    } else if (isAdmin === 'inOrder') {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6" style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '1vw' }}>
                    <div className="d-flex justify-content-center" style={{ gap: '1vw', display: 'flex', backgroundColor: '#285943', color: 'white' }}>
                        <h1 style={{ fontWeight: 'bold' }}>No. de orden: </h1>
                        <h1>{orderNo} </h1>
                    </div>
                    <div className="d-flex justify-content-center" style={{ gap: '1vw', display: 'flex' }}>
                        <h1>Estado actual: </h1>
                    </div>
                    <div className="d-flex justify-content-center" style={{ gap: '1vw', display: 'flex' }}>
                        <h1 style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(actualState)} </h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-primary mt-3 d-block mx-auto defaultButt" onClick={prevStatus}>Estado Anterior</button>
                        <button type="button" className="btn btn-primary mt-3 d-block mx-auto defaultButt" onClick={nextStatus}>Siguiente Estado</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 style={{ color: '#285943', textAlign: 'center' }}>Inicia sesión para actuailzar estado</h1>
                    <form className="p-4" style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="form-group">
                            <label htmlFor="orderNumber">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="orderNumber"
                                placeholder="Password"
                                required
                                value={pass}
                                onChange={(e) => setPass(e.target.value)} // Actualizar el estado
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block mx-auto defaultButt" onClick={checkAdmin}>Buscar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateStatus;