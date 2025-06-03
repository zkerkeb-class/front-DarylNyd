import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "NydArt Advisor - AI Art Analysis",
  description: "Get professional feedback on your artwork using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
