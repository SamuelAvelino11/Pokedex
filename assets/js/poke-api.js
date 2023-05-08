const pokeapi = {}

function convertPokeApiToPokemon(PokemonDetail){
    const pokemon = new Pokemon()
    pokemon.number = PokemonDetail.id
    pokemon.name = PokemonDetail.name

    const types = PokemonDetail.types.map((typeslot) => typeslot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = PokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then( convertPokeApiToPokemon)
}

pokeapi.getPokemons = (offset =0, limit=10) => {
    
 const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
 return fetch(url)
 .then((response) => response.json())
 .then((jsonBody) => jsonBody.results)
 .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))//chama o metodo que busca os detalhes do pokemon
 .then((detailRequest) => Promise.all(detailRequest))
 .then((pokemonsDetails) => pokemonsDetails)
} 

