
import { storageService } from './storageService.js';
import { httpService } from './httpService';
import { gameService } from './gameService.js';

export const playerService = {
    getPlayer,
    savePlayer,
    switchPlayers
}

const STORAGE_KEY = 'player';

function getPlayer() {
    const player = storageService.sessionLoad(STORAGE_KEY);
    return Promise.resolve({ ...player });
}

async function savePlayer(player) {
    storageService.sessionStore(STORAGE_KEY, player);

    // const gameSessions = await httpService.get('gameSession');
    // const isGameOn = gameSessions.some(session => session.isOn);
    // console.log('isGameOn:', isGameOn);
    // if (!isGameOn) await gameService.saveGameSession();

    return Promise.resolve(player);
}

function switchPlayers() {
    const player = storageService.sessionLoad(STORAGE_KEY);
    const typesMap = {
        'drawer': 'guesser',
        'guesser': 'drawer'
    }
    const newType = typesMap[player.type];
    player.type = newType;
    return Promise.resolve(savePlayer(player));
}
