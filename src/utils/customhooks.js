
import React from 'react'
import { GlobalContext } from '../context'

export const useGlobalContext = () => {
    const { storeState, dispatch } = React.useContext(GlobalContext)
    return { storeState, dispatch }
}

