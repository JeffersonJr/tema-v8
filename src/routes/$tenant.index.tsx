import { useTenant } from '@/routes/$tenant'
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

function HeroSearch({ tenant }: { tenant: any }) {
  const navigate = useNavigate()
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const [finalidade, setFinalidade] = useState<'venda' | 'aluguel' | 'lancamento'>('venda')
  const [tipo, setTipo] = useState('')
  const [cidade, setCidade] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [precoRange, setPrecoRange] = useState('')
  const [byCode, setByCode] = useState(false)
  const [code, setCode] = useState('')

  const activeFilters = tenant?.builderSettings?.homeFilters || ['finalidade', 'tipo', 'neighborhood']
  const showFinalidade = activeFilters.includes('finalidade')
  const showTipo = activeFilters.includes('tipo')
  const showCidade = activeFilters.includes('neighborhood')
  const showBedrooms = activeFilters.includes('bedrooms')
  const showPreco = activeFilters.includes('preco')

  const handleSearch = () => {
    if (byCode && code) {
      navigate({ to: '/$tenant/buscar', params: { tenant: tenantSlug || '' }, search: { q: code } })
    } else {
      let pMin = ''
      let pMax = ''
      if (precoRange) {
        const [min, max] = precoRange.split('-')
        pMin = min
        pMax = max
      }
      navigate({
        to: '/$tenant/buscar',
        params: { tenant: tenantSlug || '' },
        search: {
          finalidade: showFinalidade ? finalidade : undefined,
          tipo: showTipo && tipo ? tipo.toLowerCase() : undefined,
          cidade: showCidade && cidade ? cidade.split(' —')[0] : undefined,
          quartos: showBedrooms && bedrooms ? bedrooms : undefined,
          precoMin: showPreco && pMin ? pMin : undefined,
          precoMax: showPreco && pMax ? pMax : undefined,
        },
      })
    }
  }

  // Price options based on finalidade
  const isAluguel = finalidade === 'aluguel'

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-charcoal/20 p-3 max-w-3xl w-full mx-auto text-left border border-cream-border/40">
      {showFinalidade && (
        <div className="flex mb-3 bg-cream rounded-xl p-1">
          {(['venda', 'aluguel', 'lancamento'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFinalidade(f)}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 border-0 cursor-pointer ${
                finalidade === f
                  ? 'bg-charcoal text-cream shadow-sm'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              {f === 'venda' ? 'Comprar' : f === 'aluguel' ? 'Alugar' : 'Lançamentos'}
            </button>
          ))}
        </div>
      )}

      {!byCode ? (
        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 p-1 items-end">
          {showTipo && (
            <div className={`relative ${showCidade || showBedrooms || showPreco ? 'col-span-6 md:col-span-3' : 'col-span-12'}`}>
              <label className="block text-[9px] font-bold text-charcoal uppercase tracking-wider mb-1.5 pl-1">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3 text-xs text-charcoal pr-8 outline-none focus:border-gold"
              >
                <option value="">Tipo de imóvel</option>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 bottom-3 text-warm-gray pointer-events-none" />
            </div>
          )}

          {showCidade && (
            <div className={`relative ${showTipo || showBedrooms || showPreco ? 'col-span-6 md:col-span-3' : 'col-span-12'}`}>
              <label className="block text-[9px] font-bold text-charcoal uppercase tracking-wider mb-1.5 pl-1">Cidade</label>
              <select
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3 text-xs text-charcoal pr-8 outline-none focus:border-gold"
              >
                <option value="">Localização</option>
                {CIDADES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 bottom-3 text-warm-gray pointer-events-none" />
            </div>
          )}

          {showBedrooms && (
            <div className={`relative ${showTipo || showCidade || showPreco ? 'col-span-6 md:col-span-2' : 'col-span-12'}`}>
              <label className="block text-[9px] font-bold text-charcoal uppercase tracking-wider mb-1.5 pl-1">Quartos</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3 text-xs text-charcoal pr-8 outline-none focus:border-gold"
              >
                <option value="">Dormitórios</option>
                <option value="1">1+ Quarto</option>
                <option value="2">2+ Quartos</option>
                <option value="3">3+ Quartos</option>
                <option value="4">4+ Quartos</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 bottom-3 text-warm-gray pointer-events-none" />
            </div>
          )}

          {showPreco && (
            <div className={`relative ${showTipo || showCidade || showBedrooms ? 'col-span-6 md:col-span-2' : 'col-span-12'}`}>
              <label className="block text-[9px] font-bold text-charcoal uppercase tracking-wider mb-1.5 pl-1">Valor</label>
              <select
                value={precoRange}
                onChange={(e) => setPrecoRange(e.target.value)}
                className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3 text-xs text-charcoal pr-8 outline-none focus:border-gold"
              >
                <option value="">Preço</option>
                {isAluguel ? (
                  <>
                    <option value="0-5000">Até R$ 5k</option>
                    <option value="5000-15000">R$ 5k a R$ 15k</option>
                    <option value="15000-30000">R$ 15k a R$ 30k</option>
                    <option value="30000-99999999">Acima de R$ 30k</option>
                  </>
                ) : (
                  <>
                    <option value="0-1000000">Até R$ 1M</option>
                    <option value="1000000-3000000">R$ 1M a R$ 3M</option>
                    <option value="3000000-5000000">R$ 3M a R$ 5M</option>
                    <option value="5000000-999999999">Acima de R$ 5M</option>
                  </>
                )}
              </select>
              <ChevronDown size={14} className="absolute right-3 bottom-3 text-warm-gray pointer-events-none" />
            </div>
          )}

          <div className="col-span-12 md:col-span-2 w-full mt-3 md:mt-0">
            <button
              onClick={handleSearch}
              className="btn-gold flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-semibold whitespace-nowrap border-0 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Search size={14} />
              Buscar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 p-1">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Digite o código do imóvel (ex: VRO-1042)"
              className="w-full bg-cream border border-cream-border rounded-xl pl-9 pr-4 py-3 text-xs text-charcoal placeholder:text-warm-gray/60 focus:border-gold outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-gold flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold border-0 cursor-pointer shadow-md"
          >
            Buscar
          </button>
        </div>
      )}

      <div className="px-4 pt-3 flex justify-between items-center text-[10px] text-warm-gray">
        <button
          onClick={() => setByCode(!byCode)}
          className="hover:text-gold transition-colors flex items-center gap-1.5 bg-transparent border-0 cursor-pointer"
        >
          <Search size={11} />
          {byCode ? 'Buscar por localização/tipo' : 'Buscar por código do imóvel'}
        </button>
      </div>
    </div>
  )
}

function StatsBar() {
  const tenant = useTenant()
  const settings = tenant.builderSettings || {}
  const rawStats = settings.sobreStats
  const parsedStats = rawStats
    ? rawStats.split(/\s*\.\s*/).map((s: string) => {
        const commaIndex = s.indexOf(',')
        if (commaIndex === -1) return { value: s.trim(), label: '' }
        return {
          value: s.substring(0, commaIndex).trim(),
          label: s.substring(commaIndex + 1).trim()
        }
      })
    : [
        { value: 'R$ 2,4 bi', label: 'em imóveis' },
        { value: '1.240+', label: 'imóveis disponíveis' },
        { value: '5 cidades', label: 'de atuação' },
        { value: '23 anos', label: 'de experiência' },
      ]

  const icons = [TrendingUp, Home, MapPin, Award]

  return (
    <div className="bg-charcoal py-10">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {parsedStats.map((s: any, idx: number) => {
          const Icon = icons[idx % icons.length]
          return (
            <div key={idx} className="text-center">
              <Icon size={18} className="text-gold mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-cream mb-1">{s.value}</div>
              <div className="text-cream/50 text-xs uppercase tracking-widest">{s.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeaturedSection() {
  const tenant = useTenant()
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const featured = getFeaturedProperties(tenant.id).slice(0, 3)

  if (featured.length === 0) return null

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 text-left">
        <div>
          <div className="section-title">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Imóveis em Destaque
            </h2>
          </div>
          <p className="text-warm-gray mt-2">Nossa seleção exclusiva de residências contemporâneas e vilas suspensas</p>
        </div>
        <Link
          to="/$tenant/buscar" params={{ tenant: tenantSlug }}
          className="text-gold hover:text-gold-light text-sm font-semibold flex items-center gap-1.5 mt-4 md:mt-0"
        >
          Ver todo o portfólio
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}

function CategorySection() {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const categories = [
    { name: 'Casas Contemporâneas', count: 18, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', slug: 'casa' },
    { name: 'Coberturas Duplex', count: 12, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', slug: 'cobertura' },
    { name: 'Apartamentos de Grife', count: 24, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', slug: 'apartamento' },
  ]

  return (
    <section className="bg-cream-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-title text-left mb-12">
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Categorias de Grife
          </h2>
          <p className="text-warm-gray mt-2">Escolha seu estilo de vida por meio de tipologias assinadas por designers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/$tenant/buscar" params={{ tenant: tenantSlug }}
              search={{ tipo: c.slug }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="font-display text-2xl font-bold text-cream leading-tight">{c.name}</h3>
                <span className="text-cream/60 text-xs mt-1 block">{c.count} imóveis</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function LaunchesTeaser() {
  const tenant = useTenant()
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const launches = getLaunchProperties(tenant.id).slice(0, 2)

  if (launches.length === 0) return null

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={12} />
            Lançamentos Exclusivos
          </div>
          <div className="section-title">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Empreendimentos de Vanguarda
            </h2>
          </div>
          <p className="text-warm-gray text-base leading-relaxed mt-4 mb-8">
            Curadoria especializada de novos projetos residenciais de altíssimo luxo. Arquitetura autoral, materiais nobres e áreas de lazer monumentais prontas para morar ou investir.
          </p>
          <div className="flex gap-4">
            <Link to="/$tenant/lancamentos" params={{ tenant: tenantSlug }} className="btn-gold px-8 py-4 rounded-full text-sm font-semibold border-0 cursor-pointer shadow-md">
              Conhecer Lançamentos
            </Link>
            <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="border border-cream-border text-charcoal hover:border-gold hover:text-gold px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center gap-2">
              Falar com Especialista
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {launches.map((item) => (
            <Link
              key={item.id}
              to="/$tenant/imovel/$id"
              params={{ tenant: tenantSlug, id: item.id }}
              className="bg-white rounded-3xl overflow-hidden border border-cream-border flex p-4 hover:border-gold hover:shadow-lg transition-all duration-300 group text-left"
            >
              <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                />
              </div>
              <div className="p-4 flex flex-col justify-between min-w-0">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-wider font-bold">{item.address.neighborhood}</span>
                  <h4 className="font-display text-lg font-bold text-charcoal truncate mt-0.5">{item.title}</h4>
                  <p className="text-warm-gray text-xs line-clamp-2 mt-1">{item.shortDescription}</p>
                </div>
                <div className="text-xs font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5 mt-2">
                  Ver detalhes
                  <ArrowRight size={14} className="text-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      text: 'O atendimento da Claudia foi excepcional. Comprei minha cobertura nos Jardins de forma rápida e confidencial.',
      author: 'Guilherme Siqueira',
      role: 'CEO & Investidor',
    },
    {
      text: 'Encontrei meu apartamento dos sonhos com o portfólio da Lumina. Eles entendem o real significado de curadoria.',
      author: 'Carolina Braga',
      role: 'Arquiteta Premium',
    },
  ]

  return (
    <section className="bg-cream-dark py-20 border-t border-cream-border">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
            O que dizem nossos clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-cream-border p-8 text-left relative shadow-sm">
              <div className="flex gap-1 text-gold mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-warm-gray text-base leading-relaxed italic mb-6">
                "{t.text}"
              </p>
              <div>
                <div className="font-bold text-charcoal text-sm">{t.author}</div>
                <div className="text-gold text-xs font-medium">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CitiesSection({ tenant }: { tenant: any }) {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const defaultCities = [
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

  const cities = tenant.builderSettings?.citiesList || defaultCities

  return (
    <section className="bg-cream-dark py-20 border-t border-cream-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 text-left">
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
          {cities.map((city: any) => (
            <Link
              key={city.name}
              to="/$tenant/buscar" params={{ tenant: tenantSlug }}
              search={{ cidade: city.name }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm"
            >
              <img
                src={city.image}
                alt={city.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <div className="text-cream font-display font-bold text-base sm:text-lg leading-tight">{city.name}</div>
                <div className="text-cream/60 text-[10px] mt-0.5">{city.count} imóveis</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  const tenant = useTenant()
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const ctaTitle = tenant.builderSettings?.anunciarTitle || 'Quer vender ou alugar seu imóvel?'
  const ctaSubtitle = tenant.builderSettings?.anunciarSubtitle || 'Oferecemos uma assessoria completa e personalizada para a venda ou locação do seu patrimônio imobiliário de luxo em São Paulo.'

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div 
        className="rounded-3xl p-10 md:p-16 text-left relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-cream-border/60"
        style={{ backgroundColor: 'var(--theme-cream-dark)' }}
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
            {ctaTitle}
          </h2>
          <p className="text-warm-gray text-sm md:text-base leading-relaxed">
            {ctaSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <Link
            to="/$tenant/anunciar"
            params={{ tenant: tenantSlug }}
            className="btn-gold px-8 py-4 rounded-full text-xs font-semibold shadow-md whitespace-nowrap text-center"
          >
            Anunciar Imóvel
          </Link>
          <Link
            to="/$tenant/contato"
            params={{ tenant: tenantSlug }}
            className="btn-outline px-8 py-4 rounded-full text-xs font-semibold whitespace-nowrap text-center"
          >
            Fale Conosco
          </Link>
        </div>
      </div>
    </section>
  )
}

function TagsSection() {
  const tenant = useTenant()
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }

  const defaultTags = [
    { label: 'Apartamento em Moema', search: { tipo: 'apartamento', cidade: 'São Paulo' } },
    { label: 'Casa no Jardim Europa', search: { tipo: 'casa', cidade: 'São Paulo' } },
    { label: 'Cobertura em Pinheiros', search: { tipo: 'cobertura', cidade: 'São Paulo' } },
    { label: 'Apartamento no Itaim Bibi', search: { tipo: 'apartamento', cidade: 'São Paulo' } },
    { label: 'Casa no Jardim América', search: { tipo: 'casa', cidade: 'São Paulo' } },
    { label: 'Apartamento de luxo à venda', search: { tipo: 'apartamento', finalidade: 'venda' } },
    { label: 'Cobertura duplex à venda', search: { tipo: 'cobertura', finalidade: 'venda' } },
    { label: 'Casa em condomínio fechado', search: { tipo: 'casa' } },
    { label: 'Apartamento pronto para morar', search: { tipo: 'apartamento' } },
    { label: 'Lançamento em São Paulo', search: { finalidade: 'lancamento', cidade: 'São Paulo' } },
  ]

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Explorar {tenant.name}
          </h2>
          <p className="text-warm-gray text-xs md:text-sm leading-relaxed">
            Encontre os imóveis de luxo mais procurados organizados por bairro, tipologia e características exclusivas.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
          {defaultTags.map((tag, idx) => (
            <Link
              key={idx}
              to="/$tenant/buscar"
              params={{ tenant: tenantSlug }}
              search={tag.search}
              className="bg-white hover:bg-cream-dark text-charcoal-light border border-cream-border/60 hover:border-gold hover:text-gold px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-sm select-none cursor-pointer"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const tenant = useTenant()
  const builderSettings = tenant.builderSettings || {}
  const heroStyle = builderSettings.heroStyle || 'search-centered'
  const heroTitle = builderSettings.heroTitle || tenant.name
  const heroSubtitle = builderSettings.heroSubtitle || tenant.tagline
  const heroImage = builderSettings.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&fit=crop"
  const modules = builderSettings.modules || {
    featured: true,
    categories: true,
    cities: true,
    testimonials: true,
    launches: true,
    blog: true,
  }

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

  const renderHero = () => {
    if (heroStyle === 'split-screen') {
      return (
        <div className="relative min-h-screen flex flex-col lg:flex-row items-stretch bg-slate-950">
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-32 relative z-10 bg-charcoal text-cream text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider self-start">
              ⚡ {tenant.creci || 'Curadoria V8'}
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-5 text-cream">
              {heroTitle}
            </h1>
            <p className="text-cream/80 text-lg mb-8 max-w-xl">
              {heroSubtitle}
            </p>
            <div className="w-full max-w-xl">
              <HeroSearch tenant={tenant} />
            </div>
          </div>
          <div className="flex-1 relative min-h-[40vh] lg:min-h-0">
            <img src={heroImage} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      )
    }

    if (heroStyle === 'video-ambient') {
      return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
              <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
            </div>
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, var(--theme-charcoal) 0%, rgba(28,25,22,0.85) 50%, rgba(28,25,22,0.4) 100%)` }} />
            {/* Ambient gold/accent glow orbs */}
            <div className="absolute top-12 right-20 w-80 h-80 rounded-full opacity-35 filter blur-[100px] animate-pulse pointer-events-none" style={{ backgroundColor: 'var(--theme-gold)' }} />
            <div className="absolute bottom-12 left-20 w-72 h-72 rounded-full opacity-25 filter blur-[80px] pointer-events-none" style={{ backgroundColor: 'var(--theme-gold-light)' }} />
          </div>

          <div className="relative z-10 text-center px-6 pt-20 pb-10 w-full max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-sm">
              ✦ Exclusividade & Prestígio
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-md">
              {heroTitle}
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {heroSubtitle}
            </p>
            <div className="max-w-2xl mx-auto">
              <HeroSearch tenant={tenant} />
            </div>
          </div>
        </div>
      )
    }

    if (heroStyle === 'search-right') {
      return (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
              <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
            </div>
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 px-6 pt-28 pb-14 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
                <Building2 size={13} />
                {tenant.creci || 'Curadoria V8'} · {tenant.tagline}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
                {heroTitle}
              </h1>
              <p className="text-white/75 text-lg mb-6 max-w-xl">
                {heroSubtitle}
              </p>
            </div>
            <div className="lg:col-span-5 w-full">
              <HeroSearch tenant={tenant} />
            </div>
          </div>
        </div>
      )
    }

    if (heroStyle === 'search-left') {
      return (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
              <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
            </div>
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 px-6 pt-28 pb-14 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-5 order-2 lg:order-1 w-full">
              <HeroSearch tenant={tenant} />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 lg:text-right">
              <div className="inline-flex lg:justify-end items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
                <Building2 size={13} />
                {tenant.creci || 'Curadoria V8'} · {tenant.tagline}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
                {heroTitle}
              </h1>
              <p className="text-white/75 text-lg mb-6 max-w-xl lg:ml-auto">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (heroStyle === 'minimalist') {
      return (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
              <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
            </div>
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 text-center px-6 pt-20 pb-10 w-full max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
              <Building2 size={13} />
              {tenant.creci || 'Curadoria V8'} · Curadoria Premium
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              {heroTitle}
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              {heroSubtitle}
            </p>
          </div>
        </div>
      )
    }

    // Default: search-centered
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-[-20%] will-change-transform">
            <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
          </div>
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="relative z-10 text-center px-6 pt-20 pb-10 w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Building2 size={13} />
            {tenant.creci || 'Curadoria V8'} · Destaques Exclusivos
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
            {heroTitle}
          </h1>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
            {heroSubtitle}
          </p>
          <div className="w-full max-w-2xl mx-auto">
            <HeroSearch tenant={tenant} />
          </div>
        </div>
      </div>
    )
  }

  const homeBlocks = builderSettings.homeBlocks || ['stats', 'featured', 'categories', 'launches', 'cities', 'testimonials']

  const renderHomeBlock = (blockId: string) => {
    switch (blockId) {
      case 'stats':
        return <StatsBar key="stats" />
      case 'featured':
        return modules.featured ? <FeaturedSection key="featured" /> : null
      case 'categories':
        return modules.categories ? <CategorySection key="categories" /> : null
      case 'launches':
        return modules.launches ? <LaunchesTeaser key="launches" /> : null
      case 'cities':
        return modules.cities ? <CitiesSection key="cities" tenant={tenant} /> : null
      case 'testimonials':
        return modules.testimonials ? <TestimonialsSection key="testimonials" /> : null
      case 'cta':
        return <CtaSection key="cta" />
      case 'tags':
        return <TagsSection key="tags" />
      default:
        return null
    }
  }

  return (
    <div>
      {/* Dynamic Hero Style */}
      {renderHero()}

      <div>
        {homeBlocks.map((blockId: string) => renderHomeBlock(blockId))}
      </div>
    </div>
  )
}
