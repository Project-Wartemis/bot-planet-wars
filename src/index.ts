import { Bot } from 'wartemis';

interface State {
  players: Array<number>;
  planets: Array<Planet>;
  moves: Array<Move>;
}

interface Planet {
  id: number;
  name: string; // not relevant for the actual game
  x: number; // position
  y: number; // position
  player: number; // references a player
  ships: number; // how many ships this planet has
}

interface Move {
  id: number;
  source: number; // references a planet
  target: number; // references a planet
  player: number; // references a player
  ships: number; // how many ships are in this fleet
  turns: number; // how long it will take for this fleet to arrive
}

interface Action {
  moves: Array<ActionMove>;
}

interface ActionMove {
  source: number; // references a planet
  target: number; // references a planet
  ships: number; // how many ships to send
}

class BotPlanetWars extends Bot {

  constructor() {
    super('Planet Wars', 'Demobot-test');
  }

  handleError(error: string): void {
    console.error(error);
  }

  handleState(state: State): Action {
    const action: Action = { moves: [] };
    const target = state.planets.find(planet => planet.player !== 1);
    if(!target) {
      return action;
    }
    const ownedPlanets = state.planets.filter(planet => planet.player === 1);
    for(const source of ownedPlanets) {
      action.moves.push({
        source: source.id,
        target: target.id,
        ships: source.ships
      });
    }
    return action;
  }
}

const bot = new BotPlanetWars();
bot.start();
