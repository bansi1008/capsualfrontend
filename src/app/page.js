import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
