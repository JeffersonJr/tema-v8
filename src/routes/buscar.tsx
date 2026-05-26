import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { SlidersHorizontal, Search, X, ChevronDown, Grid2X2, List, MapPin } from 'lucide-react'
import { PropertyCard } from '@/components/PropertyCard'
import properties, { formatPrice } from '@/data/properties'
import type { Property } from '@/data/properties'

export type BuscarSearch = {
  finalidade: string
  tipo: string
  cidade: string
  bairro: string
  quartos: string
  precoMin: string
  precoMax: string
  q: string
  ordem: string
}

export const Route = createFileRoute('/buscar')({
  validateSearch: (search: Record<string, unknown>): BuscarSearch => ({
    finalidade: (search.finalidade as string) || '',
    tipo: (search.tipo as string) || '',
    cidade: (search.cidade as string) || '',
    bairro: (search.bairro as string) || '',
    quartos: (search.quartos as string) || '',
    precoMin: (search.precoMin as string) || '',
    precoMax: (search.precoMax as string) || '',
    q: (search.q as string) || '',
    ordem: (search.ordem as string) || 'relevancia',
  }),
  component: BuscarPage,
})

const TIPOS = ['apartamento', 'casa', 'cobertura', 'studio', 'terreno', 'comercial']
const CIDADES_LIST = ['São Paulo', 'Rio de Janeiro', 'Florianópolis', 'Curitiba', 'Belo Horizonte']
const FAIXAS_PRECO_VENDA = [
  { label: 'Até R$ 500 mil', min: 0, max: 500000 },
  { label: 'R$ 500 mil a R$ 1 mi', min: 500000, max: 1000000 },
  { label: 'R$ 1 mi a R$ 2 mi', min: 1000000, max: 2000000 },
  { label: 'R$ 2 mi a R$ 5 mi', min: 2000000, max: 5000000 },
  { label: 'Acima de R$ 5 mi', min: 5000000, max: Infinity },
]
const FAIXAS_PRECO_ALUGUEL = [
  { label: 'Até R$ 5 mil', min: 0, max: 5000 },
  { label: 'R$ 5 mil a R$ 10 mil', min: 5000, max: 10000 },
  { label: 'R$ 10 mil a R$ 20 mil', min: 10000, max: 20000 },
  { label: 'R$ 20 mil a R$ 40 mil', min: 20000, max: 40000 },
  { label: 'Acima de R$ 40 mil', min: 40000, max: Infinity },
]

function filterProperties(props: Property[], params: BuscarSearch): Property[] {
  return props.filter((p) => {
    if (params.q) {
      const q = params.q.toLowerCase()
      const matches =
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.address.neighborhood.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (params.finalidade && p.purpose !== params.finalidade) return false
    if (params.tipo && p.type !== params.tipo) return false
    if (params.cidade && !p.address.city.toLowerCase().includes(params.cidade.toLowerCase())) return false
    if (params.bairro && !p.address.neighborhood.toLowerCase().includes(params.bairro.toLowerCase())) return false
    if (params.quartos && Number(params.quartos) > 0 && p.bedrooms < Number(params.quartos)) return false

    const price = p.purpose === 'aluguel' ? (p.rentPrice || 0) : p.price
    if (params.precoMin && price < Number(params.precoMin)) return false
    if (params.precoMax && price > Number(params.precoMax)) return false

    return true
  })
}

function sortProperties(props: Property[], ordem: string): Property[] {
  const sorted = [...props]
  switch (ordem) {
    case 'menor-preco':
      return sorted.sort((a, b) => {
        const pa = a.purpose === 'aluguel' ? (a.rentPrice || 0) : a.price
        const pb = b.purpose === 'aluguel' ? (b.rentPrice || 0) : b.price
        return pa - pb
      })
    case 'maior-preco':
      return sorted.sort((a, b) => {
        const pa = a.purpose === 'aluguel' ? (a.rentPrice || 0) : a.price
        const pb = b.purpose === 'aluguel' ? (b.rentPrice || 0) : b.price
        return pb - pa
      })
    case 'maior-area':
      return sorted.sort((a, b) => b.area - a.area)
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-charcoal pr-8"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
      </div>
    </div>
  )
}

function ActiveFilters({
  params,
  onRemove,
}: {
  params: z.infer<typeof searchSchema>
  onRemove: (key: string) => void
}) {
  const chips: { key: string; label: string }[] = []
  if (params.finalidade) chips.push({ key: 'finalidade', label: params.finalidade === 'venda' ? 'Comprar' : params.finalidade === 'aluguel' ? 'Alugar' : 'Lançamento' })
  if (params.tipo) chips.push({ key: 'tipo', label: params.tipo.charAt(0).toUpperCase() + params.tipo.slice(1) })
  if (params.cidade) chips.push({ key: 'cidade', label: params.cidade })
  if (params.bairro) chips.push({ key: 'bairro', label: params.bairro })
  if (params.quartos) chips.push({ key: 'quartos', label: `${params.quartos}+ quartos` })
  if (params.precoMin) chips.push({ key: 'precoMin', label: `A partir de ${formatPrice(Number(params.precoMin))}` })
  if (params.precoMax) chips.push({ key: 'precoMax', label: `Até ${formatPrice(Number(params.precoMax))}` })
  if (params.q) chips.push({ key: 'q', label: `"${params.q}"` })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => onRemove(chip.key)}
          className="flex items-center gap-1.5 bg-charcoal text-cream text-xs px-3 py-1.5 rounded-full hover:bg-charcoal-light transition-colors"
        >
          {chip.label}
          <X size={11} />
        </button>
      ))}
    </div>
  )
}

function BuscarPage() {
  const navigate = useNavigate({ from: '/buscar' })
  const params = Route.useSearch()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const isAluguel = params.finalidade === 'aluguel'
  const priceRanges = isAluguel ? FAIXAS_PRECO_ALUGUEL : FAIXAS_PRECO_VENDA

  const updateParam = (key: string, value: string) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value }) })
  }

  const removeParam = (key: string) => {
    navigate({ search: (prev) => ({ ...prev, [key]: '' }) })
  }

  const resetAll = () => {
    navigate({ search: {} })
  }

  const filtered = useMemo(() => {
    const f = filterProperties(properties, params)
    return sortProperties(f, params.ordem)
  }, [params])

  const Sidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg font-bold text-charcoal">Filtros</h3>
        <button onClick={resetAll} className="text-xs text-gold hover:underline">Limpar tudo</button>
      </div>

      <FilterSelect
        label="Finalidade"
        value={params.finalidade}
        onChange={(v) => updateParam('finalidade', v)}
        options={[
          { value: '', label: 'Todos' },
          { value: 'venda', label: 'Comprar' },
          { value: 'aluguel', label: 'Alugar' },
          { value: 'lancamento', label: 'Lançamento' },
        ]}
      />

      <FilterSelect
        label="Tipo"
        value={params.tipo}
        onChange={(v) => updateParam('tipo', v)}
        options={[
          { value: '', label: 'Todos os tipos' },
          ...TIPOS.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })),
        ]}
      />

      <FilterSelect
        label="Cidade"
        value={params.cidade}
        onChange={(v) => updateParam('cidade', v)}
        options={[
          { value: '', label: 'Todas as cidades' },
          ...CIDADES_LIST.map((c) => ({ value: c, label: c })),
        ]}
      />

      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Bairro</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input
            type="text"
            value={params.bairro}
            onChange={(e) => updateParam('bairro', e.target.value)}
            placeholder="Ex: Ipanema, Moema..."
            className="w-full bg-cream border border-cream-border rounded-xl pl-9 pr-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Quartos (mínimo)</label>
        <div className="flex gap-2">
          {['', '1', '2', '3', '4', '5'].map((q) => (
            <button
              key={q}
              onClick={() => updateParam('quartos', q)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                params.quartos === q
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-cream border-cream-border text-charcoal hover:border-gold'
              }`}
            >
              {q === '' ? 'Qts' : q === '5' ? '5+' : q}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Faixa de Preço</label>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => {
                updateParam('precoMin', range.min.toString())
                if (range.max !== Infinity) updateParam('precoMax', range.max.toString())
                else updateParam('precoMax', '')
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                params.precoMin === range.min.toString()
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-cream border-cream-border text-charcoal hover:border-gold'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Buscar por Código</label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input
            type="text"
            value={params.q}
            onChange={(e) => updateParam('q', e.target.value)}
            placeholder="Ex: VRO-1042"
            className="w-full bg-cream border border-cream-border rounded-xl pl-9 pr-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/60"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-cream-dark border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-1">
            {params.finalidade === 'venda'
              ? 'Imóveis para Comprar'
              : params.finalidade === 'aluguel'
              ? 'Imóveis para Alugar'
              : params.finalidade === 'lancamento'
              ? 'Lançamentos'
              : 'Todos os Imóveis'}
          </h1>
          <p className="text-warm-gray text-sm">
            {filtered.length} {filtered.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            {params.cidade && ` em ${params.cidade}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-cream-border p-6 sticky top-28">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-cream-border rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal"
              >
                <SlidersHorizontal size={16} />
                Filtros
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <div className="relative">
                  <select
                    value={params.ordem}
                    onChange={(e) => updateParam('ordem', e.target.value)}
                    className="appearance-none bg-white border border-cream-border rounded-xl px-4 py-2.5 text-sm text-charcoal pr-8"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                    <option value="maior-area">Maior área</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
                </div>

                <div className="flex border border-cream-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-charcoal text-cream' : 'bg-white text-warm-gray hover:text-charcoal'}`}
                  >
                    <Grid2X2 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-charcoal text-cream' : 'bg-white text-warm-gray hover:text-charcoal'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <ActiveFilters params={params} onRemove={removeParam} />

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-cream-border p-16 text-center">
                <Search size={40} className="mx-auto text-cream-border mb-4" />
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-warm-gray text-sm mb-6">Tente ajustar os filtros para ver mais resultados.</p>
                <button onClick={resetAll} className="btn-gold px-6 py-3 rounded-full text-sm font-medium">
                  Limpar filtros
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} variant="horizontal" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-80 bg-cream overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-charcoal">Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={22} className="text-charcoal" />
              </button>
            </div>
            <Sidebar />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-gold w-full py-4 rounded-full text-sm font-semibold mt-6"
            >
              Ver {filtered.length} imóveis
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
