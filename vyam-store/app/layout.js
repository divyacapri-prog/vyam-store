import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

export const metadata = {
  title: "VYAM | Everyday Products. Better Ideas.",
  description:
    "Shop VYAM's consumer brands across everyday categories — laundry, beauty, personal care, hair care and pet care."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
