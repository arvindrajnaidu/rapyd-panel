import React, { useEffect, createContext, useReducer, useState } from "react";

export const AppContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case "set-order":
      return { ...state, order: action.order };
    default:
      return state;
  }
}

const dummyHandler = () => {};

export const AppProvider = ({
  children,
  merchantPhone,
  orderId,
  amt,
  onSendCart = dummyHandler,
}) => {

  const [state, dispatch] = useReducer(reducer, {});
  const [didCreateOrder, setDidCreateOrder] = useState(false)

  useEffect(() => {
    async function listenToOrder () {
      const order = await window.CasualSeller.db.getItem(`/merchants/${merchantPhone}/online_orders/${orderId}`)
      if (order) {
        order.addListener((snap) => {
          console.log(snap.val())
          dispatch({
            type: 'set-order',
            order: snap.val()
          })
        })
      }
    }
    listenToOrder()
  }, [orderId, merchantPhone, didCreateOrder]);

  const createOrder = async () => {
    await window.CasualSeller.db.setItem(`/merchants/${merchantPhone}/online_orders/${orderId}`, {
      amt,
      status: 'created',
    })
    setDidCreateOrder(true)
    onSendCart(`https://freshcatch-700a3.firebaseapp.com/${merchantPhone}/carts?orderId=${orderId}&amt=${amt}`)
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        createOrder,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
