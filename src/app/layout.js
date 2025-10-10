import "./globals.css";
import LayoutComponent from "@/app/layoutComponent";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "K'nect - Connect with a new world.",
  description: "K'nect is a social network application",
};

export default function RootLayout({ children }) {

  return (
    <html lang="bn">
      <body>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
