"use strict"


//MENU
let hamburguerMenu = document.getElementsByClassName("hamburguer")[0]
let X = false
let clicavel = true
hamburguerMenu.addEventListener("click", menuVirarX)

function menuVirarX() {
    if (X == false) {
        if (clicavel) {
            clicavel = false
            menuAparecer()
        }
        X = true
    }
    else {
        if (clicavel) {
            clicavel = false
            menuSumir()
        }
        X = false
    }
}

function menuAparecer() {
    carrinhoClicavel = false//faz o carrinho nao poder ser aberto junto com menu
    let hamburgerLine = document.getElementsByClassName("hamburgerLine")
    hamburgerLine[0].style.display = "none"
    hamburgerLine[1].style.transform = "rotate(45deg) translateX(17%)"
    hamburgerLine[2].style.transform = "rotate(-45deg) translateX(17%)"

    let nav = document.getElementsByClassName("nav")[0]
    //animacao de fechamento 
    nav.style.animationName = "menuShowing"
    nav.style.display = "block"

    setTimeout(() => {
        clicavel = true//faz o menu ser clicavel denovo
    }, 1000)
}

function menuSumir() {

    let hamburgerLine = document.getElementsByClassName("hamburgerLine")
    hamburgerLine[0].style.display = "block"
    hamburgerLine[1].style.transform = "rotate(0) translateX(0)"
    hamburgerLine[2].style.transform = "rotate(0) translateX(0)"

    let nav = document.getElementsByClassName("nav")[0]

    //animacao de fechamento 
    nav.style.animationName = "menuHiding"
    setTimeout(() => {
        nav.style.display = "none"
        clicavel = true//faz o MENU ser clicavel denovo
        carrinhoClicavel = true//faz o CARRINHO voltar a ser clicavel
    }, 1000)//tempo da animacão 
}

//Slider
let carroselContanier = document.querySelectorAll(".carroselContanier")
carroselContanier.forEach(carousel => {
    const imgsCarrosel = document.querySelectorAll(".imgsCarrosel")
    const imgBtns = Array.from(imgsCarrosel, () => {
        return `<span class="carrouselBtn"></span>`
    })
    carousel.insertAdjacentHTML("beforeend", `
    <section class="carrouselNavegation">
        ${imgBtns.join("")}
    </section>
    `)

    //Ativando os botões
    const carrouselBtn = document.querySelectorAll(".carrouselBtn")

    carrouselBtn.forEach((button, i) => {
        //Coloca a 1˚ amostra cmo padrao
        imgsCarrosel[0].classList.add("amostra")
        carrouselBtn[0].classList.add("clicked")
        
        button.addEventListener("click", () => {
            //esconde todas as imagens
            imgsCarrosel.forEach(img => { img.classList.remove("amostra") })
            carrouselBtn.forEach(img => { img.classList.remove("clicked") })
            
            //mostra o clicado
            imgsCarrosel[i].classList.add("amostra")
            carrouselBtn[i].classList.add("clicked")

            let amostra = document.getElementsByClassName("amostra")[0]
            amostra.style.animationName = "mostarImgCarrosel"
        })
        
    })
});


//Scroll calculation da rolagem dos produtos
let oitoPorcento = (window.innerHeight / 100) * 8//altura do menu
const correctScroll = () => {
    setTimeout(() => {
        window.scrollTo(0, (window.scrollY - oitoPorcento))
    }, 10)
}

let produtosClick = document.getElementById("produtosLink")
produtosClick.addEventListener("click", correctScroll)


//Adicona Carrinho
let btnAddCarrinho = document.getElementsByClassName("addCarrinho")
let prod = 0
addEventListener("DOMContentLoaded", () => {
    for (let i in btnAddCarrinho) {
        btnAddCarrinho[i].addEventListener("click", () => {
            //adiciona no carrinho
            prod = btnAddCarrinho[i].previousElementSibling.previousElementSibling//2 elementos pra cima

            let produtoParaCarrinho = {
                nome: prod.alt,
                src: prod.src.replace("file:///Users/guilhermealmeida/Desktop/Tuca/SiteTuca", "."),
                quantidade: 1
            }

            colocarNoCarrinho(produtoParaCarrinho)


            //atualiza o numero de produtos no carrinho
            nProdutosNoCarrinho()

        })
    }
})

//adiciona no array do carrinho produto novo ou aumenta quantidade se ja estiver lá
let carrinhoArray = []//Produtos que estão no carrinho de compras
function colocarNoCarrinho(produto) {
    if (carrinhoArray.length <= 0) {
        carrinhoArray.push(produto)//1˚ produto adiciona direto
    }
    else {
        verifiCarrinho(produto, carrinhoArray)//2˚ em diante verifica se já está no carrinho
    }

}

//verifica os itens do carrinho para poder aumentar a quantidada ou adicionar um novo item no carrinho
function verifiCarrinho(obj, list) {
    let jatem = 0//diferente de 0 já está no carrinho 
    let posDjatem = 0 //posicao do q já tem no carrinho
    for (let e in list) {//verifica se está no carrinho
        if (list[e].src == obj.src) {
            jatem++
            posDjatem = e
        }
    }
    //se jatem umenta quantidade
    if (jatem != 0) {
        list[posDjatem].quantidade += 1
    }
    else {//senao adiciona o novo item
        carrinhoArray.push(obj)
    }
}


//Mostra o carrinho
let carrinhoClicavel = true
let carrinhoAmostra = false
window.addEventListener("DOMContentLoaded", () => {
    let carrinho = document.getElementById("carrinho")//imagem do carrinho
    carrinho.addEventListener("click", () => {
        let carrinhoLista = document.getElementsByClassName("carrinhoLista")[0]//elementos do carrinho

        if (carrinhoArray.length > 0) {
            if (carrinhoAmostra == false && carrinhoClicavel == true) {
                clicavel = false//Faz o menu não!! poder ser aberto com o carrinho aberto
                carrinhoLista.style.display = "block"
                carrinhoLista.style.animationName = "mostrarCarrinho"
                carrinhoAmostra = true
                itensCarrinho()//renderiza os itens do carrinho

                btnMaisMenos()//event listener do -+
            }
            else {
                clicavel = true//Faz o menu poder ser aberto denovo
                carrinhoLista.style.animationName = "escodeCarrinho"
                setTimeout(() => {
                    carrinhoLista.style.display = "none"
                    deletaRenderizado()//deleta itens renderizados no carrinho
                }, 1000)
                carrinhoAmostra = false
            }
        }

    })
})

//renderiza os itens do carrinho
function itensCarrinho() {
    for (let i in carrinhoArray) {
        criaElementoCart(carrinhoArray[i])
    }
}

function criaElementoCart(elemento) {
    let referencia = document.getElementsByClassName("carrinhoProdutos")[0]
    let prod = document.createElement("div")
    prod.id = `p${carrinhoArray.indexOf(elemento)}`
    prod.className = "cartProd"
    prod.innerHTML = `
        <img src="${elemento.src}">
        <p>${elemento.nome}</p>
        <div class="qtdd"><p onclick="btnMais(this.parentNode.parentNode)">+</p><p>${elemento.quantidade}</p><p onclick="btnMenos(this.parentNode.parentNode)">-</p></div>
    `
    referencia.appendChild(prod)
}
function deletaRenderizado() {
    let referencia = document.getElementsByClassName("carrinhoProdutos")[0]
    referencia.innerHTML = ""
}

//atualiza o número de produtos no carrinho
function nProdutosNoCarrinho() {
    let referencia = document.getElementById("ndeProds")
    let quantos = carrinhoArray.length

    if (quantos <= 0) {
        referencia.innerHTML = quantos
        referencia.style.display = "none"
    }
    else {
        referencia.innerHTML = quantos
        referencia.style.display = "block"
    }

}

//aumenta  & diminui a quantidade produtos carrinho
function btnMais(pai) {
    //muda no array
    let posicaoAray = parseInt(pai.id.replace("p", ""))
    carrinhoArray[posicaoAray].quantidade++
    //muda o exibido para o usário
    let textP = document.getElementsByClassName("qtdd")[posicaoAray]
    textP.childNodes[1].innerHTML = carrinhoArray[posicaoAray].quantidade
}
function btnMenos(pai) {
    console.log(pai)
    //muda no array
    let posicaoAray = parseInt(pai.id.replace("p", ""))
    carrinhoArray[posicaoAray].quantidade--
    //muda o exibido para o usário
    let textP = document.getElementsByClassName("qtdd")[posicaoAray]
    textP.childNodes[1].innerHTML = carrinhoArray[posicaoAray].quantidade
    //verifica se é menor q 0 pra deletar do carrinho
    if (carrinhoArray[posicaoAray].quantidade <= 0) {//produto especifico

        //retira o produto do carrinho
        carrinhoArray.splice(posicaoAray, 1)
        pai.remove()

        //atualiza o numero do produto dentro do carrinho
        nProdutosNoCarrinho()
        //deleta e renderiza o renderiza o carrinoh denovo
        deletaRenderizado()
        itensCarrinho()
    }
    if (carrinhoArray.length <= 0) {//fecha o carrinho se nao houver produtos nele
        //fecha o carrinho
        let carrinhoLista = document.getElementsByClassName("carrinhoLista")[0]//elementos do carrinho
        carrinhoLista.style.animationName = "escodeCarrinho"
        setTimeout(() => {
            carrinhoLista.style.display = "none"
            deletaRenderizado()//deleta itens renderizados no carrinho
        }, 1000)
        carrinhoAmostra = false
        clicavel = true//faz o MENU poder ser aberto denovo
    }

}
