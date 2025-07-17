import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
  const Notification = useAppStore((state) => state.showNotification);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Generando receta con IA...");

    const form = new FormData(e.currentTarget);
    const prompt = form.get("prompt") as string;

    if (prompt.trim() === "") {
      // Notificación en caso de que el campo esté vacío
      Notification({
        text: "La bubsqueda no puede estar vacía.",
        error: true,
      });
      return;
    }

    // En caso de que la búsqueda sea exitosa se realiza la busqueda del prompt y se renderiza el componente
  };

  return (
    <>
      <h1 className="text-center text-3xl xl:text-6xl font-extrabold">
        Generar Receta con IA
      </h1>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="cursor-pointer p-2 bg-slate-800 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </form>

        <div className="py-10 whitespace-pre-wrap"></div>
      </div>
    </>
  );
}
