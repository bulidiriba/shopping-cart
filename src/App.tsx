import { useState } from "react";
import { useQuery } from "react-query";

import { Drawer, LinearProgress, Grid, Badge, Typography, } from "@mui/material";
import { AddShoppingCart } from '@mui/icons-material';

// styles
import { Wrapper } from "./App.styles";

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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products", 
    getProducts
  );

  const getTotalItems = () => null;

  const handleAddToCart = () => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography>Something went wrong...</Typography>

  return (
    <div className="App">
      Start
    </div>
  );
}

export default App;
