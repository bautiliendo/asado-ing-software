import { Routes, Route } from "react-router-dom";
import Inicio from "./components/Inicio/Inicio";
import Event from "./components/Event/Event";

function Rutas() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/event/:id" element={<Event />} />
            </Routes>
        </div>
    );
}

export default Rutas;