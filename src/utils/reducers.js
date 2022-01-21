
export const initialState = {
    products: [],
    cartTotal: { price: 0, items: 0 }
}

export const reducer = (state, action) => {

    const { type, payload = {} } = action

    let { id = null, data = [] } = payload
    let products = [...state.products]
    let newProducts = []

    switch (type) {
        case 'INCREMENT_QTY':
        case 'DECREMENT_QTY':
            let cartTotal = { ...state.cartTotal }
            products.forEach(item => {
                if (item.id === id) {
                    let { qty: updatedItemQty, cart: updatedCartFlag, unitPrice, totalItemPrice } = item
                    if (type === 'INCREMENT_QTY') {
                        updatedItemQty = item.qty + 1
                        updatedCartFlag = true
                        totalItemPrice += unitPrice
                        cartTotal.price += unitPrice
                    } else if (type === 'DECREMENT_QTY' && item.qty > 0) {
                        updatedItemQty = item.qty - 1
                        const isQtyZero = updatedItemQty === 0
                        updatedCartFlag = isQtyZero ? false : true
                        totalItemPrice -= unitPrice
                        cartTotal.price -= unitPrice
                    }

                    newProducts.push({ ...item, qty: updatedItemQty, cart: updatedCartFlag, totalItemPrice })

                } else {
                    newProducts.push(item)
                }
            })

            cartTotal.items = newProducts.filter(item => item.cart === true).length

            return { ...state, products: [...newProducts], cartTotal }

        case 'REMOVE_PRODUCT_FROM_CART':

            let cartTotalForRemove = { ...state.cartTotal }

            products.forEach(item => {
                let { qty: updatedItemQty, cart: updatedCartFlag, totalItemPrice } = item
                if (item.id === id) {
                    cartTotalForRemove.price -= totalItemPrice
                    updatedCartFlag = false
                    updatedItemQty = 0
                    totalItemPrice = 0
                }
                newProducts.push({ ...item, qty: updatedItemQty, cart: updatedCartFlag, totalItemPrice })
            })

            cartTotalForRemove.items = newProducts.filter(item => item.cart === true).length

            return { ...state, products: [...newProducts], cartTotal: cartTotalForRemove }

        case 'SET_PRODUCTS_IN_PAGE':
            const prevProducts = [...state.products]

            data.forEach(item => {
                const matchedList = prevProducts.filter(prevItem => prevItem.id === item.id)
                if (matchedList.length === 1) {
                    newProducts.push({ ...matchedList[0] })
                } else
                    newProducts.push({ ...item, qty: 0, cart: false, unitPrice: +item.price, totalItemPrice: 0 })
            })

            localStorage.clear()

            return { ...state, products: [...newProducts] }

        case 'REFRESH_STORE_STATE_IN_LOCALSTORAGE_ONBEFOREUNLOAD':
            localStorage.setItem('localStateInLS', JSON.stringify({ ...state }))
            return { ...state }

        default:
            return { ...state }

    }
}