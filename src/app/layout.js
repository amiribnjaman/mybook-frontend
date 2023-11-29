import "./globals.css";
import LayoutComponent from "@/app/layoutComponent";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Mybook - Connect with your beloved.",
  description: "Mybook is a social media application",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
