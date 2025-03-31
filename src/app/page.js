"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";



export default function HomePage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <>
      <Navbar cartCount={cart.length} /> {/* Truyền cartCount vào Navbar */}

      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          height: "85vh",
          backgroundImage: 'url("/images/home.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Lớp phủ tối giúp chữ dễ đọc hơn
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" fontWeight="bold">
            𝓯𝓵𝓸𝓻𝓪𝓵 𝓱𝓪𝓿𝓮𝓷
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }} fontStyle={"italic"}>
            "Gửi gắm yêu thương trọn vẹn qua từng đóa hoa, mang đến những khoảnh khắc ý nghĩa." 
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/shop"
            sx={{
              backgroundColor: "#ffcccc",
              "&:hover": {
              backgroundColor: "#e91e63",
              },
            }}
          >
          ĐẶT HOA
          </Button>
        </Box>
      </Box>

      {/* Phần Giới thiệu */}
<Container id="about-section" sx={{ mt: 10, mb: 10 }}>
  {/* Section 1 */}
  <Grid container spacing={6} alignItems="center">
    <Grid item xs={12} md={6}>
      <Image
        src="/images/doahoa.jpg"
        alt="Giới thiệu Floral Haven"
        width={400}
        height={700}
        style={{ borderRadius: "8px", objectFit: "cover", width: "100%",
        transition: "transform 0.3s ease-in-out"
         }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h4" fontWeight="bold" color="#ec407a">
        Thiết kế bó hoa cho riêng bạn
      </Typography>
      <Typography variant="h8" color="#ef6694">
        Floral Heaven – Biến Ý Tưởng Của Bạn Thành Những Bó Hoa Tuyệt Đẹp!
      </Typography>
      <Typography variant="body1" sx={{ mt: 4 }} fontSize={21}>
      Tại Floral Heaven, chúng tôi tin rằng mỗi bó hoa không chỉ đơn thuần là một món quà, mà còn là cách
      thể hiện cảm xúc, phong cách và dấu ấn riêng của mỗi người. Vì vậy, chúng tôi mang đến dịch vụ thiết
      kế bó hoa theo yêu cầu, giúp bạn tạo nên những tác phẩm hoa tươi độc đáo, phù hợp với từng dịp đặc
      biệt.<br/>
      Bạn có thể tùy chọn loại hoa yêu thích, màu sắc phù hợp với sự kiện, cũng như kiểu dáng bó hoa từ đơn
      giản, tinh tế đến sang trọng, lộng lẫy. Đội ngũ chuyên gia cắm hoa của chúng tôi sẽ tư vấn và thiết kế
      dựa trên mong muốn của bạn, đảm bảo mỗi bó hoa đều mang dấu ấn cá nhân. <br/>
      Chúng tôi chỉ sử dụng những bông hoa tươi nhất, được tuyển chọn kỹ lưỡng mỗi ngày, đảm bảo sự rực rỡ và lâu tàn.
      Mỗi bó hoa không chỉ đẹp mắt mà còn tỏa hương thơm nhẹ nhàng, tạo nên sự ấm áp và sang trọng.<br/>
      
      </Typography>
    </Grid>
  </Grid>

  {/* Section 2 */}
  <Grid container spacing={6} alignItems="center" sx={{ mt: 8 }}>
    <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
      <Typography variant="h4" fontWeight="bold" color="#ab47bc">
        Tô màu cho cuộc sống của bạn
      </Typography>
      <Typography variant="h8" fontWeight="bold" color="#bb6bc9">
        Hãy để Floral Heaven giúp bạn tô màu cho cuộc sống!
      </Typography>
      <Typography variant="body1" sx={{ mt: 4 }} fontSize={21}>
      Cuộc sống trở nên rực rỡ hơn khi được tô điểm bởi những sắc hoa tươi thắm. Tại Floral Heaven,
      chúng tôi mang đến những bó hoa đầy màu sắc, không chỉ là món quà trang trí mà còn là cách
      truyền tải cảm xúc và năng lượng tích cực đến những người bạn yêu thương.<br/>
      Mỗi bông hoa mang một ý nghĩa riêng, mỗi màu sắc gợi lên một cung bậc cảm xúc khác nhau.
      Dù là sắc hồng nhẹ nhàng của tình yêu, vàng rực rỡ của niềm vui hay trắng thuần khiết 
      của sự thanh lịch, Floral Heaven giúp bạn chọn lựa những bó hoa phù hợp nhất cho từng khoảnh khắc.<br/>
      Một bó hoa tươi thắm có thể thay lời muốn nói, gói trọn tình cảm chân thành dành cho gia đình, bạn bè, 
      người thân yêu. Mỗi sản phẩm từ Floral Heaven đều được thiết kế cẩn thận, mang đến sự tinh tế 
      và ý nghĩa trong từng cánh hoa.
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
      <Image
        src="/images/doahoa1.jpg"
        alt="Giới thiệu Floral Haven"
        width={400}
        height={700}
        style={{ borderRadius: "8px", objectFit: "cover", width: "100%",
        transition: "transform 0.3s ease-in-out"
         }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </Grid>
  </Grid>
</Container>


      {/* Danh sách sản phẩm */}
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
