// Import Actions
import { SEARCH_USER } from './AppActions';

// Initial State
const initialState = {
  showUserStats: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        showUserStats: !state.showUserStats,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowUserStats = state => state.app.showUserStats;

// Export Reducer
export default AppReducer;
