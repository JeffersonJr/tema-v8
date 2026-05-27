import { Link, useParams } from '@tanstack/react-router'

export function NotFoundPage() {
  const { tenant } = useParams({ strict: false }) as { tenant?: string }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.03]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <svg
            viewBox="0 0 420 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm md:max-w-md"
            aria-hidden="true"
          >
            {/* Ground / road */}
            <rect x="0" y="268" width="420" height="8" rx="4" fill="#E0DAD0" />

            {/* House body */}
            <rect x="100" y="160" width="160" height="110" rx="4" fill="#EDE8DE" />
            <rect x="100" y="160" width="160" height="110" rx="4" stroke="#C4923A" strokeOpacity="0.3" strokeWidth="1.5" />

            {/* Roof */}
            <path d="M88 168 L180 100 L272 168Z" fill="#1C1916" />
            <path d="M88 168 L180 100 L272 168Z" stroke="#1C1916" strokeWidth="2" strokeLinejoin="round" />

            {/* Chimney */}
            <rect x="210" y="108" width="22" height="36" rx="2" fill="#3D3731" />

            {/* Door */}
            <rect x="158" y="210" width="44" height="60" rx="4" fill="#1C1916" />
            <circle cx="196" cy="244" r="3.5" fill="#EDBF71" />
            {/* Door arch */}
            <path d="M158 214 Q158 204 180 204 Q202 204 202 214" stroke="#EDBF71" strokeWidth="2" fill="none" />

            {/* Windows */}
            <rect x="112" y="186" width="36" height="30" rx="3" fill="white" stroke="#EDBF71" strokeWidth="1.5" />
            <line x1="130" y1="186" x2="130" y2="216" stroke="#EDBF71" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="112" y1="201" x2="148" y2="201" stroke="#EDBF71" strokeWidth="1" strokeOpacity="0.6" />

            <rect x="212" y="186" width="36" height="30" rx="3" fill="white" stroke="#EDBF71" strokeWidth="1.5" />
            <line x1="230" y1="186" x2="230" y2="216" stroke="#EDBF71" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="212" y1="201" x2="248" y2="201" stroke="#EDBF71" strokeWidth="1" strokeOpacity="0.6" />

            {/* For Sale sign on a post */}
            <rect x="285" y="220" width="3" height="48" rx="1.5" fill="#7C7269" />
            <rect x="272" y="202" width="29" height="22" rx="3" fill="#EDBF71" />
            <text x="286" y="212" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white" fontFamily="sans-serif">PARA</text>
            <text x="286" y="219" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="white" fontFamily="sans-serif">VENDA</text>

            {/* Walking realtor figure */}
            <g transform="translate(330, 195)">
              {/* Head */}
              <circle cx="18" cy="12" r="10" fill="#EDE8DE" stroke="#C4923A" strokeWidth="1.5" />
              {/* Hat */}
              <rect x="10" y="4" width="16" height="3" rx="1.5" fill="#1C1916" />
              <rect x="13" y="1" width="10" height="4" rx="1" fill="#1C1916" />
              {/* Body */}
              <rect x="11" y="22" width="14" height="22" rx="3" fill="#1C1916" />
              {/* Tie */}
              <path d="M17 22 L19 22 L20 30 L18 32 L16 30Z" fill="#EDBF71" />
              {/* Briefcase */}
              <rect x="24" y="32" width="14" height="11" rx="2" fill="#7C7269" />
              <rect x="27" y="30" width="8" height="3" rx="1" fill="#7C7269" />
              <line x1="24" y1="37" x2="38" y2="37" stroke="#EDE8DE" strokeWidth="1" strokeOpacity="0.5" />
              {/* Legs - walking pose */}
              <path d="M14 44 L10 68" stroke="#1C1916" strokeWidth="5" strokeLinecap="round" />
              <path d="M22 44 L26 68" stroke="#1C1916" strokeWidth="5" strokeLinecap="round" />
              {/* Shoes */}
              <ellipse cx="10" cy="69" rx="6" ry="3" fill="#3D3731" />
              <ellipse cx="26" cy="69" rx="6" ry="3" fill="#3D3731" />
              {/* Arms */}
              <path d="M11 26 L4 40" stroke="#1C1916" strokeWidth="4" strokeLinecap="round" />
              <path d="M25 26 L38 36" stroke="#1C1916" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Question mark / search bubble */}
            <g transform="translate(355, 170)">
              <ellipse cx="18" cy="14" rx="18" ry="14" fill="white" stroke="#EDBF71" strokeWidth="1.5" />
              <path d="M14 10 C14 8 16 6 18 6 C20 6 22 8 22 10 C22 12 18 13 18 15" stroke="#EDBF71" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="18.5" r="1.5" fill="#EDBF71" />
              {/* bubble tail */}
              <path d="M12 24 L8 30 L16 26Z" fill="white" stroke="#EDBF71" strokeWidth="1" strokeLinejoin="round" />
            </g>

            {/* 404 digits on the road */}
            <text x="210" y="292" textAnchor="middle" fontSize="22" fontWeight="800" fill="#C4923A" fontFamily="Georgia, serif" letterSpacing="4" opacity="0.35">4 0 4</text>
          </svg>
        </div>

        {/* Tag line */}
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Página não encontrada · Verifique o endereço e tente novamente
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-snug">
          Parece que o nosso corretor saiu<br className="hidden md:block" /> para uma visita e{' '}
          <span className="text-gold">levou a página com ele.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Mas não se preocupe, vamos te guiar até o próximo lead. A casa certa está esperando por você!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {tenant ? (
            <>
              <Link
                to="/$tenant"
                params={{ tenant }}
                className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12L12 3L21 12" />
                  <path d="M5 10V20H19V10" />
                </svg>
                Me leva para a Home
              </Link>
              <Link
                to="/$tenant/buscar"
                params={{ tenant }}
                className="btn-outline px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                Buscar imóveis
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12L12 3L21 12" />
                <path d="M5 10V20H19V10" />
              </svg>
              Voltar ao Portal V8
            </Link>
          )}
        </div>

        {/* Quick links */}
        {tenant && (
          <div className="mt-12 pt-8 border-t border-cream-border">
            <p className="text-warm-gray text-xs uppercase tracking-widest mb-4 font-semibold">Ou acesse diretamente</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Lançamentos', to: '/$tenant/lancamentos' as const },
                { label: 'Comprar', to: '/$tenant/buscar' as const, search: { finalidade: 'venda' as const } },
                { label: 'Alugar', to: '/$tenant/buscar' as const, search: { finalidade: 'aluguel' as const } },
                { label: 'Blog', to: '/$tenant/blog' as const },
                { label: 'Contato', to: '/$tenant/contato' as const },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  params={{ tenant }}
                  search={(item as any).search}
                  className="bg-white border border-cream-border text-charcoal-light text-xs px-4 py-2 rounded-full hover:border-gold hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
