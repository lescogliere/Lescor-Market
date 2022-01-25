"use strict"

const pai = document.getElementById("produtosGrid")
const img = document.querySelectorAll(".produtosImg")
const produtoLink = document.querySelectorAll(".produtoLink")
const produto = document.querySelectorAll(".produto")

//Event listener nos 4 Produtos para ver que foi o escolhido
for (let element = 0; element < produto.length; element++) {
    produto[element].addEventListener("click", () => {
        let idClicado = produto[element].id
        let posicaoRolagem = window.scrollY
        mostrarProdutos(idClicado, posicaoRolagem)
    })
}

function mostrarProdutos(id) {

    mostraEspecifico(id)

    //estilo do grid de produtos do elemento pai/containner
    pai.style.gridTemplateRows = "auto"
    pai.style.gridTemplateColumns = "auto auto auto auto"
    //estilo dos produtos
    if(window.innerWidth < 670){//responsividade
        for (let i in img) {
            produto[i].style.width = "25vw"//pai
            produto[i].style.height = "25vw"//pai
            img[i].style.width = "25vw"//img
            img[i].style.height = "25vw"//img
            produtoLink[i].style.width = "25vw"//link
            produtoLink[i].style.height = "25vw"//link
            produtoLink[i].style.fontSize = "2.75vw"//pai
        }
    }
    else if(window.innerWidth < 1000){//responsividade
        for (let i in img) {
            produto[i].style.width = "15vw"//pai
            produto[i].style.height = "15vw"//pai
            img[i].style.width = "15vw"//img
            img[i].style.height = "15vw"//img
            produtoLink[i].style.width = "15vw"//link
            produtoLink[i].style.height = "15vw"//link
            produtoLink[i].style.fontSize = "1.75vw"//pai
        }
    }
    else{
        for (let i in img) {//responsividade
            produto[i].style.width = "10vw"//pai
            produto[i].style.height = "10vw"//pai
            img[i].style.width = "10vw"//img
            img[i].style.height = "10vw"//img
            produtoLink[i].style.width = "10vw"//link
            produtoLink[i].style.height = "10vw"//link
            produtoLink[i].style.fontSize = "1vw"//pai
        }
    }

}


let ultimoClicado = ""
function mostraEspecifico(id) {
    if (ultimoClicado != "") {
        let sumir = document.getElementById(ultimoClicado)
        sumir.style.display = "none"
    }
    ultimoClicado = id + "P"
    let clickado = document.getElementById(id + "P")
    clickado.style.display = "grid"
}