import { useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import CustomCursor from '@/components/custom/CustomCursor';
import Header from '@/components/custom/Header';
import Hero3D from '@/sections/Hero3D';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Portfolio from '@/sections/Portfolio';
import Contact from '@/sections/Contact';
import Footer from '@/components/custom/Footer';
import './App.css';

function App() {
  // Register GSAP plugins on mount
  useEffect(() => {
    // Preload fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Hebrew:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Set page metadata
    document.title = 'GeoPrecision | Surveying & Architecture - Tel Aviv';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tel Aviv\'s premier surveying and architectural firm, delivering millimeter-accurate geospatial data and visionary design solutions for complex urban developments.');
    }

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          {/* Hero Section with 3D */}
          <Hero3D />
          
          {/* About Section */}
          <About />
          
          {/* Services Bento Grid */}
          <Services />
          
          {/* Portfolio Masonry Grid */}
          <Portfolio />
          
          {/* Contact Form */}
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
