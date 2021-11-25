import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes,';


function App() {

  // state de la app
  const [busqueda,guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);



  useEffect (() => {
    
    const consultarApi = async () => {
        if (busqueda === '') return; //  para la primera busqueda del componente, que estaria vacio

        const imagenesPorPagina = 30;
        const key = '23809407-075decd225c7419aa09c601f8'
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`

        //https://pixabay.com/api/?key=23809407-075decd225c7419aa09c601f8&q=yellow+flowers&image_type=photo
        //  lo que esta despues de la 'q' es el query, la consulta del usuario

        const respuesta = await fetch(url);
        const resultado = await respuesta.json(); 
       // console.log(resultado.hits);
        guardarImagenes(resultado.hits);

          console.log(resultado)

          const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

          console.log(calcularTotalPaginas)

          guardarTotalPaginas(calcularTotalPaginas);

          console.log(totalpaginas)
          // mover  la pantalla hacia arriba
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({behavior: 'smooth'})
    };
    consultarApi();

  }, [busqueda,paginaactual]);

// definir la pagina anterior
  const paginaAnterior = () => {
        const nuevaPaginaActual = paginaactual - 1;

        if (nuevaPaginaActual === 0) return;

        guardarPaginaActual(nuevaPaginaActual);

        console.log(paginaactual)
  };

// definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);

    console.log(paginaactual)
  };

  return (
    <div className = 'container'>
        <div className = 'jumbotron'>
            <p className = 'lead text-center'>Buscador de Imagenes</p>
        <Formulario
            guardarBusqueda = {guardarBusqueda}
        />
        </div>  
        <div className = 'row justify-content-center'>
          <ListadoImagenes
              imagenes = {imagenes}
          />
         {(paginaactual === 1) ?  null : (
            <button
            type = 'button'
            className = 'btn btn-info mr-1'
            onClick = {paginaAnterior}
          >&laquo; Anterior</button>
         )}
           {(paginaactual === totalpaginas) ?  null : (
           <button
            type = 'button'
            className = 'btn btn-info'
            onClick = {paginaSiguiente}
          >Siguiente  &raquo;</button>
         )}

        </div>
    </div>
  );
}

export default App;
