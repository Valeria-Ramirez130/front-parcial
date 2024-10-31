import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const iniciarSesion = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validación básica de campos vacíos
        if (!email || !contrasena) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const usuario = { email, contrasena };
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/usuario/login`, usuario);
            const { userId, message, rol } = res.data; // Asegúrate de que 'userId' está en la respuesta
            alert(message);

            // Guarda el ID de usuario en localStorage
            localStorage.setItem('userId', userId);

            // Redirigir según el rol
            if (rol === 'cliente' || rol === 'usuario') {
                navigate('/vistaUsuario');
            } else if (rol === 'administrador') {
                navigate('/admin');
            } else {
                setError('Rol no reconocido');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            if (err.response && err.response.data) {
                setError(err.response.data.message); // Mensaje de error desde el servidor
            } else {
                setError('Error en el servidor'); // Mensaje genérico en caso de error
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h2 className='mt-4'>Iniciar Sesión</h2>
            <form onSubmit={iniciarSesion}>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input
                        type='email'
                        id='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email de usuario'
                        required // Asegura que el campo sea obligatorio
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='contrasena' className='form-label'>Contraseña</label>
                    <input
                        type='password'
                        id='contrasena'
                        className='form-control'
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder='Contraseña'
                        required // Asegura que el campo sea obligatorio
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className='d-flex justify-content-between'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        disabled={loading}
                    >
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                    {/* Botón de Registrarse */}
                    <button
                        type='button'
                        onClick={() => navigate('/crearUsuario')}
                        className='btn btn-secondary'
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
