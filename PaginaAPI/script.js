document.addEventListener('DOMContentLoaded', () => {
  const buscarBtn = document.getElementById('buscarBtn');
  const pokemonInput = document.getElementById('pokemonInput');
  const pokemonInfo = document.getElementById('pokemonInfo');

  buscarBtn.addEventListener('click', () => {
    const nombre = pokemonInput.value.toLowerCase().trim();
    if (nombre) {
      obtenerPokemon(nombre);
    }
  });

  async function obtenerPokemon(nombre) {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (!respuesta.ok) throw new Error('Pokémon no encontrado');

      const data = await respuesta.json();

      const esShiny = Math.random() < 0.2; 
      const sprite = esShiny ? data.sprites.front_shiny : data.sprites.front_default;

      pokemonInfo.innerHTML = `
        <h2>${data.name.toUpperCase()} ${esShiny ? 'Shiny' : ''}</h2>
        ${sprite ? `<img src="${sprite}" alt="${data.name}">` : '<p>No hay imagen</p>'}
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Tipo(s):</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
      `;
    } catch (error) {
      pokemonInfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }
});