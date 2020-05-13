import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cancion from './components/Cancion'
import Artista from './components/Artista'

function App() {

  // definir state
  const [ busquedaletra, guardarBusquedaLetra ] = useState({})
  const [ letra, guardarLetra ] = useState("")
  const [ info, guardarInfo ] = useState({})

  useEffect(() => {
    // si el objecto resultante de la busqueda viene vacio 
    if(Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {

      const { artista, cancion } = busquedaletra
      const urlCancion = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const urlArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
      
      const [ respuestaCancion, respuestaArtista ] = await Promise.all([
        fetch(urlCancion),
        fetch(urlArtista)
      ])
    
      const letraCancion = await respuestaCancion.json()
      const infoArtista = await respuestaArtista.json()
      
      // modificamos state con los datos de la letra y el artista (comprobamos que el artista no venga vacio) 
      guardarLetra(letraCancion.lyrics)

      if(infoArtista.artists === null){
        return 
      } else {
        guardarInfo(infoArtista.artists[0])
      }

      
     

      // guardarLetra(resultado.lyrics)
          
    }
    consultarApiLetra()

  }, [busquedaletra, info])

  return (
    <Fragment>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Artista
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
