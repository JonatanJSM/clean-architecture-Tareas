type State = { rolls: number[] } //Se crea un tipo
const INITIAL_STATE: State = { rolls: [] }  // Se inicia el tipo en 0

//Se crea un objeto que tiene dos métodos
// el freeze significa que las propiedades no pueden ser modificadad
export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll : (pins: number) => roll(state, pins),
  score: () => score(state)
})

export type Game = ReturnType<typeof createBowlingGame>

const roll = (state: State, pins:number) => {
  // las llaves son para asegurarse de que se cree un nuevo objeto State con una nueva instancia del arreglo pins que contenga los resultados actualizados de los lanzamientos, en lugar de modificar directamente el objeto State existente.
  return createBowlingGame({ rolls: [...state.rolls, pins] })
}
              //destructuración
const score = ({ rolls }: State) => {
  const FRAMES = 10
  let score = 0
  let firstTry = 0

  for(let frame = 0; frame < FRAMES; frame++){
    if(isStrike(rolls, firstTry)){
      score += scoreForStrike(rolls, firstTry)
      firstTry += 1
    }else if (isSpare(rolls, firstTry)){
      score += scoreForSpare(rolls, firstTry)
      firstTry += 2
    }else{
      score += scoreForFrame(rolls, firstTry)
      firstTry += 2
    }
  }
  return score
}

function scoreForStrike(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry+1] + rolls[firstTry + 2]
}

function isStrike(rolls: number[], firstTry:number){
  return rolls[firstTry] == 10
}

function scoreForSpare(rolls: number[],firstTry:number){
  return 10 + rolls[firstTry + 2]
}

function isSpare(rolls: number[], firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1] == 10
}

function scoreForFrame(rolls: number[],firstTry:number){
  return rolls[firstTry] + rolls[firstTry + 1]
}