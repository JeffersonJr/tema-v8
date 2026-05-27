import { Link, Outlet, useParams, notFound, useLocation } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle, ChevronDown as ChevDown } from 'lucide-react'
import { getTenantBySlug } from '@/data/tenants'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$tenant')({
  component: RouteComponent,
})

export function RouteComponent() {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const tenant = getTenantBySlug(tenantSlug || '')

  if (!tenant) {
    // If tenant not found, throw standard TanStack Router notFound
    throw notFound()
  }

  return <TenantLayout tenant={tenant} />
}

// Export the component as the default component so TanStack Router automatically registers it
export default RouteComponent

interface TenantLayoutProps {
  tenant: ReturnType<typeof getTenantBySlug> & {}
}

function TenantLayout({ tenant }: TenantLayoutProps) {
  const themeStyles = {
    '--theme-cream': tenant.colors.cream,
    '--theme-cream-dark': tenant.colors.creamDark,
    '--theme-cream-border': tenant.colors.creamBorder,
    '--theme-charcoal': tenant.colors.charcoal,
    '--theme-charcoal-light': tenant.colors.charcoalLight,
    '--theme-warm-gray': tenant.colors.warmGray,
    '--theme-gold': tenant.colors.gold,
    '--theme-gold-light': tenant.colors.goldLight,
  } as React.CSSProperties

  return (
    <div style={themeStyles} className="min-h-screen bg-cream text-charcoal font-sans selection:bg-gold selection:text-white">
      <title>{tenant.name} — {tenant.tagline}</title>
      <link rel="icon" type="image/x-icon" href={tenant.favicon} />
      <Navbar tenant={tenant} />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer tenant={tenant} />
    </div>
  )
}

function Navbar({ tenant }: { tenant: any }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent navbar overlay only on home page of the tenant subsite
  const isHome = location.pathname === `/${tenantSlug}` || location.pathname === `/${tenantSlug}/`

  const navBg = isHome
    ? scrolled
      ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-border'
      : 'bg-transparent'
    : 'bg-cream/95 backdrop-blur-md border-b border-cream-border'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-charcoal'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/$tenant" params={{ tenant: tenantSlug }} className="transition-opacity hover:opacity-80 flex items-center gap-2">
          {tenant.logo.endsWith('.svg') ? (
            <svg 
              className={`h-9 w-auto ${textColor}`}
              viewBox="221 0 169 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M224.313 2.805L227 5.609V40.523V75.437L233 69.5L239 63.563V37.781V12L284.25 12.008C309.837 12.012 332.324 12.456 336 13.029C343.611 14.216 354.755 19.374 360.678 24.451C374.435 36.243 380.475 57.582 375.029 75.145C373.169 81.144 366.628 93 365.178 93C364.811 93 349.096 77.59 330.255 58.755L296 24.511L258.981 61.505C226.516 93.949 222.272 98.539 224.481 98.816L227 99.133V126.262V153.391L224.313 156.195L221.626 159H230.313H239V129.256V99.513L267.744 70.756L296.488 41.999L330.807 76.249L365.126 110.5L372.322 102.929C383.949 90.698 389.29 77.499 389.29 61C389.29 44.18 383.38 30.242 371.054 17.995C365.741 12.716 361.275 9.373 356 6.725C342.977 0.189 341.207 0.037 278.063 0.017L221.626 0L224.313 2.805ZM277.09 93.668L258 113.336V133.363V153.391L255.313 156.195L252.626 159H264H275.374L272.687 156.195L270 153.391V136.068V118.745L282.689 105.623C289.667 98.405 295.855 92.379 296.439 92.231C297.022 92.084 311.651 106.125 328.947 123.435C360.09 154.601 360.377 154.926 358.542 156.953L356.69 159H369.091H381.491L339 116.5C315.63 93.125 296.435 74 296.344 74C296.253 74 287.589 82.851 277.09 93.668Z" 
                fill="currentColor"
              />
            </svg>
          ) : (
            <>
              {/* Logo Mark Branded dynamically with custom variables */}
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-cream font-display font-bold text-lg shadow-sm shrink-0">
                {tenant.name.charAt(0)}
              </div>
              <span className={`font-display text-lg font-bold tracking-tight ${textColor}`}>
                {tenant.name}
              </span>
            </>
          )}
        </Link>

        <div className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textColor} transition-colors`}>
          <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} className="nav-link">Comprar</Link>
          <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'aluguel' }} className="nav-link">Alugar</Link>
          <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="nav-link">Lançamentos</Link>
          <Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} className="nav-link">Anunciar</Link>
          <Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} className="nav-link">Avaliar</Link>
          <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="nav-link">Blog</Link>
          <Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} className="nav-link">Sobre</Link>
          <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="nav-link">Contato</Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <PhoneDropdown tenant={tenant} textColor={textColor} />
          <Link
            to="/$tenant/contato"
            params={{ tenant: tenantSlug }}
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
        <div className="lg:hidden bg-cream border-t border-cream-border max-h-[calc(100vh-5rem)] overflow-y-auto shadow-inner">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Comprar</Link>
            <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'aluguel' }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Alugar</Link>
            <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Lançamentos</Link>
            <Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Anuncie seu Imóvel</Link>
            <Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Avalie seu Imóvel</Link>
            <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Blog</Link>
            <Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Sobre</Link>
            <Link to="/$tenant/ligamos-para-voce" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Ligamos para você</Link>
            <Link to="/$tenant/favoritos" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Favoritos</Link>
            <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2">Contato</Link>
            <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="btn-gold px-5 py-3 rounded-full text-sm font-medium text-center mt-2">
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function PhoneDropdown({ tenant, textColor }: { tenant: any; textColor: string }) {
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
    { label: tenant.contacts.phone, href: `tel:${tenant.contacts.phoneRaw}`, type: 'phone' as const },
    { 
      label: tenant.contacts.whatsapp, 
      href: `https://wa.me/${tenant.contacts.whatsappRaw}?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20preciso%20de%20ajuda%20para%20encontrar%20um%20im%C3%B3vel.`, 
      type: 'whatsapp' as const 
    },
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${p.type === 'whatsapp' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold'}`}>
                {p.type === 'whatsapp' ? <MessageCircle size={14} /> : <Phone size={14} />}
              </div>
              <div>
                <div className="text-charcoal text-sm font-semibold">{p.label}</div>
                <div className="text-warm-gray text-[10px]">{p.type === 'whatsapp' ? 'WhatsApp · Online' : 'Telefone · Comercial'}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Footer({ tenant }: { tenant: any }) {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }

  return (
    <footer className="bg-charcoal text-cream/70 border-t border-cream-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              {tenant.logo.endsWith('.svg') ? (
                <svg 
                  className="h-8 w-auto text-cream"
                  viewBox="221 0 169 160" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M224.313 2.805L227 5.609V40.523V75.437L233 69.5L239 63.563V37.781V12L284.25 12.008C309.837 12.012 332.324 12.456 336 13.029C343.611 14.216 354.755 19.374 360.678 24.451C374.435 36.243 380.475 57.582 375.029 75.145C373.169 81.144 366.628 93 365.178 93C364.811 93 349.096 77.59 330.255 58.755L296 24.511L258.981 61.505C226.516 93.949 222.272 98.539 224.481 98.816L227 99.133V126.262V153.391L224.313 156.195L221.626 159H230.313H239V129.256V99.513L267.744 70.756L296.488 41.999L330.807 76.249L365.126 110.5L372.322 102.929C383.949 90.698 389.29 77.499 389.29 61C389.29 44.18 383.38 30.242 371.054 17.995C365.741 12.716 361.275 9.373 356 6.725C342.977 0.189 341.207 0.037 278.063 0.017L221.626 0L224.313 2.805ZM277.09 93.668L258 113.336V133.363V153.391L255.313 156.195L252.626 159H264H275.374L272.687 156.195L270 153.391V136.068V118.745L282.689 105.623C289.667 98.405 295.855 92.379 296.439 92.231C297.022 92.084 311.651 106.125 328.947 123.435C360.09 154.601 360.377 154.926 358.542 156.953L356.69 159H369.091H381.491L339 116.5C315.63 93.125 296.435 74 296.344 74C296.253 74 287.589 82.851 277.09 93.668Z" 
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-cream font-display font-bold text-base shadow-sm">
                    {tenant.name.charAt(0)}
                  </div>
                  <span className="font-display text-cream text-lg font-bold tracking-tight">
                    {tenant.name}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {tenant.description}
            </p>
            <div className="flex gap-4">
              <a href={tenant.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Instagram">
                <Instagram size={15} />
              </a>
              <a href={tenant.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Facebook">
                <Facebook size={15} />
              </a>
              <a href={tenant.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="YouTube">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Imóveis</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} className="hover:text-gold transition-colors">Comprar</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'aluguel' }} className="hover:text-gold transition-colors">Alugar</Link></li>
              <li><Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Lançamentos</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'cobertura' }} className="hover:text-gold transition-colors">Coberturas</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'casa' }} className="hover:text-gold transition-colors">Casas</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'apartamento' }} className="hover:text-gold transition-colors">Apartamentos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Sobre nós</Link></li>
              <li><Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Contato</Link></li>
              <li><Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Anuncie seu imóvel</Link></li>
              <li><Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Avalie seu imóvel</Link></li>
              <li><Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/$tenant/ligamos-para-voce" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Ligamos para você</Link></li>
              <li><Link to="/$tenant/favoritos" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Favoritos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                {tenant.contacts.phone}
              </li>
              <li className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${tenant.contacts.whatsappRaw}?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20preciso%20de%20ajuda%20para%20encontrar%20um%20im%C3%B3vel.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={14} className="text-gold shrink-0" />
                  {tenant.contacts.whatsapp} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                {tenant.contacts.email}
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold text-cream mb-1">{tenant.contacts.address.city} — {tenant.contacts.address.state}</p>
              <p className="text-xs">{tenant.contacts.address.street}</p>
              <p className="text-xs">{tenant.contacts.address.fullAddress.split(', ').slice(1).join(', ')}</p>
              <p className="text-xs mt-3 text-xs font-semibold text-cream">{tenant.creci}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 {tenant.name}. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Microsistec</a> | <a href="https://microsistec.com.br/site-sistema-para-imobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Modelo V8</a></p>
          <div className="flex gap-6">
            <Link to="/$tenant/politica-de-privacidade" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
