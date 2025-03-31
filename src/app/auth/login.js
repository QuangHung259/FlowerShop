"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi request đăng nhập
    console.log({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mb: 2 }}>Đăng nhập</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Đăng nhập
        </Button>
      </form>
    </Container>
  );
}
