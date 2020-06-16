//INTRO

let aNumber = 1
//Global scope access
const incrementBad = () => aNumber += 1
//pure function
const incrementFn = (aNumber: number) => aNumber + 1

//DONT ITERATE (MAP AND REDUCE)
const numberArr = [1,2,3,4,5,6]
console.log('numberArr base data set')

const squares = numberArr
	.map(number=> number * number)

console.log(numberArr)
console.log('map() to square number')
console.log(squares)

const addedNumbers = numberArr
.reduce((prevN, n)=> prevN + n , 0)

console.log('reduce() to add numbers')
console.log(addedNumbers)

//Find times Doggo appears
const animalArr = ['Doggo', 'Kotton', 'Pupper', 'Doggo', 'Squirrel', 'Doggo']
console.log('Base data set animalArr')
console.log(animalArr)

// const numOfDoggos = animalArr
// 	.filter(animal => animal === 'Doggo')
// 	.length

const numOfDoggos = animalArr
	.reduce((count, animal)=> animal === 'Doggo'? ++count : count ,0 )
console.log('Number of Doggo occurances using reduce()')
console.log(numOfDoggos)

//Exercise 2
const peopleArr: {name: string, height?: number}[] = [
	{name: 'Mary', height: 160},
	{name: 'Isla', height: 80},
	{name: 'Sam'}
]
console.log('People dataset')
console.log(peopleArr)

// const heightTotal = peopleArr
// 	.reduce((height, person)=> person.height? height + person.height: height ,0)
// console.log('Height Total')
// console.log(heightTotal)

// const heightCount = peopleArr
// 	.reduce((count, person)=> person.height? ++count : count ,0)

// console.log('Height Count')
// console.log(heightCount)

const peoplewithHeight = peopleArr
	.filter(person=> person.height)

console.log('Get people that have height')
console.log(peoplewithHeight)

const avgHeight = peopleArr
	.reduce((height, person)=> person.height? height + person.height: height ,0)
	/ peoplewithHeight.length

console.log('Average Height')
console.log(avgHeight)

//WRITE DECLARATIVELY NOT IMPERATIVELY
interface RaceState {
	time: number,
	carPositions: number[]
}

const raceState: RaceState = {
	time: 5,
	carPositions: [1,1,1]
}

const moveCars = ({carPositions}: RaceState) => carPositions
		.map(carPos=> Math.random() > 0.3 ? ++carPos : carPos)

const stepOfRace = (raceState: RaceState): RaceState =>{
	return {
		time: raceState.time -1,
		carPositions: moveCars(raceState)
	}
}

const drawState = (raceState: RaceState) => {
	console.log(`${raceState.time} Steps Left!\n`)
	raceState.carPositions
		.map(carPos=> console.log('\n' + '-'.repeat(carPos)))
}

const race = (raceState: RaceState) => {
	if(raceState.time > 0){
		drawState(raceState)
		race(stepOfRace(raceState))
	} 
}
// const race = (raceState: RaceState) => {
// 	while(raceState.time > 0){
// 		drawState(raceState)
// 		raceState = stepOfRace(raceState)
// 	}
// }

race(raceState)

//ZERO ONE RULES ON STRING
console.log('Zero One Rule');

const zero = (string: string) => string[0] === '0'? string.slice(1) : null

const one = (string: string) => string[0] === '1'? string.slice(1) : null

const ruleSequence = (string: string, rules: Function[]): string | null =>
	!string || rules.length === 0 
	? string 
	: ruleSequence(rules[0](string), rules.slice(1))

console.log(ruleSequence('0101',[zero, one, zero]))
console.log(ruleSequence('0101',[zero, zero]))

//PIPELINING

interface Band {
	name: string,
	country: string,
	active: boolean
}

const bands: Band[] = [
	{name: 'sunset rubdown', country: 'UK', active: false},
	{name: 'women', country: 'Germany', active: false},
	{name: 'a silver mt. zion', country: 'Spain', active: true}
]

const setCanadaAsCountry = (bands: Band[]) =>
	bands.map(band=> { 
		return { ...band, country: 'Canada'} 
	} )

const removePunctiationFromName = (bands: Band[])=>
	bands.map(band=> { 
		return { ...band, name: band.name.replace('.','') } 
	} )

const capitalizeStrings = (string: string) => string
	.split(' ')
	.map(word=> word[0].toUpperCase().concat(word.slice(1)))
	.join(' ')

const capitalizeNames = (bands: Band[])=>
	bands.map(band=> {
		return {...band, name: capitalizeStrings(band.name)}
	} )

const pluck = (bands: Band[])=> bands
	.map(band=> { return {name: band.name, country: band.country} })

const pipelineEach = (bands: Band[], fns: Function[]): Band[] =>
	fns.length === 0? bands : pipelineEach(fns[0](bands), fns.slice(1))

console.log('Pipeline Test');
const updatedBands = pipelineEach(bands, [
	setCanadaAsCountry,
	removePunctiationFromName,
	capitalizeNames,
	pluck
])
console.log('Original DataSet (After pipeline)');
console.log(bands);
console.log('New Processed DataSet');
console.log(updatedBands)