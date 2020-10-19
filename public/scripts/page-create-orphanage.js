//create map
const map = L.map('mapid').setView([-27.222633, -49.6455874], 15)

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//create icon
const icon = L.icon({
    iconUrl:"/images/map-marker.svg",
    iconSize:[58,68],
    iconAnchor:[29, 68],
})

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon 
    marker && map.removeLayer(marker)

    //add icon Layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})

/* adicionar campo de fotos*/

function addPhotoField(){
    //pegar o container de fotos #images
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-image
    const fieldContainer = document.querySelectorAll('.new-upload')
    // realizar o clone da última imagem add
    const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    //verificar se o ampo esta vazio, se sim, nao adicionar
    const input = newFieldContainer.children[0]
    if(input.value == ""){
        return 
    }
    //limpar o campo antes de add 
    newFieldContainer.children[0].value=""
    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)

}

function deleteField(event){
   const span = event.currentTarget
   const fieldContainer = document.querySelectorAll('.new-upload')
    if(fieldContainer.length <= 1){
        //limpar valor do campo
        span.parentNode.children[0].value=""
        return
    }

    //deletar o campo
    span.parentNode.remove()
}

//troca do sim e nao
function toggleSelect(event){
    //retirar classe active
    document.querySelectorAll('.button-select button')
    .forEach(function(button){
        button.classList.remove('active')
    })
    //colocar a classe active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')
    //verificar se sim ou nao se//atualizar o input hidden com o selecionados
    const input = document.querySelector('[name="open_on_weekends]')
    input.value = button.dataset.value

}

function validate(event) {
    const needsLatAndLng = false;
    if(needsLatAndLng){
        event.preventDefault()
        alert('selecione um ponto no mapa')
    }
    
}