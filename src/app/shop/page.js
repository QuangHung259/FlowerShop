"use client";

import { Container, Grid } from "@mui/material";
import Navbar from "@/components/Navbar"; 
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products"; // Đảm bảo đường dẫn đúng

export default function ShopPage() {
  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <>
      <Navbar cartCount={0} /> {/* Thêm Navbar vào đây */}
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={6} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
    
  );
}
