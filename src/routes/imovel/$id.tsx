import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  BedDouble,
  Bath,
  Car,
  Maximize2,
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
  Heart,
  Calendar,
  Sun,
  Building2,
  ArrowLeft,
  Tag,
  Mail,
  X,
} from 'lucide-react'
import { getPropertyById, formatPrice, type Property } from '@/data/properties'
import properties from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'

export const Route = createFileRoute('/imovel/$id')({
  loader: ({ params }) => {
    const property = getPropertyById(params.id)
    if (!property) throw notFound()
    return property
  },
  component: ImovelPage,
})

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  // Keyboard navigation for premium desktop experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, images.length])

  return (
    <div className="flex flex-col gap-3">
      <div 
        onClick={() => setLightboxOpen(true)}
        className="relative rounded-2xl overflow-hidden cursor-zoom-in group shadow-md h-64 sm:h-[480px]"
      >
        <img
          src={images[active]}
          alt={`${title} — foto ${active + 1}`}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.png'
          }}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102"
        />
        
        {/* Subtle magnifying glass button overlay */}
        <div className="absolute top-4 left-4 bg-charcoal/40 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={13} />
          Ampliar Imagem
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer z-10"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        <div className="absolute bottom-4 right-4 bg-charcoal/70 text-cream text-xs px-3 py-1.5 rounded-full z-10">
          {active + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === active ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={img} 
                alt="" 
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.png'
                }}
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen premium Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 select-none animate-fade-in-up duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxOpen(false)
            }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-[110]"
            title="Fechar (Esc)"
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-[110]"
              title="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Expanded Image Container */}
          <div
            className="relative max-w-5xl max-h-[82vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[active]}
              alt={`${title} — ampliada ${active + 1}`}
              onError={(e) => {
                e.currentTarget.src = '/placeholder.png'
              }}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-[110]"
              title="Próxima"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-6 bg-white/10 text-white border border-white/20 text-xs px-4 py-2 rounded-full shadow-md backdrop-blur-sm z-[110]">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}

function ContactForm({ property }: { property: Property }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const whatsappMsg = encodeURIComponent(
    `Olá, gostaria de mais informações sobre o ${property.title} código ${property.code}`
  )

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={24} className="text-gold" />
        </div>
        <h4 className="font-display text-lg font-bold text-charcoal mb-2">Mensagem enviada!</h4>
        <p className="text-warm-gray text-sm">Nosso corretor entrará em contato em breve.</p>
      </div>
    )
  }

  return (
    <div>
      {property.agent && (
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-cream-border">
          <img
            src={property.agent.photo}
            alt={property.agent.name}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.png'
            }}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-charcoal text-sm">{property.agent.name}</div>
            <div className="text-warm-gray text-xs">{property.agent.creci}</div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-5">
        <a
          href={`https://wa.me/5511950338488?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#1ebe5c] transition-colors"
        >
          <MessageCircle size={18} />
          Chamar no WhatsApp
        </a>
        {property.agent && (
          <a
            href={`tel:${property.agent.phone}`}
            className="w-full flex items-center justify-center gap-2 btn-outline py-3.5 rounded-xl text-sm font-semibold"
          >
            <Phone size={16} />
            {property.agent.phone}
          </a>
        )}
      </div>

      <div className="border-t border-cream-border pt-5">
        <p className="text-xs text-warm-gray mb-4 text-center">ou envie uma mensagem</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            type="text"
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60"
          />
          <input
            required
            type="tel"
            placeholder="Telefone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60"
          />
          <input
            required
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60"
          />
          <textarea
            rows={3}
            placeholder="Mensagem (opcional)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60 resize-none"
          />
          <button type="submit" className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold">
            Enviar mensagem
          </button>
        </form>
        <p className="text-[10px] text-warm-gray/60 text-center mt-3">
          Ao enviar você concorda com nossa política de privacidade
        </p>
      </div>
    </div>
  )
}

function LaunchProgress({ status }: { status: Property['launchStatus'] }) {
  const steps = [
    { key: 'pre-lancamento', label: 'Pré-lançamento' },
    { key: 'lancamento', label: 'Lançamento' },
    { key: 'em-obras', label: 'Em obras' },
    { key: 'pronto', label: 'Pronto' },
  ]
  const currentIdx = steps.findIndex((s) => s.key === status)

  return (
    <div className="bg-cream-dark rounded-2xl p-6 mb-6">
      <h3 className="font-display font-bold text-charcoal mb-4 text-sm uppercase tracking-wider">Andamento da obra</h3>
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-cream-border" />
        <div
          className="absolute top-4 left-4 h-0.5 bg-gold transition-all duration-500"
          style={{ width: `${(currentIdx / (steps.length - 1)) * (100 - 8)}%` }}
        />
        <div className="flex justify-between relative">
          {steps.map((step, i) => (
            <div key={step.key} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                i <= currentIdx ? 'bg-gold border-gold text-white' : 'bg-white border-cream-border text-warm-gray'
              }`}>
                {i < currentIdx ? <Check size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className="text-[10px] text-warm-gray text-center leading-tight max-w-16">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ImovelPage() {
  const property = Route.useLoaderData()
  const [saved, setSaved] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Sincronizar com localStorage (somente cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      setSaved(favs.includes(property.id))
    }
  }, [property.id])

  const toggleFavorite = () => {
    if (typeof window !== 'undefined') {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      let newFavs
      if (favs.includes(property.id)) {
        newFavs = favs.filter((id: string) => id !== property.id)
        setSaved(false)
      } else {
        newFavs = [...favs, property.id]
        setSaved(true)
      }
      localStorage.setItem('robles_favoritos', JSON.stringify(newFavs))
    }
  }

  const similar = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.address.city === property.address.city))
    .slice(0, 3)

  const displayPrice = property.purpose === 'aluguel' ? property.rentPrice! : property.price

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-warm-gray mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Início</Link>
          <span>/</span>
          <Link to="/buscar" className="hover:text-gold transition-colors">Imóveis</Link>
          <span>/</span>
          <Link to="/buscar" search={{ cidade: property.address.city }} className="hover:text-gold transition-colors">{property.address.city}</Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-xs">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Gallery images={property.images} title={property.title} />

            {/* Title + Actions */}
            <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider tag-${property.purpose}`}>
                    {property.purpose === 'venda' ? 'Venda' : property.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-cream text-charcoal-light capitalize">
                    {property.type}
                  </span>
                  {property.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold text-white uppercase tracking-wider">
                      Destaque
                    </span>
                  )}
                  {property.isLaunch && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20 uppercase tracking-widest">
                      Reg. Inc. R.3/{property.code.replace('VRO-', '')}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 mt-2 text-warm-gray text-sm">
                  <MapPin size={15} />
                  {property.address.street} · {property.address.neighborhood}, {property.address.city} — {property.address.state}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 relative">
                <button
                  onClick={toggleFavorite}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    saved ? 'bg-red-50 border-red-200 text-red-500' : 'border-cream-border text-warm-gray hover:border-gold hover:text-gold'
                  }`}
                  title={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart size={17} className={saved ? 'fill-red-500' : ''} />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsShareOpen(!isShareOpen)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isShareOpen
                        ? 'bg-gold border-gold text-white'
                        : 'border-cream-border text-warm-gray hover:border-gold hover:text-gold'
                    }`}
                    title="Compartilhar imóvel"
                  >
                    <Share2 size={17} />
                  </button>

                  {isShareOpen && (
                    <>
                      {/* Backdrop transparente para fechar ao clicar fora */}
                      <div
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsShareOpen(false)}
                      />

                      {/* Dropdown de Compartilhamento Premium */}
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 border border-cream-border shadow-xl p-2 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="text-[10px] font-bold text-warm-gray uppercase tracking-widest px-3 py-1.5 border-b border-cream-border mb-1">
                          Compartilhar
                        </div>

                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `Confira este incrível imóvel na Robles Imobiliária: ${property.title}\n\n` +
                              (typeof window !== 'undefined' ? window.location.href : '')
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsShareOpen(false)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-charcoal hover:bg-cream/60 rounded-xl transition-colors cursor-pointer"
                        >
                          <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                            WA
                          </span>
                          <span className="font-medium">WhatsApp</span>
                        </a>

                        {/* E-mail */}
                        <a
                          href={`mailto:?subject=${encodeURIComponent(
                            `Robles Imobiliária — ${property.title}`
                          )}&body=${encodeURIComponent(
                            `Olá! Veja este imóvel de alto padrão incrível que encontrei no site da Robles Imobiliária:\n\n${property.title}\n\nLink do imóvel: ` +
                              (typeof window !== 'undefined' ? window.location.href : '')
                          )}`}
                          onClick={() => setIsShareOpen(false)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-charcoal hover:bg-cream/60 rounded-xl transition-colors cursor-pointer"
                        >
                          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <Mail size={12} />
                          </span>
                          <span className="font-medium">E-mail</span>
                        </a>

                        {/* Telegram */}
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.href : ''
                          )}&text=${encodeURIComponent(property.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsShareOpen(false)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-charcoal hover:bg-cream/60 rounded-xl transition-colors cursor-pointer"
                        >
                          <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                            TG
                          </span>
                          <span className="font-medium">Telegram</span>
                        </a>

                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.href : ''
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsShareOpen(false)}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-charcoal hover:bg-cream/60 rounded-xl transition-colors cursor-pointer"
                        >
                          <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                            FB
                          </span>
                          <span className="font-medium">Facebook</span>
                        </a>

                        {/* Copiar Link */}
                        <button
                          onClick={async () => {
                            if (typeof window !== 'undefined') {
                              try {
                                await navigator.clipboard.writeText(window.location.href)
                                setCopied(true)
                                setTimeout(() => setCopied(false), 2000)
                              } catch (err) {
                                console.error('Failed to copy', err)
                              }
                            }
                            setIsShareOpen(false)
                          }}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-charcoal hover:bg-cream/60 rounded-xl transition-colors cursor-pointer text-left font-medium"
                        >
                          <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                            <Share2 size={12} />
                          </span>
                          <span>Copiar Link</span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* Popover de confirmação de cópia */}
                  {copied && (
                    <div className="absolute right-0 top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50 whitespace-nowrap animate-in fade-in slide-in-from-top-1">
                      Link copiado!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: BedDouble, label: 'Quartos', value: `${property.bedrooms}` },
                { icon: Bath, label: 'Banheiros', value: `${property.bathrooms}` },
                { icon: Car, label: 'Vagas', value: `${property.parkingSpaces}` },
                { icon: Maximize2, label: 'Área privativa', value: `${property.area}m²` },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 text-center border border-cream-border">
                  <stat.icon size={20} className="mx-auto text-gold mb-2" />
                  <div className="font-display text-xl font-bold text-charcoal">{stat.value}</div>
                  <div className="text-xs text-warm-gray mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.totalArea && (
                <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                  <Maximize2 size={16} className="text-warm-gray shrink-0" />
                  <div>
                    <div className="text-xs text-warm-gray">Área total</div>
                    <div className="text-sm font-semibold text-charcoal">{property.totalArea}m²</div>
                  </div>
                </div>
              )}
              {property.floor && (
                <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                  <Building2 size={16} className="text-warm-gray shrink-0" />
                  <div>
                    <div className="text-xs text-warm-gray">Andar</div>
                    <div className="text-sm font-semibold text-charcoal">{property.floor}º de {property.totalFloors}</div>
                  </div>
                </div>
              )}
              {property.sunPosition && (
                <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                  <Sun size={16} className="text-warm-gray shrink-0" />
                  <div>
                    <div className="text-xs text-warm-gray">Posição solar</div>
                    <div className="text-sm font-semibold text-charcoal">{property.sunPosition}</div>
                  </div>
                </div>
              )}
              {property.yearBuilt && (
                <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                  <Calendar size={16} className="text-warm-gray shrink-0" />
                  <div>
                    <div className="text-xs text-warm-gray">Ano de construção</div>
                    <div className="text-sm font-semibold text-charcoal">{property.yearBuilt}</div>
                  </div>
                </div>
              )}
              <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                <Tag size={16} className="text-warm-gray shrink-0" />
                <div>
                  <div className="text-xs text-warm-gray">Código</div>
                  <div className="text-sm font-semibold text-charcoal">{property.code}</div>
                </div>
              </div>
              {property.furnished && (
                <div className="bg-cream-dark rounded-xl p-3 flex items-center gap-3">
                  <Check size={16} className="text-warm-gray shrink-0" />
                  <div>
                    <div className="text-xs text-warm-gray">Mobiliado</div>
                    <div className="text-sm font-semibold text-charcoal capitalize">
                      {property.furnished === 'sim' ? 'Sim' : property.furnished === 'semi' ? 'Parcialmente' : 'Não'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Sobre o imóvel</h2>
              <div className="text-warm-gray text-sm leading-relaxed space-y-3">
                {property.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Diferenciais & Comodidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {property.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 py-2">
                    <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-gold" />
                    </div>
                    <span className="text-sm text-charcoal">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Costs */}
            {(property.condo || property.iptu) && (
              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Custos mensais</h2>
                <div className="bg-white rounded-2xl border border-cream-border p-6">
                  <div className="space-y-3">
                    {property.purpose !== 'lancamento' && (
                      <div className="flex justify-between items-center py-2 border-b border-cream-border">
                        <span className="text-sm text-warm-gray">
                          {property.purpose === 'aluguel' ? 'Aluguel' : 'Valor de venda'}
                        </span>
                        <span className="font-display font-bold text-charcoal text-lg">
                          {formatPrice(displayPrice)}
                          {property.purpose === 'aluguel' && <span className="text-xs font-normal text-warm-gray">/mês</span>}
                        </span>
                      </div>
                    )}
                    {property.condo && (
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray">Condomínio</span>
                        <span className="text-charcoal font-medium">{formatPrice(property.condo)}/mês</span>
                      </div>
                    )}
                    {property.iptu && (
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray">IPTU</span>
                        <span className="text-charcoal font-medium">{formatPrice(property.iptu)}/mês</span>
                      </div>
                    )}
                    {property.purpose === 'aluguel' && property.condo && property.iptu && (
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-cream-border">
                        <span className="text-charcoal">Total mensal</span>
                        <span className="font-display text-lg text-charcoal">
                          {formatPrice(displayPrice + property.condo + property.iptu)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="mt-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Localização</h2>
              <div className="bg-cream-dark rounded-2xl overflow-hidden h-72 flex items-center justify-center border border-cream-border relative group shadow-sm">
                <img
                  src="/mapa.png"
                  alt="Mapa de Localização"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png'
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/10" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    <MapPin size={22} className="text-white" />
                  </div>
                  <div className="mt-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-cream-border shadow-md text-center max-w-xs animate-fade-in-up">
                    <p className="text-charcoal font-semibold text-sm leading-tight">{property.address.neighborhood}</p>
                    <p className="text-warm-gray text-xs mt-0.5">{property.address.city} — {property.address.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Sticky Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-cream-border p-6 mb-5">
                {property.isLaunch && property.launchStatus && (
                  <LaunchProgress status={property.launchStatus} />
                )}
                <div className="mb-1 text-xs text-warm-gray uppercase tracking-widest">
                  {property.purpose === 'aluguel' ? 'Valor mensal' : 'Valor de venda'}
                </div>
                <div className="font-display text-3xl font-bold text-charcoal mb-1">
                  {formatPrice(displayPrice)}
                </div>
                {property.purpose === 'aluguel' && (
                  <div className="text-xs text-warm-gray mb-1">por mês · + condomínio e IPTU</div>
                )}
                {property.isLaunch && property.deliveryDate && (
                  <div className="flex items-center gap-1.5 text-xs text-gold mt-1">
                    <Calendar size={13} />
                    Entrega: {property.deliveryDate}
                  </div>
                )}
                {(property.condo || property.iptu) && (
                  <div className="mt-3 pt-3 border-t border-cream-border text-xs text-warm-gray space-y-1">
                    {property.condo && <div className="flex justify-between"><span>Condomínio</span><span>{formatPrice(property.condo)}/mês</span></div>}
                    {property.iptu && property.iptu > 0 && <div className="flex justify-between"><span>IPTU</span><span>{formatPrice(property.iptu)}/mês</span></div>}
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl border border-cream-border p-6">
                <h3 className="font-display text-lg font-bold text-charcoal mb-4">Falar com corretor</h3>
                <ContactForm property={property} />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-16 pt-12 border-t border-cream-border">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="section-title">
                  <h2 className="font-display text-3xl font-bold text-charcoal">
                    Imóveis similares
                  </h2>
                </div>
              </div>
              <Link
                to="/buscar"
                search={{ tipo: property.type }}
                className="text-sm text-gold hover:text-charcoal flex items-center gap-1 transition-colors"
              >
                Ver mais <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
