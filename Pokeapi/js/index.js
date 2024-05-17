const buscarListado = async (offset) =>{
	const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=15`
	const res = await fetch(url)
	const data = await res.json()
	return data
}

const main = document.querySelector(`#listado`)
let offset = parseInt(localStorage.getItem(`offset`))
if(isNaN(offset)){offset = 0}

const listadoPokemon = async (numero) =>{

	const respuesta = await buscarListado(numero)
	const resultados = respuesta.results
	main.innerHTML = ''

	resultados.forEach( pokemon => {
		const bloqueInfo = document.createElement(`article`)
		bloqueInfo.setAttribute(`class`, `pokemon`)
		const indice = pokemon.url.lastIndexOf(`n/`)
		const id = parseInt(pokemon.url.slice(indice+2))
		bloqueInfo.innerHTML = `
			<img src="img/pokeball.gif" alt="" width="50px">
			<h2>${pokemon.name}</h2>
			<a href="detalle.html" id="${id}">Ver detalle</a>`
		bloqueInfo.querySelector(`a`).addEventListener(`click`, guardarId)
		main.appendChild(bloqueInfo)
	})

	const ante = document.querySelector(`#ante`)
	const next = document.querySelector(`#next`)

	ante.style.display = 'none'
	next.style.display = 'none'

	if(respuesta.previous != null){ante.style.display = 'block'}
	if(respuesta.next != null){next.style.display = 'block'}

	ante.onclick = () =>{offset -= 15; listadoPokemon(offset)}
	next.onclick = () =>{offset += 15; listadoPokemon(offset)}
}

listadoPokemon(offset)

const guardarId = (e) => {
	localStorage.setItem(`pokeID`, e.target.id)
	localStorage.setItem(`offset`, offset)
}