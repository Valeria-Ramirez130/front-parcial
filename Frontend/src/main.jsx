import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { routesglobal } from '../src/routes/routesglobal.jsx';
import { routesadmin } from './routes/routesadmin.jsx';
import { routescliente } from './routes/routescliente.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css'
// Combinamos todas las rutas
let routes = [].concat(routesglobal, routesadmin, routescliente);
routes = createBrowserRouter(routes);

// Renderizamos la aplicación con RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes} />
  
);