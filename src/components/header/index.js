import React from 'react'
import Container from '../container'
import { useGlobalContext } from '../../utils/customhooks'
import HeaderCartListPopup from '../headercartlistpopup'
import './styles.scss'

const Header = () => {

    const { storeState } = useGlobalContext()

    const [state, setState] = React.useState({ isCartVisible: false })

    const toggleCartVisibility = (e) => {
        setState((prevState) => ({ isCartVisible: !prevState.isCartVisible }))
    }

    const setIsCartVisibleToFalse = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isCartVisible: false }))
    }, [])

    return (
        <header className="flex items-center">
            <Container>
                <div className="flex justify-end">
                    <div
                        className="cart-area cursor-pointer flex"
                    >
                        <div className="cart-data" onClick={toggleCartVisibility}>
                            {
                                storeState.cartTotal.price > 0 && (
                                    <>
                                        <div>${storeState.cartTotal.price}</div>
                                        <div className="text-sm">{`${storeState.cartTotal.items} Item${storeState.cartTotal.items > 1 ? 's' : ''}`} &#x25BC;</div>
                                    </>
                                )
                            }
                        </div>

                        <div
                            className="cart-image flex items-center"
                            onClick={toggleCartVisibility}
                        >
                            <img src={'/cart-icon.png'} alt="cart-icon" width="30" />
                        </div>
                    </div>
                </div>
                {state.isCartVisible && <HeaderCartListPopup setIsCartVisibleToFalse={setIsCartVisibleToFalse} />}
            </Container>

        </header>
    )
}

export default Header