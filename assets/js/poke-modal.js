const modal = document.getElementById('Modal');
const acima = document.getElementById('acima');
const abaixo = document.getElementById('abaixo');

function Image(pokemon){
    return `
        <span class="modal-name">${pokemon.name}</span>
        <span class="id">${pokemon.id}</span>
        <ol class="types">
           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}"
        alt="${pokemon.name}">
        
    `
}