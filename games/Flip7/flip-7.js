let players = JSON.parse(localStorage.getItem("Flip7-players")) || []
let rounds = JSON.parse(localStorage.getItem("Flip7-rounds")) || []
let totals = JSON.parse(localStorage.getItem("Flip7-totals")) || []
let currRound = 1
let colors = [
	"#00ff04",
	"#ff2e2eff",
	"#ffaa00ff",
	"#ffe600ff",
	"#00fff2ff",
	"#71a0ffff",
	"#f757ffff",
	"#9b9b9bff",
]

let roundPeople = document.querySelector("#roundPeople")
let addPlayerForm = document.querySelector("#addPlayerForm")

function updateLeader() {
	document.querySelector("#leaderboard").innerHTML = ""
	let array = []
	for (let i = 0; i < players.length; i++) {
		array.push({
			name: players[i],
			total: totals[i],
		})
	}
	array = array.sort((a, b) => b.total - a.total)

	for (let i = 0; i < array.length; i++) {
		let wrapper = document.createElement("div")
		wrapper.classList.add("position")

		let posStr
		if (i <= 0) {
			posStr = "1st"
		} else if (i === 1) {
			posStr = "2nd"
		} else if (i === 2) {
			posStr = "3rd"
		} else {
			posStr = `${i + 1}th`
		}

		let positionNum = document.createElement("h2")
		positionNum.classList.add("positionNum")
		positionNum.innerText = posStr
		wrapper.appendChild(positionNum)

		let positionName = document.createElement("h3")
		positionName.classList.add("positionName")
		positionName.innerText = array[i].name
		let posColor =
			colors[players.findIndex((a) => a === array[i].name)] || "#fff"
		positionName.style.backgroundColor = posColor
		wrapper.appendChild(positionName)

		let positionTotal = document.createElement("p")
		positionTotal.classList.add("positionTotal")
		positionTotal.innerText = array[i].total
		wrapper.appendChild(positionTotal)

		document.querySelector("#leaderboard").appendChild(wrapper)
	}
}
updateLeader()

function roundOver(e) {
	console.log("Round Over")
	let roundArray = []

	for (let i = 0; i < players.length; i++) {
		let score = e[`${players[i]}Score`].value
		roundArray.push(parseFloat(score))
		totals[i] = (totals[i] || 0) + parseFloat(score)
	}

	rounds[currRound - 1] = roundArray

	currRound++
	showPeople()
	updateLeader()
	updateData()
}

document.querySelector("#roundForm").addEventListener("submit", (e) => {
	e.preventDefault()

	roundOver(e.target)
})

function newGame() {
	console.log("ran")
	players = []
	rounds = []
	totals = []
	currRound = 1
	updateData()
	updateLeader()
	showPeople()
	changePage(1)
}

function updateData() {
	localStorage.setItem("Flip7-players", JSON.stringify(players))
	localStorage.setItem("Flip7-totals", JSON.stringify(totals))
	localStorage.setItem("Flip7-rounds", JSON.stringify(rounds))
}

function changePage(num) {
	let pages = document.querySelectorAll(".page")

	for (let i = 0; i < pages.length; i++) {
		pages[i].style.display = "none"
	}

	pages[num].style.display = "block"
}
changePage(1)

addPlayerForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let name = e.target.name.value
	totals.push(0)

	players.push(name)
	showPeople()
	updateLeader()
	addPlayerForm.reset()
	hide("#addPlayer")
	updateData()
})

function showPeople() {
	document.querySelector("#roundNum").innerText = currRound
	roundPeople.innerHTML = ""

	if (players.length === 0) {
		roundPeople.innerHTML = "<p>Add people to get started.</p>"
	}

	for (let i = 0; i < players.length; i++) {
		let wrapper = document.createElement("div")
		wrapper.classList.add("person")

		let h3 = document.createElement("h3")
		h3.classList.add("personName")
		h3.innerText = players[i]
		let perColor = colors[i] || "#fff"
		h3.style.backgroundColor = perColor
		wrapper.appendChild(h3)

		let input = document.createElement("input")
		input.classList.add("scoreInput")
		input.type = "number"
		input.name = `${players[i]}Score`
		wrapper.appendChild(input)

		roundPeople.appendChild(wrapper)
	}
}
showPeople()

function show(id) {
	document.querySelector(id).style.display = "block"
}
function hide(id) {
	document.querySelector(id).style.display = "none"
}
