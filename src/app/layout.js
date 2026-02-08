import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import ChatBot from "./components/ChatBot/ChatBot";
import CustomCursor from "./components/CustomCursor/CustomCursor";

export const metadata = {
  title: "Technova",
  description: "Technova - The Future of Technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            {children}
            <ChatBot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
