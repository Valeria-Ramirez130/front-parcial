import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const VistaUsuario = () => {
    const [codigo, setCodigo] = useState('');
    const [userId, setUserId] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [codigosRegistrados, setCodigosRegistrados] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
            obtenerCodigos(id);
        }
    }, []);

    const obtenerCodigos = async (id) => {
        try {
            const response = await axios.get(`/api/codigos/obtenerCodigosUsuario/${id}`);
            setCodigosRegistrados(response.data);
        } catch (error) {
            console.error('Error al obtener códigos:', error);
            setMensaje('Error al obtener los códigos registrados.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMensaje('No se ha encontrado un ID de usuario. Por favor, inicia sesión nuevamente.');
            return;
        }

        if (!codigo.trim()) {
            setMensaje('Por favor, ingresa un código válido.');
            return;
        }

        try {
            const response = await axios.post('/api/codigos/verificarCodigo', { codigo, userId });
            setMensaje(response.data.message);
            await obtenerCodigos(userId);
        } catch (error) {
            if (error.response && error.response.data) {
                setMensaje(error.response.data.error);
            } else {
                setMensaje('Error al verificar el código');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Verificar Código</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu código"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Verificar</button>
                </div>
            </form>
            {mensaje && <p className="text-danger">{mensaje}</p>}
            <h2 className="mt-4">Códigos Registrados</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Fecha de Uso</th>
                        <th scope="col">Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {codigosRegistrados.map((codigo) => (
                        <tr key={codigo._id}>
                            <td>{codigo.Codigo}</td>
                            <td>{codigo.FechaUso ? new Date(codigo.FechaUso).toLocaleString() : 'No utilizado'}</td>
                            <td>{codigo.TienePremio ? codigo.Premio : 'No ganaste'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/')} className="btn btn-secondary mt-4">Volver</button>
        </div>
    );
};

export default VistaUsuario;
