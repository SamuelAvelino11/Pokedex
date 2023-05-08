const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0


function convertPokemonToHtml(pokemon){
    
    return `
    <li class="pokemon ${pokemon.type}" onClick="">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
    <img src="${pokemon.photo}"
     alt="${pokemon.name}">
    </div>
</li>`;
}

function loadPokemosItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons = []) =>{

        const newhtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newhtml
    
        })
}

loadPokemosItens(offset, limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if(qtdRecordsWithNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemosItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemosItens(offset, limit)
    }
})


 
 
 