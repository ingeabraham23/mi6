import TablaDinamica from "./components/TablaDinamica";
import { tablas } from "./datos/datosTablas";

function App() {

  return (
    <div className="contenedor-tablas">

      <TablaDinamica datos={tablas.calicapan} />

      <TablaDinamica datos={tablas.tacopan} />

    </div>
  );
}

export default App
