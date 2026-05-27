import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle, ChevronDown as ChevDown } from 'lucide-react'

import '../styles.css'
import { NotFoundPage } from '../components/NotFoundPage'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Robles Imobiliária — Imóveis de Alto Padrão' },
      {
        name: 'description',
        content:
          'Robles Imobiliária: imóveis residenciais e comerciais de alto padrão em São Paulo, Rio de Janeiro, Florianópolis, Curitiba e Belo Horizonte.',
      },
      { name: 'generator', content: 'Microsistec CRM (https://microsistec.com.br) & Developed by Evolves Tecnologia (https://evolves.site)' },
      { name: 'author', content: 'Jefferson Campos Beira Junior (https://github.com/JeffersonJr)' },
      { name: 'template-author', content: 'Jefferson Campos Beira Junior' },
      { name: 'template-author-profile', content: 'https://github.com/JeffersonJr' },
      { name: 'template-model', content: 'Modelo V8' },
      { name: 'crm', content: 'Microsistec' },
      { name: 'crm-url', content: 'https://microsistec.com.br' },
      { name: 'developer', content: 'Evolves Tecnologia' },
      { name: 'developer-url', content: 'https://evolves.site' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        {/* 
          CRM: Microsistec (https://microsistec.com.br)
          Desenvolvido por: Evolves Tecnologia (https://evolves.site)
          Template: Modelo V8 desenvolvido por Jefferson Campos Beira Junior (https://github.com/JeffersonJr)
        */}
      </head>
      <body>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.microsistecCRM = { name: "Microsistec CRM", website: "https://microsistec.com.br", version: "V8" };
              window.developedBy = { name: "Evolves Tecnologia", website: "https://evolves.site" };
              window.templateSignature = { author: "Jefferson Campos Beira Junior", profile: "https://github.com/JeffersonJr", model: "V8" };
            `
          }}
        />
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
            alt="Robles Imobiliária"
            className={`h-10 w-auto object-contain transition-all ${isHome && !scrolled ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <div className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textColor} transition-colors`}>
          <Link to="/buscar" search={{ finalidade: 'venda' }} className="nav-link">Comprar</Link>
          <Link to="/buscar" search={{ finalidade: 'aluguel' }} className="nav-link">Alugar</Link>
          <Link to="/lancamentos" className="nav-link">Lançamentos</Link>
          <Link to="/anunciar" className="nav-link">Anunciar</Link>
          <Link to="/avaliar" className="nav-link">Avaliar</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/sobre" className="nav-link">Sobre</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <PhoneDropdown textColor={textColor} />
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
            <Link to="/anunciar" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Anuncie seu Imóvel</Link>
            <Link to="/avaliar" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Avalie seu Imóvel</Link>
            <Link to="/blog" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Blog</Link>
            <Link to="/sobre" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Sobre</Link>
            <Link to="/favoritos" onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Favoritos</Link>
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

function PhoneDropdown({ textColor }: { textColor: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const phones = [
    { label: '(11) 3568-2495', href: 'tel:+551135682495', type: 'phone' as const },
    { label: '(11) 95033-8488', href: 'https://wa.me/5511950338488?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20preciso%20de%20ajuda%20para%20encontrar%20um%20im%C3%B3vel.', type: 'whatsapp' as const },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`text-sm font-medium flex items-center gap-1.5 ${textColor} transition-colors group`}
      >
        <Phone size={14} />
        Contato
        <ChevDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-cream-border rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
          <div className="px-4 py-2.5 bg-cream-dark border-b border-cream-border">
            <span className="text-[10px] font-semibold text-warm-gray uppercase tracking-widest">Fale conosco</span>
          </div>
          {phones.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target={p.type === 'whatsapp' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-cream transition-colors border-b border-cream-border last:border-0"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                p.type === 'whatsapp' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold'
              }`}>
                {p.type === 'whatsapp' ? <MessageCircle size={14} /> : <Phone size={14} />}
              </div>
              <div>
                <div className="text-charcoal text-sm font-semibold">{p.label}</div>
                <div className="text-warm-gray text-[10px]">{p.type === 'whatsapp' ? 'WhatsApp · Resposta imediata' : 'Telefone · Seg–Sex 9h–19h'}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Robles Imobiliária" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Especialistas em imóveis de alto padrão há mais de 23 anos. Encontramos o imóvel ideal para cada momento da sua vida.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/roblesimobiliaria/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://www.facebook.com/roblesimobiliariasp/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Facebook">
                <Facebook size={15} />
              </a>
              <a href="https://www.youtube.com/channel/UCK65kTIZ4SxbnkskBPCfoEw" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="YouTube">
                <Youtube size={15} />
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
              <li><Link to="/anunciar" className="hover:text-gold transition-colors">Anuncie seu imóvel</Link></li>
              <li><Link to="/avaliar" className="hover:text-gold transition-colors">Avalie seu imóvel</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/ligamos-para-voce" className="hover:text-gold transition-colors">Ligamos para você</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                (11) 3568-2495
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                claudia@roblesimobiliariasp.com.br
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold text-cream mb-1">São Paulo — SP</p>
              <p className="text-xs">Avenida das Nações Unidas, nº 14171</p>
              <p className="text-xs">Marble Tower, Vila Gertrudes, São Paulo - SP</p>
              <p className="text-xs mt-3 text-xs font-semibold text-cream">CRECI-SP 28.741-J</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 Robles Imobiliária. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Microsistec</a> | <a href="https://microsistec.com.br/site-sistema-para-imobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Modelo V8</a></p>
          <div className="flex gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-gold transition-colors">Política de Privacidade</Link>
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
