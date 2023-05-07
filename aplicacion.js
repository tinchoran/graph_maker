const $canvas = document.querySelector(".graph")
const $btn_remake = document.getElementById("btn_remake")
const $title = document.querySelector(".main-title")
const colores = ["red", "yellow", "blue", "orange", "white", "green", "aqua", "beige", "pink", "black"]


//Calcular total de los valores ingresados
let total = 0;
for(let i = 0; i<localStorage.length; i++){
    if(localStorage.getItem(`colValue${i}`)){
        total += JSON.parse(localStorage.getItem(`colValue${i}`))
    }
}

//Insertar titulo del grafico ingresado
$title.innerHTML = localStorage.getItem("title").toUpperCase()

//Crear e insertar columnas
for(let i = 0; i<localStorage.length; i++){
    if(localStorage.getItem(`col${i}`)){
        let el = localStorage.getItem(`col${i}`)
        $canvas.insertAdjacentHTML("beforeend",
        `<article class="item" style="height:${(localStorage.getItem(`colValue${i}`) * 100 / total).toFixed(1)}%;background-color:${colores[i]}">
            <p class="item__name">${el}</p>
            <p class="item__value">${localStorage.getItem(`colValue${i}`).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
        </article>`
        )
    }
}

$btn_remake.addEventListener("click", ()=>{
    if(confirm("Perderá todos los datos actuales")) return location.replace("../index.html")
    
})