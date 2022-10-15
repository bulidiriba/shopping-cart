import { useState } from "react";
import { useQuery } from "react-query";

// library
import { Drawer, LinearProgress, Grid, Badge, Typography, } from "@mui/material";
import { AddShoppingCart } from '@mui/icons-material';

//Components
import  { Item } from "./components/Item/item";
import { Cart } from "./components/Cart/Cart";

// styles
import { Wrapper, StyledButton } from "./App.styles";

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch("https://fakestoreapi.com/products")).json();


  const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    const { data, isLoading, error } = useQuery<CartItemType[]>(
      "products", 
      getProducts
    );

    const getTotalItems = (items: CartItemType[]) => 
      items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => null;

    const handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress />;
    if (error) return <Typography>Something went wrong...</Typography>

    return (
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
          <Cart 
            cartItems={cartItems} 
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}  
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)} >
          <Badge badgeContent={getTotalItems(cartItems)} color='error'></Badge>
          <AddShoppingCart />
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart } />
            </Grid>
          )))}
        </Grid>
      </Wrapper>
    );
}

export default App;
