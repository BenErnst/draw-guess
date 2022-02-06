
const INITIAL_STATE = {
    gameSessions: [],
    currSession: null
}

export function gameReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_GAME_SESSIONS':
            return {
                ...state,
                gameSessions: [ ...action.gameSessions ]
            };

        case 'SAVE_GAME_SESSION':
            return {
                ...state,
                gameSessions: state.gameSessions.map(session => {
                    return (session._id === action.savedSession._id) ? action.savedSession : session
                })
            }

        case 'SET_CURR_SESSION':
            return {
                ...state,
                currSession: { ...action.currSession }
            }
            
        default:
            return state;
    }
}