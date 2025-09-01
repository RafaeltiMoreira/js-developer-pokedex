const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

const pokemonHeader = document.getElementById("pokemonHeader");
const aboutTab = document.getElementById("about");
const statsTab = document.getElementById("base-stats");
const evolutionTab = document.getElementById("evolution");
const movesTab = document.getElementById("moves");

// Função principal
pokeApi.getPokemonById = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json());
}

pokeApi.getSpecies = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(res => res.json());
}

// Carregar Pokémon
async function loadPokemonDetail(id) {
  const pokemon = await pokeApi.getPokemonById(id);
  const species = await pokeApi.getSpecies(id);

  const detailContainer = document.getElementById("pokemonDetail");
  const mainType = pokemon.types[0].type.name;
  detailContainer.classList.add(mainType);

  // HEADER
  pokemonHeader.innerHTML = `
    <div class="pokeDetail">
      <h1>${pokemon.name}</h1> <h3>#${pokemon.id}</h3>
    </div>
    <p>${pokemon.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join(" ")}</p>
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
  `;

  // ABOUT
  aboutTab.innerHTML = `
    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    <p><strong>Egg Groups:</strong> ${species.egg_groups.map(e => e.name).join(", ")}</p>
    <p><strong>Base Happiness:</strong> ${species.base_happiness}</p>
  `;

  // BASE STATS
  statsTab.innerHTML = pokemon.stats.map(s => `
    <p>${s.stat.name}: ${s.base_stat}</p>
  `).join("");

  // EVOLUTION
  evolutionTab.innerHTML = `<p>Em breve: cadeia evolutiva...</p>`;

  // MOVES
  movesTab.innerHTML = pokemon.moves.slice(0, 10).map(m => `
    <p>${m.move.name}</p>
  `).join("");
}

loadPokemonDetail(pokemonId);

// Controle das abas
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

function goBack() {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}