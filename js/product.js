// const params = new URLSearchParams(window.location.search)
// const idProduto = params.get("p")

// async function carregarProduto(id) {
//   try {
//     const resposta = await fetch(`http://localhost:3333/produtos/${id}`)
//     const produto = await resposta.json()
//     console.log("Produto carregado:", produto)

//     document.querySelector(".product__image").src = produto.imagem
//     document.querySelector(".product__title").textContent = produto.nome
//     document.querySelector(".product__price").textContent = `R$ ${(produto.preco.por / 100).toFixed(2).replace('.', ',')}`
//     document.querySelector(".product__description").textContent = produto.descricao

//     const tagIcone = produto.vegano ? "./image/Plant.png" : "./image/Cow.png"
//     const tagTexto = produto.vegano ? "Vegano" : "Contém lactose"
//     document.querySelector(".product__tag img").src = tagIcone
//     document.querySelector(".product__tag span").textContent = tagTexto

//     const botaoComprar = document.querySelector(".product__button")
//     botaoComprar.addEventListener("click", async (e) => {
//       e.preventDefault()

//       const observacoes = document.querySelector("#observation").value
//       const nome = document.querySelector(".product__title").textContent
//       const preco = parseFloat(
//         document.querySelector(".product__price").textContent.replace("R$", "").trim()
//       )
//       const imagem = document.querySelector(".product__image").src
//       const quantidade = parseInt(
//         document.querySelector(".product__quantity--input").value
//       )

//       const produtoAdicionado = {
//         id: parseInt(idProduto),
//         nome,
//         preco,
//         imagem,
//         quantidade,
//         vegano: produto.vegano
//       }

//       adicionarAoCarrinho(produtoAdicionado)
//       alert(`${nome} adicionado ao carrinho!`)
//     })

//   } catch (erro) {
//     console.error("Erro ao carregar produto:", erro)
//   }
// }

// if (idProduto) {
//   carregarProduto(idProduto)
// }

// const minusButton = document.querySelector(".product__quantity--minus")
// const plusButton = document.querySelector(".product__quantity--plus")
// const quantityInput = document.querySelector(".product__quantity--input")

// function updateQuantity(value) {
//   const currentQuantity = parseInt(quantityInput.value) || 1
//   const newQuantity = Math.max(1, currentQuantity + value)
//   quantityInput.value = newQuantity
// }

// plusButton.addEventListener("click", (e) => {
//   e.preventDefault()
//   updateQuantity(1)
// })

// minusButton.addEventListener("click", (e) => {
//   e.preventDefault()
//   updateQuantity(-1)
// })

const params = new URLSearchParams(window.location.search)
const idProduto = params.get("p")

const SUPABASE_URL = 'https://zrqfqigboekporcfhrlf.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycWZxaWdib2VrcG9yY2ZocmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzQ2OTQsImV4cCI6MjA2OTgxMDY5NH0.9nImNPFq-OWPWSOEtv1yJuBl68BJucCuU7jpGmyqCtY'

async function carregarProduto(id) {
  try {
    const resposta = await fetch(`${SUPABASE_URL}/rest/v1/produtos?id=eq.${id}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    })

    const [produto] = await resposta.json()
    if (!produto) throw new Error("Produto não encontrado")

    document.querySelector(".product__image").src = produto.imagem
    document.querySelector(".product__title").textContent = produto.nome
    document.querySelector(".product__price").textContent = `R$ ${(produto.preco_por / 100).toFixed(2).replace('.', ',')}`
    document.querySelector(".product__description").textContent = produto.descricao

    const tagIcone = produto.vegano ? "./image/Plant.png" : "./image/Cow.png"
    const tagTexto = produto.vegano ? "Vegano" : "Contém lactose"
    document.querySelector(".product__tag img").src = tagIcone
    document.querySelector(".product__tag span").textContent = tagTexto

    const botaoComprar = document.querySelector(".product__button")
    botaoComprar.addEventListener("click", async (e) => {
      e.preventDefault()

      const nome = produto.nome
      const preco = produto.preco_por / 100
      const imagem = produto.imagem
      const quantidade = parseInt(
        document.querySelector(".product__quantity--input").value
      )

      const produtoAdicionado = {
        id: parseInt(idProduto),
        nome,
        preco,
        imagem,
        quantidade,
        vegano: produto.vegano
      }

      adicionarAoCarrinho(produtoAdicionado)
      alert(`${nome} adicionado ao carrinho!`)
    })

  } catch (erro) {
    console.error("Erro ao carregar produto:", erro)
  }
}

if (idProduto) {
  carregarProduto(idProduto)
}

// controle de quantidade
const minusButton = document.querySelector(".product__quantity--minus")
const plusButton = document.querySelector(".product__quantity--plus")
const quantityInput = document.querySelector(".product__quantity--input")

function updateQuantity(value) {
  const currentQuantity = parseInt(quantityInput.value) || 1
  const newQuantity = Math.max(1, currentQuantity + value)
  quantityInput.value = newQuantity
}

plusButton.addEventListener("click", (e) => {
  e.preventDefault()
  updateQuantity(1)
})

minusButton.addEventListener("click", (e) => {
  e.preventDefault()
  updateQuantity(-1)
})
