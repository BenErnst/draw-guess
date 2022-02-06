
import { utilService } from './utilService.js';
import { httpService } from './httpService';

export const gameService = {
    query,
    saveGameSession,
    saveWord,
    saveGameData,
}

async function query() {
    try {
        const gameSessions = await httpService.get('gameSession');
        if (!gameSessions.length) gameSessions.push(_getNewGameSession());
        return gameSessions;
    } catch (err) {
        console.log('Error in Query GameSessions (front gameService):', err);
        throw err;
    }
}

async function saveGameSession(gameSession = _getNewGameSession()) {
    try {
        const savedGameSession = (gameSession._id) ?
        await httpService.put(`gameSession/${gameSession._id}`, gameSession) :
        await httpService.post('gameSession/', gameSession);
        return savedGameSession;
    } catch (err) {
        console.log('Error in saveGameSession (front gameService):', err);
        throw err;
    }
}

async function saveWord(word) {
    let gameSessionToEdit = await _getCurrSession();
    if (gameSessionToEdit.score) gameSessionToEdit = _getNewGameSession();
    gameSessionToEdit.word = word;
    return await saveGameSession(gameSessionToEdit);
}

async function saveGameData({guesser, points, count, ts}) {
    let gameSessionToEdit = await _getCurrSession();
    gameSessionToEdit.guesser = guesser;
    gameSessionToEdit.score = points;
    gameSessionToEdit.time = count;
    gameSessionToEdit.endedAt = ts;
    return await saveGameSession(gameSessionToEdit);
}

async function _getCurrSession() {
    const gameSessions = await query();
    const currSession = gameSessions[gameSessions.length - 1];
    return currSession;
}

function _getNewGameSession() {
    return {
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
        endedAt: null
    }
}
