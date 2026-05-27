import { getTenantBySlug } from '@/data/tenants'
import { Link, createFileRoute, useNavigate , useParams } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import {
  Search,
  ArrowRight,
  ChevronDown,
  Star,
  Award,
  TrendingUp,
  Home,
  Building2,
  Key,
  Sparkles,
  MapPin,
} from 'lucide-react'
import { PropertyCard } from '@/components/PropertyCard'
import { getFeaturedProperties, getLaunchProperties, formatPrice } from '@/data/properties'

export const Route = createFileRoute('/$tenant/')({
  component: HomePage,
})

const TIPOS = ['Apartamento', 'Casa', 'Cobertura', 'Studio', 'Terreno', 'Comercial']
const CIDADES = [
  'São Paulo — SP',
  'Rio de Janeiro — RJ',
  'Florianópolis — SC',
  'Curitiba — PR',
  'Belo Horizonte — MG',
]

function HeroSearch() {
  const navigate = useNavigate()
  const { tenant: tenantSlug } = useParams({ strict: false })
  const [finalidade, setFinalidade] = useState<'venda' | 'aluguel' | 'lancamento'>('venda')
  const [tipo, setTipo] = useState('')
  const [cidade, setCidade] = useState('')
  const [byCode, setByCode] = useState(false)
  const [code, setCode] = useState('')

  const handleSearch = () => {
    if (byCode && code) {
      navigate({ to: '/$tenant/buscar', params: { tenant: tenantSlug || '' }, search: { q: code } })
    } else {
      navigate({
        to: '/$tenant/buscar',
        params: { tenant: tenantSlug || '' },
        search: {
          finalidade,
          tipo: tipo.toLowerCase(),
          cidade: cidade.split(' —')[0],
        },
      })
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-charcoal/20 p-2 max-w-3xl w-full mx-auto">
      <div className="flex mb-2 bg-cream rounded-xl p-1">
        {(['venda', 'aluguel', 'lancamento'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFinalidade(f)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${finalidade === f
                ? 'bg-charcoal text-cream shadow-sm'
                : 'text-warm-gray hover:text-charcoal'
              }`}
          >
            {f === 'venda' ? 'Comprar' : f === 'aluguel' ? 'Alugar' : 'Lançamentos'}
          </button>
        ))}
      </div>

      {!byCode ? (
        <div className="flex flex-col md:flex-row gap-2 p-2">
          <div className="relative flex-1">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3.5 text-sm text-charcoal pr-8"
            >
              <option value="">Tipo de imóvel</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
          </div>
          <div className="relative flex-[2]">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
            <select
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="w-full appearance-none bg-cream border border-cream-border rounded-xl pl-9 pr-8 py-3.5 text-sm text-charcoal"
            >
              <option value="">Cidade ou bairro</option>
              {CIDADES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
          </div>
          <button
            onClick={handleSearch}
            className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap"
          >
            <Search size={16} />
            Buscar
          </button>
        </div>
      ) : (
        <div className="flex gap-2 p-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Digite o código do imóvel (ex: VRO-1042)"
              className="w-full bg-cream border border-cream-border rounded-xl pl-9 pr-4 py-3.5 text-sm text-charcoal placeholder:text-warm-gray/60"
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold"
          >
            Buscar
          </button>
        </div>
      )}

      <div className="px-4 pb-2">
        <button
          onClick={() => setByCode(!byCode)}
          className="text-xs text-warm-gray hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <Search size={11} />
          {byCode ? 'Buscar por localização/tipo' : 'Buscar por código do imóvel'}
        </button>
      </div>
    </div>
  )
}

function StatsBar() {
  const stats = [
    { value: 'R$ 2,4 bi', label: 'em imóveis', icon: TrendingUp },
    { value: '1.240+', label: 'imóveis disponíveis', icon: Home },
    { value: '5 cidades', label: 'de atuação', icon: MapPin },
    { value: '23 anos', label: 'de experiência', icon: Award },
  ]

  return (
    <div className="bg-charcoal py-10">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <s.icon size={18} className="text-gold mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-cream mb-1">{s.value}</div>
            <div className="text-cream/50 text-xs uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedSection() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const featured = getFeaturedProperties(tenant.id)
  const [hero, ...rest] = featured
  const secondary = rest.slice(0, 2)
  const tertiary = rest.slice(2, 5)

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="section-title">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Novidades que merecem o seu olhar
            </h2>
          </div>
          <p className="text-warm-gray mt-2">Imóveis recém-chegados à nossa curadoria premium.</p>
        </div>
        <Link
          to="/$tenant/buscar" params={{ tenant: tenantSlug }}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-gold hover:text-charcoal transition-colors"
        >
          Ver todos <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
        {hero && (
          <div className="lg:col-span-3">
            <Link
              to="/$tenant/imovel/$id" params={{ tenant: tenantSlug, id: hero.id }}
              className="property-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-cream-border h-full"
            >
              <div className="relative overflow-hidden w-full flex-1 min-h-[420px]">
                <img
                  src={hero.images[0]}
                  alt={hero.title}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png'
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider tag-${hero.purpose}`}>
                    {hero.purpose === 'venda' ? 'Venda' : hero.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-gold text-white">
                    Destaque
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="text-white/70 text-xs uppercase tracking-widest mb-1 flex items-center gap-1">
                    <MapPin size={11} />
                    {hero.address.neighborhood}, {hero.address.city}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{hero.title}</h3>
                  <div className="font-display text-2xl font-bold text-gold">
                    {formatPrice(hero.purpose === 'aluguel' ? hero.rentPrice! : hero.price)}
                    {hero.purpose === 'aluguel' && <span className="text-sm font-normal text-white/70">/mês</span>}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="lg:col-span-2 flex flex-col gap-5">
          {secondary.map((p) => (
            <PropertyCard key={p.id} property={p} variant="compact" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tertiary.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/$tenant/buscar" params={{ tenant: tenantSlug }}
          className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
        >
          Ver todos os imóveis <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

function CategorySection() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  const categories = [
    {
      icon: Key,
      title: 'Comprar',
      description: 'Mais de 800 imóveis para venda com os melhores preços e condições.',
      href: '/$tenant/buscar',
      search: { finalidade: 'venda' as const },
      count: '843 imóveis',
      bg: 'bg-charcoal',
      textColor: 'text-cream',
      border: 'border border-transparent',
    },
    {
      icon: Home,
      title: 'Alugar',
      description: 'Locação residencial e comercial com suporte completo de nossa equipe.',
      href: '/$tenant/buscar',
      search: { finalidade: 'aluguel' as const },
      count: '312 imóveis',
      bg: 'bg-cream-dark',
      textColor: 'text-charcoal',
      border: 'border border-charcoal',
    },
    {
      icon: Sparkles,
      title: 'Lançamentos',
      description: 'Empreendimentos exclusivos ainda na planta com as melhores condições.',
      href: '/$tenant/lancamentos',
      search: {},
      count: '18 projetos',
      bg: 'bg-gold',
      textColor: 'text-charcoal',
      border: 'border border-transparent',
    },
  ]

  return (
    <section className="bg-cream-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="section-title mx-auto text-center">
              <h2 className="font-display text-4xl font-bold text-charcoal">
                O que você procura?
              </h2>
            </div>
          </div>
          <p className="text-warm-gray mt-3 max-w-xl mx-auto">
            Do imóvel dos sonhos ao investment perfeito, temos o que você precisa.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href as '/$tenant/buscar' | '/$tenant/lancamentos'}
              params={{ tenant: tenantSlug || '' }}
              search={cat.search}
              className={`${cat.bg} ${cat.textColor} ${cat.border} rounded-2xl p-8 flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg === 'bg-charcoal' ? 'bg-white/10' : cat.bg === 'bg-gold' ? 'bg-charcoal/10' : 'bg-charcoal/8'}`}>
                <cat.icon size={22} className={cat.textColor} />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-widest mb-2 ${cat.bg === 'bg-charcoal' ? 'text-cream/50' : cat.bg === 'bg-gold' ? 'text-charcoal/60' : 'text-warm-gray'}`}>
                  {cat.count}
                </div>
                <h3 className={`font-display text-2xl font-bold mb-2`}>{cat.title}</h3>
                <p className={`text-sm leading-relaxed ${cat.bg === 'bg-charcoal' ? 'text-cream/70' : cat.bg === 'bg-gold' ? 'text-charcoal/70' : 'text-warm-gray'}`}>
                  {cat.description}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all`}>
                Ver imóveis <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function LaunchesTeaser() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const launches = getLaunchProperties(tenant.id)

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="section-title">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Novos Lançamentos
            </h2>
          </div>
          <p className="text-warm-gray mt-2">Empreendimentos exclusivos com as melhores condições</p>
        </div>
        <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="hidden md:flex items-center gap-2 text-sm font-medium text-gold hover:text-charcoal transition-colors">
          Ver todos <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {launches.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Beatriz Almeida',
      role: 'Empresária',
      city: 'São Paulo',
      text: 'A Robles superou todas as minhas expectativas. Encontrei meu apartamento nos Jardins em menos de duas semanas. O atendimento foi impecável do início ao fim.',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    },
    {
      name: 'Fernando Lopes',
      role: 'Diretor de Tecnologia',
      city: 'Rio de Janeiro',
      text: 'Investi em um apartamento na Barra indicado pela equipe Robles. Retorno excelente e toda a burocracia foi resolvida por eles. Recomendo sem hesitar.',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    },
    {
      name: 'Camila Torres',
      role: 'Médica',
      city: 'Florianópolis',
      text: 'Sempre quis morar em Jurerê. A Robles conhecia cada detalhe do mercado local e conseguiu um imóvel perfeito dentro do meu orçamento. Mudança de vida.',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80',
    },
  ]

  return (
    <section className="bg-charcoal py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2 className="font-display text-4xl font-bold text-cream">
              O que dizem nossos clientes
            </h2>
          </div>
          <p className="text-cream/50 mt-3">Na busca pelo imóvel perfeito, cada detalhe faz a diferença. Aqui, você encontra mais do que imóveis exclusivos — você encontra confiança, excelência e uma experiência de compra inesquecível.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-charcoal-light rounded-2xl p-8 border border-cream/8">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-cream/80 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png'
                  }}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-cream text-sm font-semibold">{t.name}</div>
                  <div className="text-cream/40 text-xs">{t.role} · {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-cream-dark rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 text-gold text-sm font-medium mb-4">
              <Award size={16} />
              Avaliação gratuita
            </div>
            <h2 className="font-display text-4xl font-bold text-charcoal mb-3">
              Quer vender ou<br />alugar seu imóvel?
            </h2>
            <p className="text-warm-gray max-w-md">
              Nossa equipe avalia seu imóvel gratuitamente e encontra o comprador ou inquilino certo com rapidez e transparência.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/$tenant/contato" params={{ tenant: tenantSlug }}
              className="btn-gold px-8 py-4 rounded-full text-sm font-semibold text-center"
            >
              Anunciar meu imóvel
            </Link>
            <Link
              to="/$tenant/sobre" params={{ tenant: tenantSlug }}
              className="btn-outline px-8 py-4 rounded-full text-sm font-semibold text-center"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CitiesSection() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  const cities = [
    {
      name: 'Porto Feliz',
      state: 'SP',
      count: 84,
      image: '/porto_feliz.png',
    },
    {
      name: 'Santana de Parnaíba',
      state: 'SP',
      count: 142,
      image: '/santana_parnaiba.png',
    },
    {
      name: 'São Paulo',
      state: 'SP',
      count: 542,
      image: '/sp_ponte.png',
    },
    {
      name: 'São Sebastião',
      state: 'SP',
      count: 78,
      image: '/sao_sebastiao.png',
    },
    {
      name: 'Ubatuba',
      state: 'SP',
      count: 63,
      image: '/ubatuba.png',
    },
  ]

  return (
    <section className="bg-cream-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-title">
              <h2 className="font-display text-4xl font-bold text-charcoal">
                Onde Atuamos
              </h2>
            </div>
            <p className="text-warm-gray mt-2">Presença nos principais mercados imobiliários do Brasil</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              to="/$tenant/buscar" params={{ tenant: tenantSlug }}
              search={{ cidade: city.name }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={city.image}
                alt={city.name}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.png'
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-cream font-display font-bold text-lg leading-tight">{city.name}</div>
                <div className="text-cream/60 text-xs">{city.count} imóveis</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage() {

  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&fit=crop"
              alt="Luxury property"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.png'
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 text-center px-6 pt-20 pb-10 w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <Building2 size={13} />
            Imóveis de alto padrão · 23 anos de mercado
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5 animate-fade-in-up animate-delay-100">
            Imóveis que conquistam<br />
            <span className="text-gold">à primeiro vista.</span>
          </h1>

          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto animate-fade-in-up animate-delay-200">
            Uma curadoria criteriosa para quem busca sofisticação, exclusividade e experiências únicas.
          </p>

          <div className="animate-fade-in-up animate-delay-300">
            <HeroSearch />
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 animate-fade-in-up animate-delay-400">
            <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
              <Sparkles size={14} /> Ver lançamentos
            </Link>
            <span className="text-white/30">·</span>
            <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
              <Search size={14} /> Busca avançada
            </Link>
          </div>
        </div>

        <a
          href="#destaques"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown size={24} />
        </a>
      </div>

      <div id="destaques">
        <StatsBar />
        <FeaturedSection />
        <CategorySection />
        <LaunchesTeaser />
        <CitiesSection />
        <TestimonialsSection />
        <TagsCloudSection />
        <CTASection />
      </div>
    </div>
  )
}

function TagsCloudSection() {
  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const row1 = [
    'Apartamento de Luxo nos Jardins', 'Cobertura Duplex em Ipanema', 'Casa em Condomínio Tamboré',
    'Lançamentos em Pinheiros', 'Imóveis Alto Padrão São Paulo', 'Casas de Luxo em Porto Feliz',
    'Apartamento Vista Mar Leblon', 'Coberturas Sofisticadas Moema', 'Mansão na Fazenda Boa Vista',
    'Studio Design Vila Madalena', 'Imóveis Exclusivos em Jurerê', 'Casas Premium em Curitiba'
  ]

  const row2 = [
    'Comprar Imóvel de Luxo', 'Aluguel de Alto Padrão SP', 'Empreendimentos na Planta',
    'Coberturas Exclusivas RJ', 'Casas de Praia em Ubatuba', 'Condomínio Fechado Alphaville',
    'Apartamento 3 Suítes Higienópolis', 'Lançamentos de Luxo Floripa', 'Residência Contemporânea',
    'Imobiliária de Alto Padrão', 'Curadoria Premium de Imóveis', 'Investimento Imobiliário Seguro'
  ]

  return (
    <section className="bg-cream border-t border-cream-border py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="section-title">
          <h2 className="font-display text-2xl font-bold text-charcoal">
            Explorar {tenant.name}
          </h2>
        </div>
        <p className="text-warm-gray text-xs mt-1">Navegue pelos termos mais buscados e encontre seu próximo endereço exclusivo.</p>
      </div>

      <div className="flex flex-col gap-4 w-full relative">
        {/* Fading Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        {/* Track 1: Left to Right */}
        <div className="flex w-full overflow-hidden relative">
          <div className="animate-marquee flex gap-3 whitespace-nowrap py-1">
            {[...row1, ...row1].map((tag, idx) => (
              <Link
                key={idx}
                to="/$tenant/buscar" params={{ tenant: tenantSlug }}
                search={{ q: tag }}
                className="bg-white border border-cream-border hover:border-gold hover:text-gold text-charcoal-light text-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm inline-block cursor-pointer font-medium"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Track 2: Right to Left */}
        <div className="flex w-full overflow-hidden relative">
          <div className="animate-marquee-reverse flex gap-3 whitespace-nowrap py-1">
            {[...row2, ...row2].map((tag, idx) => (
              <Link
                key={idx}
                to="/$tenant/buscar" params={{ tenant: tenantSlug }}
                search={{ q: tag }}
                className="bg-white border border-cream-border hover:border-gold hover:text-gold text-charcoal-light text-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm inline-block cursor-pointer font-medium"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
