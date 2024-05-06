import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
  branch: undefined,
  dates: [],
  bedrooms: [],
  recommended: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        branch: state.branch,
        dates: state.dates,
        bedrooms: state.bedrooms,
        // recommended: state.recommended,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
