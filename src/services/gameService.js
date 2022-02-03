
import { storageService } from './storageService.js';
import { utilService } from './utilService.js';

export const gameService = {
    query,
    saveWord,
    saveGameData,
    startNewGame,
    saveArt,
    // loadArt
}

const STORAGE_KEY = 'gameSessions';

var gGameSessions = _loadGameSessions();

function query() {
    return Promise.resolve([ ...gGameSessions ]);
}

function saveGameSession(gameSession) {
    const idx = gGameSessions.findIndex(session => session._id === gameSession._id);
    gGameSessions.splice(idx, 1, gameSession);
    storageService.localStore(STORAGE_KEY, gGameSessions);
    return Promise.resolve(gameSession);
}

function saveWord(word) {
    let gameSessionToEdit = _getSessionCopy();
    gameSessionToEdit.word = word;
    return saveGameSession(gameSessionToEdit);
}

function saveGameData(guesser, points) {
    let gameSessionToEdit = _getSessionCopy();
    gameSessionToEdit.guesser = guesser;
    gameSessionToEdit.score = points;
    return saveGameSession(gameSessionToEdit);
}

function startNewGame() {
    let gameSessions = storageService.localLoad(STORAGE_KEY);
    gameSessions.push(_getNewGameSession());
    storageService.localStore(STORAGE_KEY, gameSessions);
    return Promise.resolve([ ...gameSessions ]);
}

function saveArt(dataURL) {
    let gameSessionToEdit = _getSessionCopy();
    gameSessionToEdit.artURL = dataURL;
    return saveGameSession(gameSessionToEdit);
}

// function loadArt(id) {
//     const gameSession = gGameSessions.find(session => session._id === id);   
//     return Promise.resolve(gameSession.artURL);
// }

function _getSessionCopy() {
    const lastSession = gGameSessions[gGameSessions.length - 1];
    return JSON.parse(JSON.stringify(lastSession));
}

function _loadGameSessions() {
    let gameSessions = storageService.localLoad(STORAGE_KEY);

    if (!gameSessions || !gameSessions.length) gameSessions = [_getNewGameSession()]; 
    else gameSessions.push(_getNewGameSession());

    storageService.localStore(STORAGE_KEY, gameSessions);

    return gameSessions;
}

function _getNewGameSession() {
    return {
        _id: `g${utilService.makeId()}`,
        guesser: null, 
        score: null,
        time: null,
        word: {
            id: `w${utilService.makeId()}`,
            txt: '',
            rank: {
                level: '',
                points: null
            }
        },
        artURL: ''
    }
}
