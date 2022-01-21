import React from 'react'
import { useGlobalContext } from '../../utils/customhooks'
import './styles.scss'

const HeaderCartListPopup = (props) => {
    const { storeState, dispatch } = useGlobalContext()

    React.useEffect(() => {

        if (storeState.cartTotal.price === 0) {
            props.setIsCartVisibleToFalse()
        }
    }, [storeState.cartTotal.price])


    return (
        <>
            {
                storeState.products.length > 0 && storeState.cartTotal.price > 0 && (
                    <div className="list-wrapper position-absolute">
                        <span className="position-absolute top-arrow">&#x25B2;</span>
                        <ul className="list-container">
                            {
                                storeState.products.map((item, index) => {
                                    if (item.cart) {
                                        const { totalItemPrice, currency, title, qty, id } = item
                                        return (
                                            <li className="flex items-center" key={id}>
                                                <div className="text-lg remove-icon m-auto">
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={(e) => dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: { id } })}
                                                    >+</span>
                                                </div>
                                                <div className="product-detail flex flex-col flex-1">
                                                    <span className="name">{title}</span>
                                                    <span className="price">{`${currency}${totalItemPrice}`}</span>
                                                </div>
                                                <div className="text-xs">Qty {qty}</div>
                                            </li>
                                        )
                                    }
                                    return null
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default HeaderCartListPopup