import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FitLogProvider } from "../context/FitLogContext";

export const metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />

          <main className="site-main">
            {children}
          </main>

          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}