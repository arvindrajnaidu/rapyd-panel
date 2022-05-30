import React, { useContext } from "react";
import { Button, Chip } from "@material-ui/core";
import { AppContext } from "./AppProvider";

const RapydButton = () => {
  const { createOrder } = useContext(AppContext);
  return <Button fullWidth variant="contained" color="primary" onClick={createOrder}>Send Rapyd Checkout</Button>;
};

const RapydStatus = ({order}) => {
  switch(order.status) {
    case 'PAID': {
      return <Chip style={{width: '100%', backgroundColor: '#1EC677',}} label={'CART PAID'} />
    }
    default: {
      return <Chip style={{width: '100%', backgroundColor: '#fca311',}} label={'CART SENT'} />
    }
  }
};

export default function Page() {
  const { order } = useContext(AppContext);
  return (
    <div style={{padding: 0, marginTop: 5, width: 336, }}>
        {order ? <RapydStatus order={order} />: <RapydButton />}
    </div>
  );
}
