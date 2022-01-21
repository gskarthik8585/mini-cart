import React from "react"
import Container from '../container'
import { useGlobalContext } from '../../utils/customhooks'
import './styles.scss'
import { mockResponse } from '../../mock'

const Layout = () => {

    const { storeState, dispatch } = useGlobalContext()

    React.useEffect(() => {

        const beforeUnloadCb = (e) => {
            dispatch({ type: 'REFRESH_STORE_STATE_IN_LOCALSTORAGE_ONBEFOREUNLOAD' })
            e.returnValue = ''
        }

        const loadCb = (e) => {
            dispatch({ type: 'GET_STORE_STATE_FROM_LOCALSTORAGE_ONLOAD' })
        }

        window.addEventListener('beforeunload', beforeUnloadCb)
        window.addEventListener('load', loadCb)


        const getData = async () => {
            try {
                const data = await fetch('http://dnc0cmt2n557n.cloudfront.net/products.json')
                dispatch({ type: 'SET_PRODUCTS_IN_PAGE', payload: { data: data.products } })
            } catch (e) {
                // getting cors error when fetched from localhost:3000
                // hence hardcoding the response here                
                dispatch({ type: 'SET_PRODUCTS_IN_PAGE', payload: { data: mockResponse.products } })
            }
        }
        getData()

    }, [])


    return (
        <Container>
            {storeState.products.length > 0 && (
                <ul className="product-list-container max-w-screen-sm m-auto">
                    {
                        storeState.products.map((item, index) => (
                            <li
                                key={item.id}
                                className="flex flex-row items-center justify-content-center"
                            >
                                <div className="product-detail flex-1">
                                    <div className="name text-md">{item.title}</div>
                                    <div className="description text-sm">{item.desc}</div>
                                </div>
                                <div className="quantity-container">
                                    <div className="quantity-wrapper">
                                        <span
                                            className="operator cursor-pointer"
                                            onClick={(e) => dispatch({ type: 'DECREMENT_QTY', payload: { id: item.id } })}
                                        >-</span>
                                        <span className="number-value text-center">{item.qty}</span>
                                        <span
                                            className="operator cursor-pointer"
                                            onClick={(e) => dispatch({ type: 'INCREMENT_QTY', payload: { id: item.id } })}
                                        >+</span>
                                    </div>
                                </div>
                                <div className="product-price">{item.currency}{item.price}<div className="text-xs">(unit price)</div></div>
                            </li>
                        ))
                    }

                </ul>

            )}
        </Container>
    )
}

export default Layout