
const INITIAL_STATE = {
    player: null
}

export function playerReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...state,
                player: { ...action.player }
            }
        default:
            return state;
    }

}