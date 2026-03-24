import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/src/context';
import { Home, Utensils, Newspaper, ShoppingBag, Calendar, Info, Phone, Menu as MenuIcon, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

const navLinks = [
  { name: 'Accueil', path: '/', icon: Home },
  { name: 'Menu', path: '/menu', icon: Utensils },
  { name: 'Actualités', path: '/news', icon: Newspaper },
  { name: 'Click & Collect', path: '/shop', icon: ShoppingBag },
  { name: 'Réservation', path: '/reservation', icon: Calendar },
  { name: 'À propos', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
];

export const Navbar = () => {
  const { site, setSite } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link 
            to="/" 
            onClick={() => setSite(null)}
            className="flex items-center group"
          >
            <Logo className="h-10 transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative py-2',
                  location.pathname === link.path ? 'text-primary' : 'text-ink/60'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-cream border-b border-black/5 px-4 pt-2 pb-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-4 py-4 text-lg font-medium border-b border-black/5 last:border-0',
                  location.pathname === link.path ? 'text-primary' : 'text-ink/60'
                )}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
