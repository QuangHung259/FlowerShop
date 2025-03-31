import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ProductCard({ product, addToCart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      {/* Ảnh sản phẩm */}
      <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
        <Link href={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Image
            src={product.image}
            alt={product.name}
            width={650}
            height={350}
            style={{
              borderRadius: "12px",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>

        {/* Nút Thêm vào giỏ hàng */}
        <Box
          onClick={() => addToCart(product)}
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ef6694",
            color: "white",
            padding: "8px 16px",
            minWidth: "140px",
            textAlign: "center",
            whiteSpace: "nowrap",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "opacity 0.3s ease-in-out, background-color 0.3s",
            opacity: hovered ? 1 : 0,
            cursor: "pointer",
            "&:hover": { backgroundColor: "#e91e63" },
          }}
        >
          Thêm vào giỏ hàng
        </Box>
      </Box>

      {/* Thông tin sản phẩm */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography color="#388e3c">{product.price} VND</Typography>
      </CardContent>
    </Card>
  );
}
