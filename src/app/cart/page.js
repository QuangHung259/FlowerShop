"use client";

import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Xóa sản phẩm theo index
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        🛒 Giỏ hàng của bạn
      </Typography>
      <List>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Giỏ hàng trống!
          </Typography>
        ) : (
          cart.map((item, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText primary={item.name} secondary={`${item.price.toLocaleString()} VND`} />
              <Button variant="outlined" color="error" onClick={() => removeFromCart(index)}>
                Xóa
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}
