import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute , useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { 
  Building, 
  Home, 
  Layers, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  Building2,
  FileText,
  User,
  Maximize2,
} from 'lucide-react'

import { useTenant } from '@/routes/$tenant'

export const Route = createFileRoute('/$tenant/anunciar')({
  component: AnunciarPage,
})

type Step = 1 | 2 | 3 | 4 | 5 | 6

function AnunciarPage() {
  const tenant = useTenant()

  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([])

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }

  // Form State
  const [formData, setFormData] = useState({
    purpose: 'venda' as 'venda' | 'aluguel',
    propertyType: 'casa' as 'casa' | 'apartamento' | 'cobertura' | 'terreno' | 'comercial',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: 'São Paulo',
    state: 'SP',
    area: '',
    totalArea: '',
    bedrooms: '3',
    bathrooms: '3',
    parkingSpaces: '2',
    price: '',
    condo: '',
    iptu: '',
    description: '',
    features: [] as string[],
    ownerName: '',
    ownerCpf: '',
    ownerEmail: '',
    ownerPhone: '',
    bestTimeToCall: 'tarde' as 'manha' | 'tarde' | 'noite'
  })

  // Automatic CEP lookup via ViaCEP API
  useEffect(() => {
    const cleanCep = formData.cep.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      setCepLoading(true)
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setFormData(prev => ({
              ...prev,
              street: data.logradouro || prev.street,
              neighborhood: data.bairro || prev.neighborhood,
              city: data.localidade || prev.city,
              state: data.uf || prev.state
            }))
          }
        })
        .catch(err => console.error('Erro ao buscar CEP:', err))
        .finally(() => setCepLoading(false))
    }
  }, [formData.cep])

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (!formData.cep || !formData.street || !formData.number || !formData.neighborhood) {
        showToast('Por favor, preencha o CEP, Endereço, Número e Bairro para continuar.', 'error')
        return
      }
      setStep(3)
    } else if (step === 3) {
      if (!formData.area || !formData.price) {
        showToast('Por favor, informe a Área e o Valor pretendido do imóvel.', 'error')
        return
      }
      setStep(4)
    } else if (step === 4) {
      setStep(5)
    } else if (step === 5) {
      if (!formData.ownerName || !formData.ownerEmail || !formData.ownerPhone) {
        showToast('Por favor, preencha o Nome, E-mail e Telefone de contato.', 'error')
        return
      }
      submitAnnouncement()
    }
  }

  const handlePrev = () => {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
    else if (step === 4) setStep(3)
    else if (step === 5) setStep(4)
  }

  const handleInputChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }))
  }

  const toggleFeature = (feat: string) => {
    setFormData(prev => {
      const current = [...prev.features]
      if (current.includes(feat)) {
        return { ...prev, features: current.filter(f => f !== feat) }
      } else {
        return { ...prev, features: [...current, feat] }
      }
    })
  }

  const submitAnnouncement = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('Anúncio enviado com sucesso!', 'success')
      setStep(6)
    }, 2000)
  }

  // File drag & drop simulator
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate photo selection
      setSelectedPhotos(prev => [...prev, 'photo_simulated.png'])
    }
  }

  const selectFilesSimulated = () => {
    setSelectedPhotos(prev => [...prev, `imovel_foto_${prev.length + 1}.jpg`])
  }

  const settings = tenant.builderSettings || {}
  const pageStructure = settings.pageStructures?.anunciar || 'editorial'
  const blocks = settings.pageBlocks?.anunciar || ['hero', 'text', 'form']
  const blocksLayout = settings.pageBlocksLayout?.anunciar || 'stack'
  const title = settings.anunciarTitle || 'Anuncie Seu Imóvel'
  const subtitle = settings.anunciarSubtitle || 'Anuncie de forma inteligente e rápida para milhares de clientes selecionados de alto padrão em todo o Brasil.'
  const heroImage = settings.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop"

  const renderHero = () => {
    if (pageStructure === 'magazine') {
      return (
        <div key="hero" className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden mb-12 rounded-3xl border border-cream-border">
          <img src={heroImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center px-6 animate-fade-in">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-3">{title}</h1>
            <p className="text-cream/80 text-sm md:text-base max-w-xl mx-auto">{subtitle}</p>
          </div>
        </div>
      )
    }

    if (pageStructure === 'centered') {
      return (
        <div key="hero" className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 size={12} />
            Anuncie Conosco
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h1>
          <p className="text-warm-gray text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>
      )
    }

    // Default: 'editorial'
    return (
      <div key="hero" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 animate-fade-in">
        <div className="text-left space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Building2 size={12} />
            Parceria Premium
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {title}
          </h1>
          <p className="text-warm-gray text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="h-64 rounded-3xl overflow-hidden shadow-md border border-cream-border">
          <img src={heroImage} alt="Cover" className="w-full h-full object-cover" />
        </div>
      </div>
    )
  }

  const renderTextSection = () => (
    <div key="text" className="bg-white rounded-3xl border border-cream-border p-8 shadow-sm text-left animate-fade-in mb-6">
      <h3 className="font-display text-xl font-bold text-charcoal mb-4">Por que anunciar conosco?</h3>
      <p className="text-warm-gray text-sm leading-relaxed mb-6">
        Ao anunciar seu imóvel com a {tenant.name}, você tem acesso a uma curadoria especializada com alcance nacional e atendimento personalizado premium.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-warm-gray">
        <div className="space-y-1">
          <div className="font-bold text-charcoal">⭐ Destaque Nacional</div>
          <div>Imóvel exposto nos principais portais para clientes selecionados.</div>
        </div>
        <div className="space-y-1">
          <div className="font-bold text-charcoal">📸 Fotos Profissionais</div>
          <div>Produção visual de altíssimo padrão sem custo inicial.</div>
        </div>
        <div className="space-y-1">
          <div className="font-bold text-charcoal">🛡️ Transação Segura</div>
          <div>Assessoria jurídica completa em todas as etapas da negociação.</div>
        </div>
      </div>
    </div>
  )

  const renderFormWrapper = (children: React.ReactNode) => (
    <div key="form" className="space-y-6">
      {/* Multi-step progress bar */}
      {step < 6 && (
        <div className="mb-10">
          <div className="flex justify-between items-center text-[10px] md:text-xs text-warm-gray font-medium uppercase mb-3">
            <span className={step >= 1 ? 'text-gold' : ''}>1. Tipo</span>
            <span className={step >= 2 ? 'text-gold' : ''}>2. Local</span>
            <span className={step >= 3 ? 'text-gold' : ''}>3. Detalhes</span>
            <span className={step >= 4 ? 'text-gold' : ''}>4. Fotos</span>
            <span className={step >= 5 ? 'text-gold' : ''}>5. Proprietário</span>
          </div>
          <div className="h-1.5 w-full bg-cream-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Wizard Form Container */}
      <div className="bg-white border border-cream-border rounded-3xl p-8 shadow-sm relative">
        {children}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className={blocksLayout === 'grid' ? "grid grid-cols-1 gap-8 items-start" : "space-y-12"}>
          {blocks.map(blockId => {
            if (blockId === 'hero') return renderHero()
            if (blockId === 'text') return renderTextSection()
            if (blockId === 'form') {
              return renderFormWrapper(
                <>
                  {/* STEP 1: Purpose and Type */}
                  {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Qual o objetivo e tipo do seu imóvel?
              </h2>

              {/* Purpose Selector */}
              <div className="mb-8">
                <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Finalidade do Anúncio</label>
                <div className="flex gap-4">
                  {[
                    { id: 'venda', label: 'Vender meu imóvel' },
                    { id: 'aluguel', label: 'Alugar meu imóvel' }
                  ].map(item => {
                    const active = formData.purpose === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange('purpose', item.id)}
                        className={`flex-1 py-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                          active 
                            ? 'border-gold bg-gold text-white shadow-md' 
                            : 'border-cream-border hover:border-warm-gray text-charcoal bg-cream/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              {/* Type Select Cards */}
              <div>
                <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Tipo do Imóvel</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { id: 'casa', label: 'Casa', icon: Home },
                    { id: 'apartamento', label: 'Apartamento', icon: Building },
                    { id: 'cobertura', label: 'Cobertura', icon: Layers },
                    { id: 'terreno', label: 'Terreno', icon: MapPin },
                    { id: 'comercial', label: 'Comercial', icon: Briefcase },
                  ].map(item => {
                    const Icon = item.icon
                    const active = formData.propertyType === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange('propertyType', item.id)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                          active 
                            ? 'border-gold bg-gold/[0.03] text-gold' 
                            : 'border-cream-border hover:border-warm-gray text-charcoal-light'
                        }`}
                      >
                        <Icon size={22} className={active ? 'text-gold' : 'text-warm-gray'} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Address */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Localização do imóvel
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">
                    CEP {cepLoading && <span className="text-[10px] text-gold font-normal lowercase italic ml-1">buscando...</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Endereço (Rua, Av, etc)</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Av. Vieira Souto, etc"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Número</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="Ex: 1200"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Complemento</label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => handleInputChange('complement', e.target.value)}
                    placeholder="Apto 71, Bloco A"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Bairro</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    placeholder="Ipanema"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Cidade</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Rio de Janeiro"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Estado</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="RJ"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details & Price */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Preços e áreas do imóvel
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2 flex items-center gap-1">
                    <Maximize2 size={12} className="text-gold" />
                    Área Útil / Privativa (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="Ex: 220"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2 flex items-center gap-1">
                    <Maximize2 size={12} className="text-gold" />
                    Área Total / Terreno (m² - Opcional)
                  </label>
                  <input
                    type="number"
                    value={formData.totalArea}
                    onChange={(e) => handleInputChange('totalArea', e.target.value)}
                    placeholder="Ex: 350"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2 flex items-center gap-1">
                    <DollarSign size={12} className="text-gold" />
                    Valor de Anúncio Pretendido
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gold pointer-events-none">R$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.price}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        const num = parseInt(raw || '0', 10)
                        const formatted = num === 0 ? '' : num.toLocaleString('pt-BR')
                        handleInputChange('price', formatted)
                      }}
                      placeholder="0"
                      className="w-full bg-cream rounded-xl border border-gold/40 pl-10 pr-4 py-3.5 text-sm font-bold text-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-charcoal mb-2">Condomínio (R$)</label>
                    <input
                      type="number"
                      value={formData.condo}
                      onChange={(e) => handleInputChange('condo', e.target.value)}
                      placeholder="Ex: 1500"
                      className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-charcoal mb-2">IPTU Anual (R$)</label>
                    <input
                      type="number"
                      value={formData.iptu}
                      onChange={(e) => handleInputChange('iptu', e.target.value)}
                      placeholder="Ex: 2800"
                      className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Rooms sliders */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-2">Quartos</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  >
                    {['1', '2', '3', '4', '5', '6+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-2">Banheiros</label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  >
                    {['1', '2', '3', '4', '5', '6+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-2">Vagas</label>
                  <select
                    value={formData.parkingSpaces}
                    onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  >
                    {['1', '2', '3', '4', '5', '6+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Media, Description & Features */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Descrição, Diferenciais e Fotos
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Descrição Curta / Diferenciais</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Fale um pouco sobre o imóvel, sua vista, sua incidência de sol e o que o torna único..."
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>

                {/* Checklist options */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Infraestrutura & Diferenciais</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Piscina Privativa', 'Espaço Gourmet', 'Mobiliado', 'Vista Panorâmica',
                      'Ar Condicionado', 'Automação Residencial', 'Academia', 'Sauna',
                      'Segurança 24h', 'Portaria Virtual', 'Elevador Privativo', 'Pet Friendly'
                    ].map(feat => {
                      const active = formData.features.includes(feat)
                      return (
                        <button
                          key={feat}
                          onClick={() => toggleFeature(feat)}
                          className={`p-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                            active
                              ? 'border-gold bg-gold/[0.03] text-gold'
                              : 'border-cream-border hover:border-warm-gray text-charcoal-light'
                          }`}
                        >
                          {feat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Drag and Drop Simulator */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Fotos do Imóvel</label>
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={selectFilesSimulated}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 select-none ${
                      dragActive 
                        ? 'border-gold bg-gold/[0.02]' 
                        : 'border-cream-border hover:border-warm-gray bg-cream/10'
                    }`}
                  >
                    <UploadCloud size={32} className="text-warm-gray" />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Arraste fotos do imóvel aqui ou clique para selecionar</p>
                      <p className="text-[10px] text-warm-gray mt-1">Recomendamos imagens horizontais de alta definição (PNG ou JPG)</p>
                    </div>
                  </div>

                  {selectedPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedPhotos.map((p, i) => (
                        <div key={i} className="bg-cream border border-cream-border px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                          <FileText size={12} className="text-gold" />
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Owner Details */}
          {step === 5 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Dados do Proprietário para Contato
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">CPF (Seguro / Exclusivo)</label>
                  <input
                    type="text"
                    value={formData.ownerCpf}
                    onChange={(e) => handleInputChange('ownerCpf', e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">E-mail</label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Telefone com WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-warm-gray mb-3 flex items-center gap-1.5">
                  <User size={13} className="text-gold" />
                  Melhor Período para Ligação de um Consultor
                </label>
                <div className="flex gap-4">
                  {[
                    { id: 'manha', label: 'Manhã (09:00 - 12:00)' },
                    { id: 'tarde', label: 'Tarde (12:00 - 18:00)' },
                    { id: 'noite', label: 'Noite (18:00 - 20:00)' }
                  ].map(item => {
                    const active = formData.bestTimeToCall === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange('bestTimeToCall', item.id)}
                        className={`flex-1 py-3 px-2 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                          active 
                            ? 'border-gold bg-gold text-white shadow-sm' 
                            : 'border-cream-border hover:border-warm-gray text-charcoal bg-cream/15'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Success Feedback Screen */}
          {step === 6 && (
            <div className="animate-fade-in-up text-center py-8">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
                Anúncio Recebido!
              </h2>
              <p className="text-warm-gray text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Parabéns! O pré-cadastro do seu imóvel na rua <strong>{formData.street}</strong> no bairro <strong>{formData.neighborhood}</strong> foi efetuado com absoluto sucesso no nosso sistema.<br/><br/>
                Um consultor premium perito na sua região revisará as informações, entrará em contato para agendar as fotos profissionais e ativará o anúncio na Robles Imobiliária.
              </p>
              
              <div className="border-t border-cream-border pt-6 max-w-sm mx-auto flex gap-4">
                <button 
                  onClick={() => {
                    setFormData({
                      purpose: 'venda',
                      propertyType: 'casa',
                      cep: '',
                      street: '',
                      number: '',
                      complement: '',
                      neighborhood: '',
                      city: 'São Paulo',
                      state: 'SP',
                      area: '',
                      totalArea: '',
                      bedrooms: '3',
                      bathrooms: '3',
                      parkingSpaces: '2',
                      price: '',
                      condo: '',
                      iptu: '',
                      description: '',
                      features: [],
                      ownerName: '',
                      ownerCpf: '',
                      ownerEmail: '',
                      ownerPhone: '',
                      bestTimeToCall: 'tarde'
                    })
                    setSelectedPhotos([])
                    setStep(1)
                  }}
                  className="btn-outline flex-1 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-center"
                >
                  Anunciar Outro
                </button>
                <a 
                  href="/"
                  className="btn-gold flex-1 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center"
                >
                  Ir para o Início
                </a>
              </div>
            </div>
          )}

          {/* Loader backdrop during network simulation */}
          {loading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl z-20">
              <div className="w-12 h-12 rounded-full border-4 border-gold/25 border-t-gold animate-spin mb-4" />
              <div className="text-charcoal font-semibold text-sm">Registrando proposta no sistema...</div>
              <div className="text-warm-gray text-xs mt-1">Isso levará apenas alguns segundos.</div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 6 && (
            <div className="flex justify-between items-center border-t border-cream-border pt-6 mt-8">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  step === 1 
                    ? 'opacity-0 pointer-events-none' 
                    : 'btn-outline text-gold border-gold cursor-pointer'
                }`}
              >
                <ChevronLeft size={14} />
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="btn-gold py-3.5 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
              >
                {step === 5 ? 'Cadastrar Anúncio' : 'Avançar'}
                <ChevronRight size={14} />
              </button>
            </div>
          )}
                </>
              )
            }
            return null
          })}
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-center justify-between gap-3 animate-fade-in-up duration-300 font-sans text-xs ${
              t.type === 'success'
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                : t.type === 'error'
                ? 'bg-rose-50 border-rose-100 text-rose-800'
                : 'bg-blue-50 border-blue-100 text-blue-800'
            }`}
          >
            <span className="font-semibold">{t.message}</span>
            <button
              type="button"
              onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              className="text-slate-400 hover:text-slate-600 font-sans font-bold cursor-pointer text-xs border-0 bg-transparent p-0 flex items-center justify-center w-5 h-5 rounded hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
