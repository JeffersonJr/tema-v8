import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Vero Imóveis — Imóveis de Alto Padrão' },
      {
        name: 'description',
        content:
          'Vero Imóveis: imóveis residenciais e comerciais de alto padrão em São Paulo, Rio de Janeiro, Florianópolis, Curitiba e Belo Horizonte.',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouterState()
  const isHome = router.location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = isHome
    ? scrolled
      ? 'bg-cream/95 backdrop-blur-md shadow-sm'
      : 'bg-transparent'
    : 'bg-cream/95 backdrop-blur-md border-b border-cream-border'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-charcoal'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <img
            src="/logo.png"
            alt="Vero Imóveis"
            className={`h-10 w-auto object-contain transition-all ${isHome && !scrolled ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <div className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textColor} transition-colors`}>
          <Link to="/buscar" search={{ finalidade: 'venda' }} className="nav-link">Comprar</Link>
          <Link to="/buscar" search={{ finalidade: 'aluguel' }} className="nav-link">Alugar</Link>
          <Link to="/lancamentos" className="nav-link">Lançamentos</Link>
          <Link to="/sobre" className="nav-link">Sobre</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+551140028922"
            className={`text-sm font-medium flex items-center gap-2 ${textColor} transition-colors`}
          >
            <Phone size={15} />
            (11) 4002-8922
          </a>
          <Link
            to="/contato"
            className="btn-gold px-5 py-2.5 rounded-full text-sm font-medium"
          >
            Fale Conosco
          </Link>
        </div>

        <button
          className={`lg:hidden ${textColor} transition-colors`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-cream-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link to="/buscar" search={{ finalidade: 'venda' }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Comprar</Link>
            <Link to="/buscar" search={{ finalidade: 'aluguel' }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Alugar</Link>
            <Link to="/lancamentos" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Lançamentos</Link>
            <Link to="/sobre" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Sobre</Link>
            <Link to="/contato" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2">Contato</Link>
            <Link to="/contato" onClick={() => setOpen(false)} className="btn-gold px-5 py-3 rounded-full text-sm font-medium text-center mt-2">
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Vero Imóveis" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Especialistas em imóveis de alto padrão há mais de 23 anos. Encontramos o imóvel ideal para cada momento da sua vida.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Imóveis</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/buscar" search={{ finalidade: 'venda' }} className="hover:text-gold transition-colors">Comprar</Link></li>
              <li><Link to="/buscar" search={{ finalidade: 'aluguel' }} className="hover:text-gold transition-colors">Alugar</Link></li>
              <li><Link to="/lancamentos" className="hover:text-gold transition-colors">Lançamentos</Link></li>
              <li><Link to="/buscar" search={{ tipo: 'cobertura' }} className="hover:text-gold transition-colors">Coberturas</Link></li>
              <li><Link to="/buscar" search={{ tipo: 'casa' }} className="hover:text-gold transition-colors">Casas</Link></li>
              <li><Link to="/buscar" search={{ tipo: 'apartamento' }} className="hover:text-gold transition-colors">Apartamentos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/sobre" className="hover:text-gold transition-colors">Sobre nós</Link></li>
              <li><Link to="/contato" className="hover:text-gold transition-colors">Contato</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Avalie seu imóvel</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                (11) 4002-8922
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                contato@veroimoveis.com.br
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold text-cream mb-1">São Paulo — SP</p>
              <p className="text-xs">Av. Presidente Kennedy, 7000</p>
              <p className="text-xs">Sala 14, São Paulo — SP</p>
              <p className="text-xs mt-3 text-xs font-semibold text-cream">CRECI-SP 28.741-J</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 Vero Imóveis. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
