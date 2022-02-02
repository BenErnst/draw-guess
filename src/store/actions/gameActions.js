
import { gameService } from '../../services/gameService';

export function loadGameSessions() {
    return async (dispatch) => {
        try {
            const gameSessions = await gameService.query();
            dispatch({ type: 'SET_GAME_SESSIONS', gameSessions });
        } catch (err) {
            console.log('Error in loadGameSessions Action:', err);
        }
    }
}

export function setWord(word) {
    return async (dispatch) => {
        try {
            const savedSession = await gameService.saveWord(word);
            dispatch({type: 'SAVE_GAME_SESSION', savedSession});
        } catch (err) {
            console.log('Error in setWord Action:', err);
        }
    }
}

export function setGameData(guesser, points) {
    return async (dispatch) => {
        try {
            const savedSession = await gameService.saveGameData(guesser, points);
            dispatch({type: 'SAVE_GAME_SESSION', savedSession});
        } catch (err) {
            console.log('Error in setScore Action:', err);
        }
    }
}

export function startNewGame() {
    return async (dispatch) => {
        try {
            const gameSessions = await gameService.startNewGame();
            dispatch({ type: 'SET_GAME_SESSIONS', gameSessions });
        } catch (err) {
            console.log('Error in startNewGame Action:', err);
        }
    }
}

// export function removeRobot(robotId) {
//     return async (dispatch) => {
//         try {
//             await robotService.remove(robotId)
//             dispatch({ type: 'REMOVE_ROBOT', robotId })
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }

// export function setFilterBy(filterBy) {
//     return async (dispatch) => {
//         dispatch({ type: 'SET_FILTER_BY', filterBy })
//     }
// }

// export function getRobotById(robotId) {
//     return async () => {
//         return await robotService.getById(robotId)
//     }
// }