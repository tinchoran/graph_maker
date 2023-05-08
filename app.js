let formulario = document.querySelector(".formulario")
let formContainer = document.querySelector(".form__container")
let $form_title = document.querySelector(".form__title")
const $btnMenu = document.querySelector(".display-menu")
const $common_graphs = document.querySelector(".common-graphs")
const $grilla = document.querySelector(".grilla");
var $graph_btns;


localStorage.clear() //--> MOMENTANEO !!!

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    formulario = document.querySelector(".formulario")
    let newForm = new FormData(formulario)

    //Primera vez
    if(newForm.has("cant_cols")){
        if(newForm.get("cant_cols")> 10) return $form_title.innerText = "El máximo es 10 columnas"
        if(newForm.get("cant_cols")< 2) return formContainer.firstElementChild.innerText = "El mínimo es 2 columnas"
        this.innerHTML = ""
        formContainer.firstElementChild.innerText = "Especifique el nombre de cada columna y su valor";
        for(let i = 0; i < newForm.get("cant_cols"); i++){
            this.insertAdjacentHTML("beforeend", `<div class="input-container"><input type="text" name="col${i}" required class="form__input" placeholder="Columna ${i+1}"><input required type="number" class="form__input" placeholder="Valor" name="colValue${i}"></div>`)
        }
        localStorage.setItem("title", newForm.get("graph_name"))
        return this.insertAdjacentHTML("beforeend", `<button type="submit" class="form__btn">Aceptar<span class="btn_before"></span></button>`)
    }
    
    //Segunda vez
    if(newForm.has("col0")){
        newForm.forEach((el,index) => {
                localStorage.setItem(`${index}`, `${el}`)
        })
        return window.location.replace("./pages/aplicacion.html")
        //return formContainer.firstElementChild.innerText = "Una o más columnas no tienen nombre";
    }
})


$btnMenu.addEventListener("click", ()=>{
    if($common_graphs.style.display === "" || $common_graphs.style.display === "none"){
        return $common_graphs.style.display = "flex";
    } else{
        return $common_graphs.style.display = "none";
    }
})

fetch("../data/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(el=> {
            $grilla.insertAdjacentHTML("beforeend", `<button name="${el.name}" class="form__btn graph-boton" style="height:20%;margin:.5rem 0">${el.title}<span class="btn_before"></span></button>`)
        })
    })

setTimeout(()=>{
    $graph_btns = document.querySelectorAll(".graph-boton")
    $graph_btns.forEach(el => {
        el.addEventListener("click", (e)=>{
            e.preventDefault()
            fetch("../data/data.json")
                .then(response => response.json())
                .then(data => {
                    data.forEach(el =>{
                        if(el.name === e.target.name){
                            localStorage.setItem("title", el.title)
                            for(let i = 0; i<el.valores.length; i++){
                                if(typeof el.valores[i] === "string"){
                                    localStorage.setItem(`col${i / 2}`, el.valores[i])
                                    localStorage.setItem(`colValue${i / 2}`, el.valores[i+1])
                                }
                            }
                        }
                
                    })
                    return window.location.replace("./pages/aplicacion.html")
                })
        })
    })
},1000)

    