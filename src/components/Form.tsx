export default function Form() {
  return (
    <>
      <form
        action=""
        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow-lg space-y-6"
      >
        <div className="space-y-4">
          <label
            htmlFor="ingredient"
            className="block text-white uppercase font-extrabold text-lg"
          >
            Nombre o Ingredientes
          </label>
          <input
            type="text"
            id="ingredient"
            name="ingredient"
            className="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Busca recetas por nombre o ingredientes. Ej: Vodka, Tequila, Café, etc."
          />
        </div>

        <div className="space-y-4">
          <label
            htmlFor="ingredient"
            className="block text-white uppercase font-extrabold text-lg"
          >
            {" "}
            Categoria
          </label>

          <select
            id="ingredient"
            name="ingredient"
            className="p-3 w-full rounded-lg focus:outline-none"
          >
            <option value="">-- Seleccione --</option>
          </select>
        </div>
        <input
          type="submit"
          value={"Buscar Recetas"}
          className="cursor-pointer bg-orange-800 hover:bg-orange-700 text-white uppercase
            font-extra-bold w-full p-2 rounded-lg transition-colors duration-300 hover:shadow-lg
            hover:shadow-orange-500/50"
        />
      </form>
    </>
  );
}
