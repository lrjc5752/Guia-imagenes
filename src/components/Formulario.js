import React, {useState} from 'react';
import Error from './Error';



const Formulario = ({guardarBusqueda}) => {

    const [termino,guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = evento => {
        evento.preventDefault();

        // validar
            if (termino.trim() === ''){
                guardarError(true);
                return;
            }
            guardarError(false);

        // enviar el termino de busqueda hacia el componente principal
            guardarBusqueda(termino);
    };

  return (
    <form
        onSubmit = {buscarImagenes}
    
    >
        <div className = 'row'>
            <div className = 'form-group col-md-8'>
                <input
                    type = 'text'
                    className = 'form-control form-control-lg'
                    placeholder = 'Busca una Imagen, ejemplo: futbol o cafe'   
                    onChange = {evento => guardarTermino(evento.target.value)}
                />
            </div>
            <div className = 'form-group col-md-4'>
                <input
                    type = 'submit'
                    className = 'btn btn-lg btn-danger btn-block'
                    placeholder = 'Busca una Imagen, ejemplo: futbol o cafe' 
                    value = 'Buscar'  
                />
            </div>
        </div>
        {error ? <Error mensaje =  'Agrega un termino de busqueda'/> : null}
    </form>
  );
}

export default Formulario;