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
    '--theme-font-sans': tenant.fonts?.sans || 'DM Sans',
    '--theme-font-display': tenant.fonts?.display || 'Playfair Display',
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
  const headerStyle = tenant.builderSettings?.headerStyle || 'classic'
  const headerFixed = tenant.builderSettings?.headerFixed !== false
  const pages = tenant.builderSettings?.pages || { blog: true, launches: true, contact: true, sobre: true, anunciar: true, avaliar: false }

  // Classes for the nav wrapper based on options and scrolling
  let navClasses = "z-50 transition-all duration-300 "
  
  // Position style (Fixed vs Static)
  if (headerFixed) {
    navClasses += "fixed top-0 left-0 right-0 "
  } else {
    navClasses += "relative "
  }

  // Header visual styles (transparent, minimal, classic)
  let navInnerClasses = "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between transition-all duration-300 "
  let textColor = "text-charcoal"
  let navStyleBg = "bg-cream/95 backdrop-blur-md border-b border-cream-border shadow-sm"

  if (headerStyle === 'transparent') {
    if (isHome) {
      if (scrolled) {
        navStyleBg = "bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm"
        textColor = "text-charcoal"
      } else {
        navStyleBg = "bg-transparent border-b-0 shadow-none"
        textColor = "text-white"
      }
    } else {
      if (scrolled) {
        navStyleBg = "bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm"
      } else {
        navStyleBg = "bg-cream-dark/95 border-b border-cream-border"
      }
      textColor = "text-charcoal"
    }
  } else if (headerStyle === 'minimal') {
    navStyleBg = "bg-white border-b border-slate-200 shadow-sm"
    textColor = "text-slate-800"
  } else if (headerStyle === 'classic') {
    // Elegant luxury with double borderline or bottom accent
    navStyleBg = "bg-cream border-b-4 border-double border-gold/40 shadow-sm"
    textColor = "text-charcoal"
  }

  return (
    <nav className={`${navClasses} ${navStyleBg}`}>
      <div className={navInnerClasses}>
        <Link to="/$tenant" params={{ tenant: tenantSlug }} className="transition-opacity hover:opacity-80 flex items-center gap-2">
          {(() => {
            const isDarkBg = isHome && !scrolled && headerStyle === 'transparent';
            const logoSrc = isDarkBg && tenant.builderSettings?.logoLight ? tenant.builderSettings.logoLight : tenant.logo;
            const shouldInvertLogo = isDarkBg && !tenant.builderSettings?.logoLight && tenant.logo;
            
            if (logoSrc && (logoSrc.startsWith('data:image') || logoSrc.endsWith('.png') || logoSrc.endsWith('.jpg') || logoSrc.endsWith('.jpeg') || logoSrc.endsWith('.svg'))) {
              return <img src={logoSrc} className={`h-10 w-auto object-contain transition-all ${shouldInvertLogo ? 'brightness-0 invert' : ''}`} alt="Logo" />;
            }
            if (tenant.logo && tenant.logo.endsWith('.svg')) {
              return (
                <svg 
                  className={`h-[58px] w-auto ${textColor}`}
                  viewBox="0 0 595 407" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M224.313 2.805L227 5.609V40.523V75.437L233 69.5L239 63.563V37.781V12L284.25 12.008C309.837 12.012 332.324 12.456 336 13.029C343.611 14.216 354.755 19.374 360.678 24.451C374.435 36.243 380.475 57.582 375.029 75.145C373.169 81.144 366.628 93 365.178 93C364.811 93 349.096 77.59 330.255 58.755L296 24.511L258.981 61.505C226.516 93.949 222.272 98.539 224.481 98.816L227 99.133V126.262V153.391L224.313 156.195L221.626 159H230.313H239V129.256V99.513L267.744 70.756L296.488 41.999L330.807 76.249L365.126 110.5L372.322 102.929C383.949 90.698 389.29 77.499 389.29 61C389.29 44.18 383.38 30.242 371.054 17.995C365.741 12.716 361.275 9.373 356 6.725C342.977 0.189 341.207 0.037 278.063 0.017L221.626 0L224.313 2.805ZM277.09 93.668L258 113.336V133.363V153.391L255.313 156.195L252.626 159H264H275.374L272.687 156.195L270 153.391V136.068V118.745L282.689 105.623C289.667 98.405 295.855 92.379 296.439 92.231C297.022 92.084 311.651 106.125 328.947 123.435C360.09 154.601 360.377 154.926 358.542 156.953L356.69 159H369.091H381.491L339 116.5C315.63 93.125 296.435 74 296.344 74C296.253 74 287.589 82.851 277.09 93.668ZM136.186 223.118C119.29 225.929 105.974 239.669 101.896 258.5C100.044 267.052 100.277 285.059 102.343 293C107.588 313.165 119.693 324.614 138.569 327.263C158.017 329.992 176.393 320.629 184.228 304C189.761 292.255 191.464 274.069 188.422 259.208C184.281 238.976 171.618 226.053 153 223.06C145.616 221.873 143.628 221.88 136.186 223.118ZM539 222.936C533.379 224.203 530.468 225.65 526.454 229.174C521.695 233.353 519.05 239.122 519.022 245.384C518.988 252.83 520.933 257.765 526.147 263.47C531.63 269.47 537.532 272.826 556.116 280.511C563.47 283.552 571.886 287.633 574.819 289.581C583.613 295.419 586.207 304.199 581.75 313.038C574.926 326.57 554.044 324.562 529.525 308.017C525.297 305.164 521.634 303.033 521.386 303.281C521.137 303.529 521.062 308.958 521.217 315.346L521.5 326.959L527.828 322.955L534.157 318.952L540.328 321.983C561.664 332.463 583.676 328.074 592.228 311.634C595.227 305.869 595.228 295.134 592.231 289.372C587.952 281.146 578.423 274.715 559.168 267.059C535.577 257.679 529.995 252.94 530.004 242.3C530.015 228.278 543.575 223.818 561 232.106C565.125 234.067 572.473 238.671 577.328 242.336C582.183 246.001 586.346 249 586.578 249C586.81 249 587 243.561 587 236.914V224.828L580.588 228.414C577.061 230.386 573.701 232 573.122 232C572.543 232 569.916 230.634 567.285 228.965C559.325 223.916 546.645 221.213 539 222.936ZM0 224.487C0 224.891 1.8 227.372 4 230L8 234.778V274.417V314.057L4.986 320.029L1.971 326H15.554H29.136L27.176 323.25C26.098 321.738 24.267 319.643 23.108 318.595C21.105 316.785 21 315.745 21 297.716V278.742L26.25 279.411C40.448 281.218 48.067 289.238 53.102 307.677C55.731 317.305 58.135 322.174 61.607 324.905C66.135 328.467 74.716 327.181 76.754 322.636C77.58 320.794 77.215 320.221 74.106 318.469C70.999 316.719 69.939 315.054 66.441 306.427C59.442 289.163 53.435 282.433 41.5 278.484C40.031 277.998 41.542 277.228 47.196 275.58C59.915 271.874 67.915 265.356 70.532 256.568C73.18 247.676 71.93 240.268 66.797 234.422C59.826 226.482 53.281 224.94 23.75 224.281C10.688 223.99 0 224.082 0 224.487ZM219.101 225.75C219.842 226.713 221.922 229.189 223.724 231.253L227 235.006V274.031V313.057L224 319C222.35 322.269 221 325.222 221 325.564C221 325.905 231.688 326.009 244.75 325.794C266.202 325.442 269.081 325.19 274.5 323.194C287.954 318.238 294.017 310.283 293.978 297.636C293.963 292.889 293.342 289.148 292.122 286.461C289.611 280.934 282.303 274.768 275.538 272.468L269.934 270.563L275.365 267.817C294.953 257.913 291.994 232.702 270.559 226.87C263.074 224.833 253.621 224.066 235.628 224.033C218.757 224.002 217.831 224.098 219.101 225.75ZM326.379 229.409L331 234.819V273.816V312.814L328.042 319.407L325.084 326H357.542H390V312.3C390 296.598 390.801 296.767 380.484 310.298L373.467 319.5L358.734 319.777L344 320.053V277.987C344 238.87 344.131 235.66 345.872 232.21C346.901 230.17 348.056 227.488 348.439 226.25L349.135 224H335.446H321.757L326.379 229.409ZM417 224.556C417 224.878 418.8 227.276 421 229.885L425 234.629V274.343V314.057L421.986 320.029L418.971 326H452.986H487V314.786C487 305.417 486.782 303.812 485.678 305.036C484.951 305.841 481.746 309.538 478.556 313.25L472.756 320H455.378H438V299V278H450.091H462.182L466.341 281.563L470.5 285.127L470.788 275.435C470.946 270.104 470.825 265.492 470.519 265.186C470.214 264.88 468.265 266.288 466.189 268.315L462.416 272H450.208H438V251V230H452.401H466.802L473.397 237.25L479.991 244.5L479.746 234.5L479.5 224.5L448.25 224.236C431.063 224.09 417 224.235 417 224.556ZM140.5 227.634C131.189 229.945 124.513 235.081 120.484 243.031C116.034 251.814 114.646 259.393 114.631 275C114.615 290.966 116.001 298.413 120.746 307.859C130.304 326.887 156.703 328.146 168.141 310.119C173.052 302.379 175.124 294.002 175.714 279.5C176.766 253.677 170.589 236.812 157.823 230.649C152.55 228.103 144.356 226.677 140.5 227.634ZM21 252.148V274.296L30.021 273.712C49.063 272.478 58.925 264.198 58.978 249.398C59.003 242.416 56.749 238.095 51.094 234.284C46.164 230.962 41.647 230.012 30.75 230.006L21 230V252.148ZM239 249.128V268.257L249.915 267.807C259.024 267.432 261.63 266.946 265.665 264.87C272.086 261.567 274.961 256.572 274.984 248.684C275.021 235.495 267.178 230 248.318 230H239V249.128ZM239.231 297.126L239.5 320.5L250 320.358C255.775 320.28 262.345 319.719 264.599 319.11C276.716 315.841 282.785 304.914 279.982 291.413C277.559 279.74 269.362 274.918 250.731 274.203L238.963 273.752L239.231 297.126ZM362.15 370C361.228 372.644 361.328 373 362.995 373C364.737 373 368 369.595 368 367.777C368 367.35 366.919 367 365.598 367C363.828 367 362.92 367.789 362.15 370ZM107 391C107 405.333 107.089 406 109 406C110.911 406 111 405.333 111 391C111 376.667 110.911 376 109 376C107.089 376 107 376.667 107 391ZM130 391C130 405.244 130.099 406 131.965 406C133.772 406 133.953 405.176 134.215 395.75L134.5 385.5L140 395.735C143.025 401.364 145.766 405.976 146.09 405.985C146.415 405.993 149.115 401.504 152.09 396.009L157.5 386.017L157.785 396.009C158.068 405.914 158.091 406 160.562 406H163.053L162.777 391.25C162.516 377.349 162.384 376.483 160.492 376.212C158.865 375.979 157.345 378.02 152.492 386.956C149.196 393.024 146.275 397.986 146 397.982C145.725 397.979 142.886 393.032 139.69 386.988C135.348 378.776 133.39 376 131.94 376C130.106 376 130 376.821 130 391ZM188.45 377.407C184.322 379.205 180.224 384.291 179.41 388.626C177.852 396.931 184.022 405.281 192.676 406.579C197.863 407.357 205.2 404.146 208.448 399.677C211.306 395.744 211.285 387.207 208.408 383.323C203.398 376.562 195.658 374.267 188.45 377.407ZM227.667 376.667C227.3 377.033 227 383.823 227 391.755V406.177L237.967 405.838C250.679 405.446 252.188 404.623 252.362 397.988C252.448 394.708 251.957 393.384 250.099 391.879C247.887 390.088 247.837 389.837 249.364 388.151C252.9 384.243 250.801 378.594 245.238 377.049C241.082 375.895 228.708 375.626 227.667 376.667ZM269 391C269 405.333 269.089 406 271 406C272.911 406 273 405.333 273 391C273 376.667 272.911 376 271 376C269.089 376 269 376.667 269 391ZM292 391V406H302.5C312.333 406 313 405.873 313 404C313 402.157 312.333 402 304.5 402H296V389C296 376.667 295.897 376 294 376C292.089 376 292 376.667 292 391ZM328 391C328 405.333 328.089 406 330 406C331.911 406 332 405.333 332 391C332 376.667 331.911 376 330 376C328.089 376 328 376.667 328 391ZM357.755 384.75C355.159 389.563 351.457 396.313 349.527 399.75L346.019 406H348.484C350.211 406 351.413 405.102 352.5 403C354.046 400.009 354.079 400 362.904 400H371.757L373 403C373.905 405.185 374.912 406 376.705 406C378.059 406 379.017 405.581 378.833 405.069C377.984 402.697 363.44 376.034 362.987 376.018C362.704 376.008 360.35 379.938 357.755 384.75ZM393.667 376.667C393.3 377.033 393 383.783 393 391.667V406H395.5C397.917 406 398 405.778 398 399.336V392.672L404.903 399.336C410.566 404.804 412.396 406 415.093 406H418.381L412.94 401.045C409.948 398.32 407.163 396.07 406.75 396.045C404.67 395.92 406.359 394 408.55 394C411.811 394 416.576 391.547 417.379 389.455C419.593 383.684 416.685 378.408 410.5 376.975C405.85 375.897 394.641 375.692 393.667 376.667ZM435 391C435 405.333 435.089 406 437 406C438.911 406 439 405.333 439 391C439 376.667 438.911 376 437 376C435.089 376 435 376.667 435 391ZM463.544 386.817C460.318 392.693 456.584 399.413 455.245 401.75L452.81 406H455.379C457.223 406 458.387 405.152 459.5 403C461.046 400.009 461.079 400 469.904 400H478.757L480 403C480.905 405.185 481.912 406 483.705 406C485.059 406 486.017 405.657 485.833 405.238C484.309 401.755 470.73 376.951 470.151 376.594C469.742 376.341 466.769 380.941 463.544 386.817ZM190.388 380.929C184.291 383.54 181.911 393.075 186.045 398.331C188.659 401.654 193.878 403.149 198.455 401.885C209.652 398.793 208.092 381.685 196.5 380.45C194.3 380.216 191.55 380.431 190.388 380.929ZM398 384.884V390L404.25 389.985C411.62 389.967 413.25 389.161 413.25 385.539C413.25 381.582 411.711 380.64 404.497 380.181L398 379.767V384.884ZM232 384.454V388H238.378C245.462 388 248.294 386.281 246.338 383.166C245.568 381.941 243.533 381.422 238.646 381.204L232 380.909V384.454ZM466.708 389.522C465.219 392.559 464 395.259 464 395.522C464 395.785 466.738 396 470.083 396C473.429 396 476.014 395.663 475.828 395.25C474.717 392.794 469.921 384 469.691 384C469.54 384 468.198 386.485 466.708 389.522ZM359.517 389.967C358.133 392.698 357 395.173 357 395.467C357 395.76 359.7 396 363 396C366.3 396 369 395.729 369 395.397C369 394.204 363.483 385.002 362.767 385.001C362.364 385 360.901 387.235 359.517 389.967ZM232 397V402H238.8C246.307 402 248 401.049 248 396.835C248 393.182 245.572 392 238.066 392H232V397Z" 
                    fill="currentColor"
                  />
                </svg>
              );
            }
            return (
              <>
                <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center overflow-hidden text-cream font-display font-bold text-lg shadow-sm shrink-0">
                  {tenant.marcaDagua ? (
                    <img src={tenant.marcaDagua} className="w-full h-full object-cover" />
                  ) : (
                    tenant.name.charAt(0)
                  )}
                </div>
                <span className={`font-display text-lg font-bold tracking-tight ${textColor}`}>
                  {tenant.name}
                </span>
              </>
            );
          })()}
        </Link>

        <div className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textColor} transition-colors`}>
          <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} className="nav-link">Comprar</Link>
          <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'aluguel' }} className="nav-link">Alugar</Link>
          {pages.launches && <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="nav-link">Lançamentos</Link>}
          {pages.anunciar && <Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} className="nav-link">Anunciar</Link>}
          {pages.avaliar && <Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} className="nav-link">Avaliar</Link>}
          {pages.blog && <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="nav-link">Blog</Link>}
          {pages.sobre && <Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} className="nav-link">Sobre</Link>}
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
            {pages.launches && <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Lançamentos</Link>}
            {pages.anunciar && <Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Anuncie seu Imóvel</Link>}
            {pages.avaliar && <Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Avalie seu Imóvel</Link>}
            {pages.blog && <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Blog</Link>}
            {pages.sobre && <Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} onClick={() => setOpen(false)} className="text-charcoal font-medium py-2 border-b border-cream-border">Sobre</Link>}
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

  const footerStyle = tenant.builderSettings?.footerStyle || 'simple'
  const pages = tenant.builderSettings?.pages || {
    blog: true,
    launches: true,
    contact: true,
    sobre: true,
    anunciar: true,
    avaliar: true,
  }

  // Choose logo based on background (light vs dark)
  const isDarkFooter = footerStyle !== 'column-grid';
  const logoSrc = isDarkFooter && tenant.builderSettings?.logoLight ? tenant.builderSettings.logoLight : tenant.logo;
  const shouldInvertLogo = isDarkFooter && !tenant.builderSettings?.logoLight && tenant.logo;

  const logoEl = logoSrc ? (
    <img src={logoSrc} className={`h-10 w-auto object-contain transition-all ${shouldInvertLogo ? 'brightness-0 invert' : ''}`} alt="Logo" />
  ) : (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center overflow-hidden text-cream font-display font-bold text-base shadow-sm">
        {tenant.marcaDagua ? (
          <img src={tenant.marcaDagua} className="w-full h-full object-cover" />
        ) : (
          tenant.name.charAt(0)
        )}
      </div>
      <span className="font-display text-cream text-lg font-bold tracking-tight">
        {tenant.name}
      </span>
    </div>
  )

  const copyrightAndCredits = (
    <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
      <p>© 2026 {tenant.name}. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Microsistec</a> e <a href="https://microsistec.com.br/site-sistema-para-imobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Evolves Tecnologia</a></p>
      <div className="flex gap-6">
        <Link to="/$tenant/politica-de-privacidade" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Política de Privacidade</Link>
      </div>
    </div>
  )

  if (footerStyle === 'minimal') {
    return (
      <footer className="bg-charcoal text-cream/60 border-t border-cream-border transition-all">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-semibold text-cream">{tenant.name}</span>
              <span>CRECI: {tenant.creci}</span>
              <span>© 2026. Powered by Microsistec e Evolves Tecnologia</span>
            </div>
            <div className="flex gap-4">
              <a href={tenant.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href={tenant.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Facebook">
                <Facebook size={16} />
              </a>
              <a href={tenant.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (footerStyle === 'detailed') {
    return (
      <footer className="bg-charcoal text-cream/70 border-t border-cream-border transition-all">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {logoEl}
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                {tenant.description || tenant.tagline || 'Curadoria exclusiva de imóveis assinados de altíssimo padrão.'}
              </p>
              <div className="text-xs font-mono opacity-80">CRECI: {tenant.creci}</div>
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
            <div className="space-y-6">
              <h4 className="text-cream text-sm font-semibold uppercase tracking-widest border-b border-cream/10 pb-2">Contato & Localização</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-gold shrink-0" />
                  <span>{tenant.contacts.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/${tenant.contacts.whatsappRaw}?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20preciso%20de%20ajuda%20para%20encontrar%20um%20im%C3%B3vel.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors flex items-center gap-3"
                  >
                    <MessageCircle size={16} className="text-gold shrink-0" />
                    <span>{tenant.contacts.whatsapp} (WhatsApp)</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-gold shrink-0" />
                  <span>{tenant.contacts.email}</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-cream/5 text-xs space-y-1">
                <p className="font-semibold text-cream">{tenant.contacts.address.city} — {tenant.contacts.address.state}</p>
                <p>{tenant.contacts.address.street}</p>
                <p className="opacity-85">{tenant.contacts.address.fullAddress.split(', ').slice(1).join(', ')}</p>
              </div>
            </div>
          </div>
          {copyrightAndCredits}
        </div>
      </footer>
    )
  }

  if (footerStyle === 'modern-newsletter') {
    return (
      <footer className="bg-charcoal text-cream/70 border-t border-cream-border transition-all">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                {logoEl}
              </div>
              <p className="text-xs max-w-sm leading-relaxed">
                {tenant.description || 'Uma boutique de curadoria para clientes exigentes.'}
              </p>
              <div className="text-[10px] font-semibold text-cream">CRECI: {tenant.creci}</div>
            </div>
            
            <div className="lg:col-span-2 bg-charcoal-light/35 border border-cream/15 p-6 rounded-2xl space-y-4">
              <h4 className="text-cream text-base font-display font-semibold tracking-tight">Assine nossa Curadoria Digital</h4>
              <p className="text-xs">Receba em primeira mão oportunidades de moradia e lançamentos de grife antes do mercado.</p>
              <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Seu melhor e-mail..." required className="flex-1 bg-charcoal border border-cream/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold" />
                <button type="submit" className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold border-0 cursor-pointer shadow-md">Receber Avisos</button>
              </form>
            </div>
          </div>
          {copyrightAndCredits}
        </div>
      </footer>
    )
  }

  if (footerStyle === 'column-grid') {
    return (
      <footer className="bg-cream-dark text-charcoal-light border-t border-cream-border transition-all">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <h4 className="text-charcoal text-sm font-bold uppercase tracking-wider">Sobre Nós</h4>
              <p className="text-sm leading-relaxed opacity-85">
                {tenant.description || 'Nossa missão é esculpir experiências imobiliárias e assessorar clientes de alto padrão na escolha do seu próximo endereço.'}
              </p>
              <div className="flex gap-4 pt-2">
                <a href={tenant.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Instagram">
                  <Instagram size={16} />
                </a>
                <a href={tenant.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Facebook">
                  <Facebook size={16} />
                </a>
                <a href={tenant.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="YouTube">
                  <Youtube size={16} />
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-charcoal text-sm font-bold uppercase tracking-wider">Nossos Serviços</h4>
              <ul className="space-y-2 text-sm flex flex-col">
                <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} className="hover:underline hover:text-gold transition-colors">Venda de Residências Altíssimo Padrão</Link>
                <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'aluguel' }} className="hover:underline hover:text-gold transition-colors">Locação Exclusiva de Luxo</Link>
                {pages.launches && <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="hover:underline hover:text-gold transition-colors">Lançamentos de Grife na Planta</Link>}
                <Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} className="hover:underline hover:text-gold transition-colors">Assessoria de Venda de Imóveis</Link>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-charcoal text-sm font-bold uppercase tracking-wider">Atendimento</h4>
              <p className="text-sm opacity-85 leading-relaxed">
                {tenant.builderSettings?.openingHours || 'Segunda a Sexta das 9h às 18h · Sábados das 9h às 13h'}
              </p>
              <div className="text-xs font-semibold text-charcoal border-t border-cream-border pt-4">
                CRECI: {tenant.creci || 'CRECI-J Ativo'}
              </div>
            </div>
          </div>
          
          <div className="border-t border-cream-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-75">
            <p>© 2026 {tenant.name}. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Microsistec</a> e <a href="https://microsistec.com.br/site-sistema-para-imobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Evolves Tecnologia</a></p>
            <div className="flex gap-6">
              <Link to="/$tenant/politica-de-privacidade" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (footerStyle === 'brand-glow') {
    return (
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-16 transition-all relative overflow-hidden">
        {/* Soft amber radial gradient for elegant glowing effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-gold/5 rounded-full filter blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-10">
          <div className="flex flex-col items-center space-y-4">
            {logoEl}
            <p className="text-xs uppercase tracking-widest text-gold/80 font-semibold">{tenant.tagline || 'Curadoria de Moradia Exclusiva'}</p>
          </div>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold text-zinc-300">
            <Link to="/$tenant" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Home</Link>
            <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ finalidade: 'venda' }} className="hover:text-gold transition-colors">Comprar</Link>
            {pages.launches && <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Lançamentos</Link>}
            {pages.sobre && <Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Sobre Nós</Link>}
            <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Contato</Link>
          </div>
          
          <div className="flex gap-4">
            <a href={tenant.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Instagram">
              <Instagram size={14} />
            </a>
            <a href={tenant.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="Facebook">
              <Facebook size={14} />
            </a>
            <a href={tenant.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" title="YouTube">
              <Youtube size={14} />
            </a>
          </div>
          
          <div className="w-full border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500">
            <p>© 2026 {tenant.name}. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Microsistec</a> e <a href="https://microsistec.com.br/site-sistema-para-imobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">Evolves Tecnologia</a></p>
            <div className="flex gap-6">
              <span>CRECI: {tenant.creci}</span>
              <Link to="/$tenant/politica-de-privacidade" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Default 'simple': Robles standard
  return (
    <footer className="bg-charcoal text-cream/70 border-t border-cream-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              {logoEl}
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
              {pages.launches && <li><Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Lançamentos</Link></li>}
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'cobertura' }} className="hover:text-gold transition-colors">Coberturas</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'casa' }} className="hover:text-gold transition-colors">Casas</Link></li>
              <li><Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} search={{ tipo: 'apartamento' }} className="hover:text-gold transition-colors">Apartamentos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-sm font-semibold uppercase tracking-widest mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm">
              {pages.sobre && <li><Link to="/$tenant/sobre" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Sobre nós</Link></li>}
              <li><Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Contato</Link></li>
              {pages.anunciar && <li><Link to="/$tenant/anunciar" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Anuncie seu imóvel</Link></li>}
              {pages.avaliar && <li><Link to="/$tenant/avaliar" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Avalie seu imóvel</Link></li>}
              {pages.blog && <li><Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Blog</Link></li>}
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
              <p className="text-xs mt-3 text-xs font-semibold text-cream">CRECI: {tenant.creci}</p>
            </div>
          </div>
        </div>
        {copyrightAndCredits}
      </div>
    </footer>
  )
}
