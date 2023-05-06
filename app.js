let formulario = document.querySelector(".formulario")
let formContainer = document.querySelector(".form__container")
let $form_title = document.querySelector(".form__title")

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
