import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap en tu archivo principal.

const VistaUsuario = () => {
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/codigos/verificarCodigo', { codigo });
            const { message } = response.data;
            setMensaje(message);
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
            <h2 className="text-center mb-4">Registrar Código</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Ingresa tu código:</label>
                    <input 
                        type="text" 
                        id="codigo" 
                        className="form-control" 
                        value={codigo} 
                        onChange={(e) => setCodigo(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar Código</button>
            </form>
            {mensaje && <p className="mt-3 text-center text-danger">{mensaje}</p>}

            {/* Botón para volver a la ruta principal */}
            <div className="text-center mt-4">
                <button 
                    onClick={() => navigate('/')} // Redirige a la ruta principal
                    className="btn btn-secondary"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default VistaUsuario;
