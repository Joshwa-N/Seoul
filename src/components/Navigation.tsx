import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, Search, User, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-[#1D3557]">
              SEOUL <span className="text-[#F4A261]">&</span> SPICE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#1D3557]'
                    : 'text-[#6C757D] hover:text-[#1D3557]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#A8DADC] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button 
              className="p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#1D3557]" />
            </button>
            
            <button 
              className="hidden sm:block p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-[#1D3557]" />
            </button>

            <Link
              to="/admin"
              className="hidden sm:block p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
              aria-label="Admin Panel"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5 text-[#1D3557]" />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#1D3557]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F4A261] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  className="lg:hidden p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5 text-[#1D3557]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-white">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold text-[#1D3557]">
                      Menu
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                          isActive(link.href)
                            ? 'bg-[#A8DADC]/20 text-[#1D3557]'
                            : 'text-[#6C757D] hover:bg-[#F8F9FA]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto pb-8">
                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#F8F9FA] transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">Shopping Cart</span>
                      {cartCount > 0 && (
                        <span className="ml-auto w-6 h-6 bg-[#F4A261] text-white text-sm font-medium rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
