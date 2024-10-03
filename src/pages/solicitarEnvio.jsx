import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const generarIdEnvio = () => {
    const prefix = 'ORD'; // Prefijo para el ID
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio entre 1000 y 9999
    return `${prefix}${randomNum}`; // Devuelve el ID
};

function Solicitar() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState('notLogged');

    const [direccion, setDireccion] = useState("");
    const [peso, setPeso] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [newNo, setNewNo] = useState("");

    const logger = (e) => {
        e.preventDefault();
        console.log({ email, password });
        const emailUser = email;
        const url = `http://localhost:3001/api/users/${emailUser}`;
        axios.get(url)
            .then(response => {
                const user = response.data[0];
                console.log("usuario: ", user)
                if (user != null) {
                    if (password === user.pass) {
                        console.log('simon papi');
                        setLogged('logged');
                    } else {
                        console.log('noporolo');
                        alert('Contraseña incorrecta! Vuelve a intentar');
                    }
                } else {
                    alert('No se ha podido encontrar el usuario!');
                }
            }).catch(error => {
                console.error('Error al obtener el usuario:', error);
            });
    };

    const submitEnvio = (e) => {
        e.preventDefault();
        console.log({ direccion, peso, codigoPostal });

        const new_no_orden = generarIdEnvio();
        setNewNo(new_no_orden);

        const nuevoEnvio = {
            new_no_orden,
            direccion,
            peso,
            correo_usuario: email,
            codigoPostal
        };

        console.log("este es el nuevo", nuevoEnvio);

        const url = `http://localhost:3001/api/newUser`;
        axios.post(url, nuevoEnvio)
            .then(response => {
                setLogged('jajajalol')
                console.log(response);
            }).catch(error => {
                console.error('Error al ingresar el nuevo envío:', error);
            });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(newNo);
        alert("Número de orden copiado al portapapeles!");
    };


    if (logged === 'logged') {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 style={{ color: '#285943', textAlign: 'center' }}>Formulario de Envío</h1>
                    <form className="p-4" style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={submitEnvio}>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                id="direccion"
                                placeholder="Dirección"
                                autoComplete="off"
                                required
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="peso">Peso (kg)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                id="peso"
                                placeholder="Peso"
                                autoComplete="off"
                                required
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="codigoPostal">Código Postal del Departamento (5 dígitos)</label>
                            <input
                                type="text"
                                pattern="\d{5}"
                                className="form-control"
                                id="codigoPostal"
                                placeholder="Código Postal"
                                autoComplete="off"
                                required
                                value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block mx-auto defaultButt">Enviar</button>
                    </form>
                </div>
            </div>
        );
    } else if (logged === 'notLogged') {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 style={{ color: '#285943', textAlign: 'center' }}>Login</h1>
                    <form className="p-4" style={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={logger}>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Correo"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Contraseña"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block mx-auto defaultButt">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container d-flex flex-column align-items-center mt-5" style={{ backgroundColor: 'white', padding: '1vw', borderRadius: '10px' }}>
                <h1 style={{ color: '#285943', textAlign: 'center' }}>El envío ha sido aprobado!</h1>
                <h2 className="mt-4">Tu número de orden es:</h2>
                <div className="d-flex align-items-center" style={{ gap: '1vw' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0', backgroundColor: '#94c7c3', padding: '10px', borderRadius: '10px' }}>
                        {newNo}
                    </div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handleCopy}
                        style={{ border: '0px', padding: '0px' }}
                        id="copyButt"
                    >
                        <img src="/icons/copy.svg" className="me-2" style={{ width: '30px', height: '30px' }} />
                    </button>
                </div>
                <Link to="/">
                    <Button className="menu-button mb-3 defaultButt">Regresar</Button>
                </Link>
            </div>
        );
    }
}

export default Solicitar;
