import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute, Link , useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { getLaunchProperties, formatPrice } from '@/data/properties'
import { MapPin, Calendar, BedDouble, Bath, Car, Maximize2, ArrowRight, Check, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/$tenant/lancamentos')({
  component: LancamentosPage,
})

const LAUNCH_STATUS_LABELS = {
  'pre-lancamento': { label: 'Pré-lançamento', color: 'bg-charcoal text-cream' },
  'lancamento': { label: 'Lançamento', color: 'bg-gold text-white' },
  'em-obras': { label: 'Em obras', color: 'bg-charcoal-light text-cream' },
  'pronto': { label: 'Pronto', color: 'bg-green-600 text-white' },
}

const benefits = [
  {
    title: 'Preço de lançamento',
    description: 'Nos lançamentos, você compra pelo menor preço possível. A valorização média é de 20–35% até a entrega.',
  },
  {
    title: 'Condições especiais',
    description: 'Entrada facilitada, parcelamento durante a obra e financiamento bancário na entrega das chaves.',
  },
  {
    title: 'Personalização',
    description: 'Em fases iniciais, é possível escolher acabamentos, modulação e pequenas modificações na planta.',
  },
  {
    title: 'Garantias legais',
    description: 'Todo empreendimento tem garantia estrutural de 5 anos e acabamento de 1 ano conforme o Código Civil.',
  },
]

function LancamentosPage() {

  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const launches = getLaunchProperties(tenant.id)
  const [selectedCity, setSelectedCity] = useState<string>('todos')
  const [selectedStatus, setSelectedStatus] = useState<string>('todos')

  // Filtragem dos lançamentos
  const filteredLaunches = launches.filter((p) => {
    const cityMatch = selectedCity === 'todos' || p.address.city === selectedCity
    const statusMatch = selectedStatus === 'todos' || p.launchStatus === selectedStatus
    return cityMatch && statusMatch
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="bg-charcoal py-20 px-6"
          style={{
            backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(196, 146, 58, 0.15) 0%, transparent 70%)`,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-4">
                <Sparkles size={14} />
                Empreendimentos exclusivos
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-cream leading-tight mb-5">
                Novos<br />Lançamentos
              </h1>
              <p className="text-cream/60 text-base leading-relaxed mb-8 max-w-lg">
                Empreendimentos boutique selecionados a dedo. Arquitetura premiada, localização privilegiada e as melhores condições do mercado.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-gold/20 border border-gold/30 text-gold text-xs px-4 py-2 rounded-full">
                  {launches.length} empreendimentos disponíveis
                </div>
                <div className="bg-cream/10 border border-cream/20 text-cream/70 text-xs px-4 py-2 rounded-full">
                  Valorização média: 20–35%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="bg-cream-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-5 border border-cream-border">
                <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center mb-3">
                  <Check size={16} className="text-gold" />
                </div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{b.title}</h3>
                <p className="text-warm-gray text-xs leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launches Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 border-b border-cream-border pb-6">
          <div>
            <div className="section-title">
              <h2 className="font-display text-4xl font-bold text-charcoal">Empreendimentos</h2>
            </div>
            <p className="text-warm-gray mt-2 text-sm">
              {filteredLaunches.length} {filteredLaunches.length === 1 ? 'projeto selecionado' : 'projetos selecionados'}
            </p>
          </div>

          {/* Filtros de Lançamento Premium */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-warm-gray uppercase tracking-widest">Cidade</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white border border-cream-border rounded-xl px-4 py-2 text-xs font-semibold text-charcoal hover:border-gold focus:border-gold outline-none transition-colors cursor-pointer"
              >
                <option value="todos">Todas as cidades</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Florianópolis">Florianópolis</option>
                <option value="Curitiba">Curitiba</option>
                <option value="Belo Horizonte">Belo Horizonte</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-warm-gray uppercase tracking-widest">Fase da Obra</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white border border-cream-border rounded-xl px-4 py-2 text-xs font-semibold text-charcoal hover:border-gold focus:border-gold outline-none transition-colors cursor-pointer"
              >
                <option value="todos">Todas as fases</option>
                <option value="pre-lancamento">Pré-lançamento</option>
                <option value="lancamento">Lançamento</option>
                <option value="em-obras">Em obras</option>
                <option value="pronto">Pronto</option>
              </select>
            </div>

            {(selectedCity !== 'todos' || selectedStatus !== 'todos') && (
              <button
                onClick={() => {
                  setSelectedCity('todos')
                  setSelectedStatus('todos')
                }}
                className="text-xs text-red-500 hover:text-red-600 transition-colors font-medium self-end py-2.5 cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {filteredLaunches.length > 0 ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {filteredLaunches.map((p, idx) => {
              const statusInfo = p.launchStatus ? LAUNCH_STATUS_LABELS[p.launchStatus] : null

              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-3xl border border-cream-border overflow-hidden flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-[55%] relative overflow-hidden" style={{ minHeight: '360px' }}>
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
                    {statusInfo && (
                      <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    )}
                    {p.deliveryDate && (
                      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                        <Calendar size={14} className="text-gold" />
                        <span className="text-charcoal text-xs font-medium">Entrega: {p.deliveryDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:w-[45%] p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                      <div className="text-gold text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <MapPin size={12} />
                        {p.address.neighborhood} · {p.address.city}/{p.address.state}
                      </div>
                      <span className="bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold/20">
                        Reg. Inc. R.3/{p.code.replace('VRO-', '')}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed mb-6">
                      {p.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-warm-gray mb-6">
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={15} className="text-gold" />
                        {p.bedrooms} {p.bedrooms === 1 ? 'quarto' : 'quartos'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath size={15} className="text-gold" />
                        {p.bathrooms} banheiros
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Car size={15} className="text-gold" />
                        {p.parkingSpaces} vagas
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 size={15} className="text-gold" />
                        {p.area}m²
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.features.slice(0, 4).map((f) => (
                        <span key={f} className="bg-cream text-charcoal text-xs px-3 py-1.5 rounded-full border border-cream-border">
                          {f}
                        </span>
                      ))}
                      {p.features.length > 4 && (
                        <span className="bg-cream text-warm-gray text-xs px-3 py-1.5 rounded-full border border-cream-border">
                          +{p.features.length - 4} mais
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-cream-border">
                      <div>
                        <div className="text-xs text-warm-gray mb-0.5">A partir de</div>
                        <div className="font-display text-2xl font-bold text-charcoal">
                          {formatPrice(p.price)}
                        </div>
                      </div>
                      <Link
                        to="/$tenant/imovel/$id" params={{ tenant: tenantSlug, id: p.id }}
                        className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
                      >
                        Ver detalhes <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Filtros vazios - Empty State Premium */
          <div className="text-center py-20 bg-white border border-cream-border rounded-3xl p-8 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
              <Sparkles size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-3">Nenhum lançamento encontrado</h3>
            <p className="text-warm-gray text-sm leading-relaxed mb-8">
              Não temos empreendimentos disponíveis para a combinação de filtros selecionada neste momento.
            </p>
            <button
              onClick={() => {
                setSelectedCity('todos')
                setSelectedStatus('todos')
              }}
              className="btn-gold px-8 py-3.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              Resetar Filtros
            </button>
          </div>
        )}
      </section>

      {/* Processo */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-title" style={{ textAlign: 'center' }}>
              <h2 className="font-display text-4xl font-bold text-charcoal">
                Como funciona a compra na planta
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Escolha a unidade', desc: 'Apresentamos as plantas disponíveis e ajudamos você a escolher a melhor opção.' },
              { step: '02', title: 'Proposta e negociação', desc: 'Intermediamos a negociação para garantir as melhores condições de pagamento.' },
              { step: '03', title: 'Contrato e entrada', desc: 'Assinatura do contrato com a incorporadora e início do parcelamento da entrada.' },
              { step: '04', title: 'Entrega das chaves', desc: 'Na entrega, você finaliza o financiamento bancário e recebe as chaves do seu imóvel.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-gold font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="font-display font-bold text-charcoal mb-2">{item.title}</h4>
                <p className="text-warm-gray text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-cream mb-4">
            Quer ser avisado sobre<br />novos lançamentos?
          </h2>
          <p className="text-cream/60 mb-8 text-sm">
            Cadastre-se e receba em primeira mão os melhores lançamentos antes do mercado.
          </p>
          <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold">
            Cadastrar interesse <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
