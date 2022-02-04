
import { playerService } from '../../services/playerService';

export function loadPlayer() {
    return async (dispatch) => {
        try {
            const player = await playerService.getPlayer();
            dispatch({ type: 'SET_PLAYER', player });
        } catch (err) {
            console.log('Error in loadPlayer Action:', err);
        }
    }
}

export function savePlayer(playerToSave) {
    return async (dispatch) => {
        try {
            const player = await playerService.savePlayer(playerToSave);
            dispatch({ type: 'SET_PLAYER', player });
        } catch (err) {
            console.log('Error in savePlayer Action:', err);
        }
    }
}

export function switchPlayers() {
    return async (dispatch) => {
        try {
            const player = await playerService.switchPlayers();
            dispatch({ type: 'SET_PLAYER', player });
        } catch (err) {
            console.log('Error in switchPlayers Action:', err);
        }
    }
}
