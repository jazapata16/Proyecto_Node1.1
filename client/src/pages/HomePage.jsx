import { Link } from "react-router-dom";
import logo from '../ejemplo.jpg';

function HomePage() {
  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">ALBUM  MAKER</h1>
      <p className="text-md text-slate-400">
      "ALBUM MAKER" es la mejor aplicación web que permite cargar fotos y ordenar un álbum en línea, organiza tus mejores fotos y crea el album que siempre soñaste, nosotros nos ebcargamos de hacerlo realidad
      y hacerlo llegar hasta tus manos, no lo pienses mas y empieza a hacer tus recuerdos inmortales.
      </p>
      <img src={logo} alt="Logo" width="1000" height="500"/>

      <Link
        className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/register"
      >
        Empieza Ahora!
      </Link>
    </header>
  </section>
  );
}

export default HomePage;
