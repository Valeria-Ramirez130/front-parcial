import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './CrearUsuario.css';
import axios from 'axios';

function CrearUsuario() {
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('usuario'); // Estado para el rol
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Inicializar useNavigate

    const agregarUsuario = () => {
        // Validar que todos los campos estén llenos
        if (!nombre || !fechaNacimiento || !cedula || !celular || !email || !ciudad || !contrasena || !rol) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const nuevoUsuario = {
            nombre,
            fechaNacimiento,
            cedula,
            celular,
            email,
            ciudad,
            contrasena,
            rol // Agregar el rol al objeto del usuario
        };

        setLoading(true); // Comienza la carga
        axios
            .post(`${import.meta.env.VITE_BACK_URL}/api/usuario/nuevoUsuario`, nuevoUsuario)
            .then((res) => {
                // Mostrar mensaje mejorado
                alert('Usuario creado correctamente');
                // Restablecer los campos del formulario
                setNombre('');
                setFechaNacimiento('');
                setCedula('');
                setCelular('');
                setEmail('');
                setCiudad('');
                setContrasena('');
                setRol('usuario'); // Restablece el rol a 'usuario'
            })
            .catch((err) => {
                console.error('Error al agregar usuario:', err);
                alert('Error al agregar usuario. Intenta nuevamente.');
            })
            .finally(() => {
                setLoading(false); // Finaliza la carga
            });
    };

    return (
        <div className='container'>
            <h2 className='mt-4'>Crear Usuario</h2>
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>Nombre</label>
                            <input
                                type='text'
                                id='nombre'
                                className='form-control'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder='Nombre completo'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='fechaNacimiento' className='form-label'>Fecha de Nacimiento</label>
                            <input
                                type='date'
                                id='fechaNacimiento'
                                className='form-control'
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='cedula' className='form-label'>Cédula</label>
                            <input
                                type='text'
                                id='cedula'
                                className='form-control'
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                placeholder='Número de cédula'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='celular' className='form-label'>Celular</label>
                            <input
                                type='tel'
                                id='celular'
                                className='form-control'
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                placeholder='Número de celular'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                id='email'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Correo electrónico'
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className='mb-3'>
                            <label htmlFor='ciudad' className='form-label'>Ciudad</label>
                            <input
                                type='text'
                                id='ciudad'
                                className='form-control'
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                placeholder='Ciudad de residencia'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className='mb-3'>
                            <label htmlFor='contrasena' className='form-label'>Contraseña</label>
                            <input
                                type='password'
                                id='contrasena'
                                className='form-control'
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder='Contraseña'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className='mb-3'>
                            <label htmlFor='rol' className='form-label'>Rol</label>
                            <select
                                id='rol'
                                className='form-control'
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="usuario">Usuario</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="button-group">
    <button
        type="button"
        onClick={agregarUsuario}
        className='btn btn-success'
        disabled={loading} // Deshabilita el botón mientras se realiza la solicitud
    >
        {loading ? 'Guardando...' : 'Guardar Usuario'}
    </button>
    <button
        type='button'
        onClick={() => navigate('/')}
        className='btn btn-secondary'
    >
        Volver
    </button>
</div>

            </form>
        </div>
    );
}

export default CrearUsuario;
