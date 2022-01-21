import React from "react"
import { reducer, initialState } from '../utils/reducers'

export const GlobalContext = React.createContext()

export const GlobalProvider = (props) => {
    const preservedState = localStorage.getItem('localStateInLS')
    let updatedInitialState = { ...initialState }
    if (!!preservedState) {
        updatedInitialState = { ...updatedInitialState, ...JSON.parse(preservedState) }
    }
    const [storeState, dispatch] = React.useReducer(reducer, { ...updatedInitialState })
    return (
        <GlobalContext.Provider value={{ storeState, dispatch }}>
            {props.children}
        </GlobalContext.Provider >
    )
}