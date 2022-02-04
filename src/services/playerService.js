
import { storageService } from './storageService.js';

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

function savePlayer(player) {
    storageService.sessionStore(STORAGE_KEY, player);
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
