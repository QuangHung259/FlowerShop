"use client";

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng

export default function Navbar({ cartCount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Hook để điều hướng trang

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Điều hướng về trang chủ và cuộn xuống phần giới thiệu
  const scrollToAbout = () => {
    if (window.location.pathname === "/") {
      // Nếu đang ở trang chủ, chỉ cuộn xuống
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Nếu đang ở trang khác, điều hướng về trang chủ rồi cuộn xuống
      router.push("/#about-section");
    }
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffcccc" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "#e91e63" }}>
            𝓯𝓵𝓸𝓻𝓪𝓵 𝓱𝓪𝓿𝓮𝓷 🌸
          </Link>
        </Typography>

        {/* Danh sách menu */}
        <Box sx={{ display: "flex", gap: 2, mr: 2 }}>
          <Button color="inherit" onClick={scrollToAbout} sx={{ textTransform: "none", color: "inherit" }}>
            Giới thiệu
          </Button>
          <Link href="/shop" passHref legacyBehavior>
            <Button sx={{ textTransform: "none", color: "inherit" }}>Cửa hàng</Button>
          </Link>
          <Link href="/categories" passHref legacyBehavior>
            <Button sx={{ textTransform: "none", color: "inherit" }}>Loại hoa</Button>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <Button sx={{ textTransform: "none", color: "inherit" }}>Liên hệ</Button>
          </Link>
        </Box>

        {/* Giỏ hàng & Đăng nhập/Đăng xuất */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <Link href="/cart" passHref style={{ textDecoration: "none", color: "inherit" }}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout} sx={{ textTransform: "none" }}>Đăng xuất</Button>
          ) : (
            <Button color="inherit" onClick={handleLogin} sx={{ textTransform: "none" }}>Đăng nhập</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
