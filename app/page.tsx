import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import AppPreview from "./components/AppPreview";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <AppPreview />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
