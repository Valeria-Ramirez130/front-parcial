import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa los estilos de la Navbar

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Parcial</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/crearUsuario">Agregar Usuario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listaUsuarios">Listado Usuario</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; // Esto exporta el componente por defecto
