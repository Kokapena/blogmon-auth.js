import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import "./globals.css";
import SessionProviderWrapper from './sessionprovider';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <TopBar/>
        <Navbar/>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        <Footer/>
      </body>
    </html>
  );
}