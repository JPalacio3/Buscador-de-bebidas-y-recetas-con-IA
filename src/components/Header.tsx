export default function Header() {
  return (
    <header className="bg-slate-800 ">
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          {/* Logotype */}
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          {/* Navegation */}
          <nav></nav>
        </div>
      </div>
    </header>
  );
}
