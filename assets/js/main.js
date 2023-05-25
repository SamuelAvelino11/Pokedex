const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('modal')
const modals = document.querySelector("dialog");
const close = document.getElementById("fechar");


const maxRecords = 151
const limit = 10
let offset = 0


function convertPokemonToHtml(pokemon){
    
    return `
    <li class="pokemon ${pokemon.type}" onclick='openM(${pokemon.number})'>
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
function criamodal(pokemon){

    return `
       
    <div class="tipos">
        
        <table>
            ${pokemon.types.map((type) => `<th id="ty" class="type ${type}">${type}</th>`).join('')}
        </table>
        
    </div>
    <div class="nome">
        <span>${pokemon.name}</span>
    </div>

    <div class="imagem">
        <img src="${pokemon.photo}" width="200px" heigt="200px"
        alt="${pokemon.name}">
    </div>
    <div class="infos">
        <p>Especie:     ${pokemon.species}</p>
        ${pokemon.habilidades.map((habilidade) => `<p>Habilidade:    ${habilidade}</p>`).join('')}
    </div>
    <div class="static">
        <div id="status">${pokemon.stat.map((statss) => `<div><p>${statss} : </p></div>`).join('')}</div>
        <div id="valor">${pokemon.valor.map((valores) => `<div class="numeros" style="width: ${valores}%;"><p>${valores} &#9876;</p></div>`).join('')}</div>
    </div>`;
}


function loadPokemosItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons = []) =>{

        const newhtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newhtml
    
        })
}

function openM(id){
    pokeapi.getPokemon(id).then((pokemon) =>{
        document.getElementById("corpo").setAttribute("class", `${pokemon.type}`)
        modal.innerHTML = criamodal(pokemon);
        
    })

    modals.showModal();
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



close.onclick = function(){
    modals.close();
}



 
 
 