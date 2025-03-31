"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { Container, Typography, Box } from "@mui/material";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // ✅ Import Navbar từ Material UI

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Navbar /> {/* ✅ Đảm bảo Navbar hiển thị trên trang */}
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h5" color="error">Sản phẩm không tồn tại</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar /> {/* ✅ Thêm Navbar vào trang chi tiết sản phẩm */}
      <Container sx={{ mt: 10 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            style={{ borderRadius: "12px", objectFit: "cover" }}
          />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" color="success">
            {product.price.toLocaleString()} VND
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: "600px", textAlign: "center" }}>
            {product.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
}
