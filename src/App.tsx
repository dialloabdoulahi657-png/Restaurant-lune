import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context';
import { Navbar } from './components/Navbar';
import { SiteSelector } from './components/SiteSelector';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { NewsPage } from './pages/News';
import { Shop } from './pages/Shop';
import { Checkout } from './pages/Checkout';
import { Reservation } from './pages/Reservation';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Toaster } from 'sonner';
import { Logo } from './components/Logo';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Input } from './components/UI';
import { ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { site, setSite } = useApp();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {!isAdminPage && <SiteSelector currentSite={site} onSelect={setSite} />}
      {!isAdminPage && <Navbar />}
      
      <main className={!isAdminPage ? 'min-h-screen' : ''}>
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
          <Route path="/news" element={<PageWrapper><NewsPage /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
          <Route path="/reservation" element={<PageWrapper><Reservation /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      
      {!isAdminPage && (
        <>
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl"
              >
                <ChevronUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
          <footer className="bg-ink text-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="col-span-2">
                <div className="flex items-center mb-6">
                  <Logo className="h-10" color="white" />
                </div>
                <p className="text-cream/40 max-w-sm leading-relaxed">
                  L'excellence culinaire au cœur d'Abidjan. Une invitation au voyage à travers nos saveurs et notre design.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
                <ul className="space-y-4 text-cream/60">
                  <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                  <li><Link to="/reservation" className="hover:text-primary transition-colors">Réservation</Link></li>
                  <li><Link to="/shop" className="hover:text-primary transition-colors">Click & Collect</Link></li>
                  <li><Link to="/admin" className="hover:text-primary transition-colors">Espace Gérant</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Nos Établissements</h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-primary mb-2 font-bold">LUNE Marcory</h5>
                    <p className="text-cream/40 text-xs leading-relaxed">
                      Zone 4, Rue du Canal<br />
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-primary mb-2 font-bold">LUNE Bingerville</h5>
                    <p className="text-cream/40 text-xs leading-relaxed">
                      Quartier Résidentiel<br />
                      Bingerville, Côte d'Ivoire
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-cream/20 font-bold">Ouvert 7j/7 • 07h - 23h</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-8 border-t border-white/5 text-center text-cream/20 text-xs">
              &copy; {new Date().getFullYear()} Lune Restaurant & Coffee Shop. Tous droits réservés.
            </div>
          </div>
        </footer>
      </>
    )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
