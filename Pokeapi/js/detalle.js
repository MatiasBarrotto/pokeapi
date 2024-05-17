const main = document.querySelector(`#detalles`)
const ID = localStorage.getItem(`pokeID`)

fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
.then(res => res.json())
.then(detalles => {
	const bloqueInfo = document.createElement(`article`)
	bloqueInfo.setAttribute(`class`, `pokemon`)
	bloqueInfo.innerHTML = `
	<img src="${detalles.sprites.front_default}" 
		onmouseover="this.src = '${detalles.sprites.back_default}'" 
		onmouseout="this.src = '${detalles.sprites.front_default}'">
	<h2>${detalles.name}</h2>
	<div>
		<p class="data"><span>HP:</span><br>${detalles.stats[0].base_stat}</p>
		<p class="data"><span>Ataque:</span><br>${detalles.stats[1].base_stat}</p>
		<p class="data"><span>Defensa:</span><br>${detalles.stats[2].base_stat}</p>
	</div>
	<div>
		<p class="data"><span>Especial:</span><br>${detalles.stats[3].base_stat}</p>
		<p class="data"><span>Def Especial:</span><br>${detalles.stats[4].base_stat}</p>
		<p class="data"><span>Velocidad:</span><br>${detalles.stats[5].base_stat}</p>
	</div>
	<div>
		<p class="data"><span>Altura:</span> ${(detalles.height/10)}m</p>
		<p class="data"><span>Peso:</span> ${(detalles.weight/10)}Kg</p>
	</div>
	<audio controls>
  	<source src="${detalles.cries.latest}" type="audio/ogg">
		Your browser does not support the audio element.
	</audio>`
	main.appendChild(bloqueInfo)
})