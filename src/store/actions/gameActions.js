
import { gameService } from '../../services/gameService';

export function loadGameSessions() {
    return async (dispatch) => {
        try {
            const gameSessions = await gameService.query();
            dispatch({ type: 'SET_GAME_SESSIONS', gameSessions });
            
            const currSession = gameSessions[gameSessions.length - 1];
            dispatch({type: 'SET_CURR_SESSION', currSession});
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
            
            const currSession = savedSession;
            dispatch({type: 'SET_CURR_SESSION', currSession});            
        } catch (err) {
            console.log('Error in setWord Action:', err);
        }
    }
}

export function setGameData(data) {
    return async (dispatch) => {
        try {
            const savedSession = await gameService.saveGameData(data);
            dispatch({type: 'SAVE_GAME_SESSION', savedSession});
            // dispatch({type: 'SET_CURR_SESSION', currSession: null});
        } catch (err) {
            console.log('Error in setScore Action:', err);
        }
    }
}


// export function getById(id) {
//     return async (dispatch) => {
//         try {
//             const currSession = await gameService.getById(id);
//             dispatch({type: 'SET_CURR_SESSION', currSession});
//         } catch (err) {
//             console.log('Error in getSessionById Action:', err);
//         }
//     }
// }

// export function saveImg(dataURL) {
//     return async (dispatch) => {
//         try {
//             const savedSession = await gameService.saveImg(dataURL);
//             dispatch({type: 'SAVE_GAME_SESSION', savedSession});

//             const currSession = savedSession;
//             dispatch({type: 'SET_CURR_SESSION', currSession});
//         } catch (err) {
//             console.log('Error in saveImg Action:', err);
//         }
//     }
// }