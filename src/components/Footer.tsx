export default function Footer() {
  return (
    <footer className="py-5 bg-gray-800 text-white text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Creado con 🤍 por JPalacio.
        <br />
        Todos los derechos reservados.
      </p>
    </footer>
  );
}
