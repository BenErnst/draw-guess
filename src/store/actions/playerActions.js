
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

export function savePlayer(player) {
    return async () => {
        try {
            await playerService.savePlayer(player);
            console.log(`Player with id ${player.id} has been Saved Succefully`);
        } catch (err) {
            console.log('Error in savePlayer Action:', err);
        }
    }
}

export function switchPlayers() {
    return async () => {
        try {
            await playerService.switchPlayers();
            console.log(`Players have been Switched Succefully`);
        } catch (err) {
            console.log('Error in switchPlayers Action:', err);
        }
    }
}
