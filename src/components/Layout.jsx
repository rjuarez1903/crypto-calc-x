import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-6 flex col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
