import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [ganadores, setGanadores] = useState([]);
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('/api/admin/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        const fetchGanadores = async () => {
            try {
                const response = await axios.get('/api/admin/usuariosGanadores');
                setGanadores(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios ganadores:", error);
            }
        };

        fetchUsuarios();
        fetchGanadores();
    }, []);

    // Función para manejar la redirección
    const handleVolver = () => {
        navigate('/'); // Redirige a la ruta principal
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Lista de Usuarios</h2>
            <div className="card mb-4">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Ciudad</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Cédula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario._id || usuario.nombre}>
                                    <td>{usuario.nombre || 'Nombre no disponible'}</td>
                                    <td>{usuario.user?.email || 'Email no disponible'}</td>
                                    <td>{usuario.ciudad || 'Ciudad no disponible'}</td>
                                    <td>{usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento).toLocaleDateString() : 'Fecha no disponible'}</td>
                                    <td>{usuario.cedula || 'Cédula no disponible'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 className="mb-4 text-center">Usuarios Ganadores</h2>
            <div className="card mb-4">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Código</th>
                                <th>Premio</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ganadores.map(ganador => (
                                <tr key={ganador._id || `${ganador.codigo}-${ganador.fechaUso}`}>
                                    <td>{ganador.user?.nombre || 'Nombre no disponible'}</td>
                                    <td>{ganador.codigo || 'Código no disponible'}</td>
                                    <td>{ganador.premio || 'Premio no especificado'}</td>
                                    <td>{ganador.fechaUso ? new Date(ganador.fechaUso).toLocaleDateString() : 'Fecha no disponible'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Botón para volver a la ruta principal */}
            <div className="text-center">
                <button className="btn btn-primary" onClick={handleVolver}>Volver</button>
            </div>
        </div>
    );
};

export default UsuariosAdmin;
