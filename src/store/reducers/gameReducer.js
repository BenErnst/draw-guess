
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
            
        // case 'ADD_ROBOT':
        //     return {
        //         ...state,
        //         robots: [...state.robots, action.robot]
        //     }

        // case 'REMOVE_ROBOT':
        //     return {
        //         ...state,
        //         robots: state.robots.filter(robot => robot._id !== action.robotId)
        //     }

        // case 'UPDATE_ROBOT':
        //     return {
        //         ...state,
        //         robots: state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
        //     }
        // case 'SET_FILTER_BY':
        //     return {
        //         ...state,
        //         filterBy: {...action.filterBy}
        //     }

        default:
            return state;
    }

}