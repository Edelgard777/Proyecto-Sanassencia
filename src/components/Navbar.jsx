import { Link } from "react-router-dom";


function Navbar() {

    return (

        <header>

            <nav className="navbar">

                <div className="logo">

                    <Link to="/">
                        <h2>Sanaesencia</h2>
                    </Link>

                </div>


                <ul className="nav-links">

                    <li>
                        <Link to="/">
                            Inicio
                        </Link>
                    </li>

                    <li>
                        <Link to="/especialidades">
                            Especialidades
                        </Link>
                    </li>

                    <li>
                        <Link to="/profesionales">
                            Profesionales
                        </Link>
                    </li>

                    <li>
                        <Link to="/agenda">
                            Agenda
                        </Link>
                    </li>

                    <li>
                        <Link to="/contacto">
                            Contacto
                        </Link>
                    </li>

                </ul>

            </nav>

        </header>

    );

}


export default Navbar;