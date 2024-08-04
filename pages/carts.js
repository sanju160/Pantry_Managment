import { useCart } from '../context/CartContext';
import { List, ListItem, ListItemText, Button, Container, Typography } from '@mui/material';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Container>
      <Typography variant="h4">Shopping Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.quantity} />
            <Button onClick={() => removeFromCart(item)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Cart;
