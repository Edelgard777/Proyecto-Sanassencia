import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import Especialidades from "./pages/Especialidades";
import Profesionales from "./pages/Profesionales";
import Agenda from "./pages/Agenda";
import Contacto from "./pages/Contacto";


function App() {

    return (

        <>

            <Navbar />


            <Routes>

                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/especialidades"
                    element={<Especialidades />}
                />

                <Route
                    path="/profesionales"
                    element={<Profesionales />}
                />

                <Route
                    path="/agenda"
                    element={<Agenda />}
                />

                <Route
                    path="/contacto"
                    element={<Contacto />}
                />

            </Routes>


            <Footer />

        </>

    );

}


export default App;
