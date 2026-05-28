import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { 
  Save, 
  Eye, 
  RotateCcw, 
  Palette, 
  Type, 
  Layout, 
  Layers, 
  Grid, 
  Users, 
  Clock, 
  Sparkles,
  Phone,
  Mail,
  Instagram,
  Plus,
  Trash2,
  Check,
  Building
} from 'lucide-react'
import { getTenantById } from '@/data/tenants'

export const Route = createFileRoute('/builder')({
  component: BuilderPage,
})

// Font selections
const SANS_FONTS = ['Inter', 'DM Sans', 'Outfit', 'Playfair Display']
const DISPLAY_FONTS = ['Outfit', 'Playfair Display', 'Inter', 'DM Sans']

// Filter selections
const FILTER_OPTIONS = [
  { value: 'finalidade', label: 'Finalidade (Venda/Aluguel/Lançamento)' },
  { value: 'tipo', label: 'Tipo de Imóvel' },
  { value: 'neighborhood', label: 'Bairro/Localização' },
  { value: 'bedrooms', label: 'Quantidade de Quartos' },
  { value: 'price', label: 'Faixa de Preço' }
]

function BuilderPage() {
  const navigate = useNavigate()
  
  // Default values from Lumina
  const defaultTenant = getTenantById('lumina')
  
  // Custom states
  const [colors, setColors] = useState({
    cream: '#FAFAFA',
    creamDark: '#F4F4F5',
    creamBorder: '#E4E4E7',
    charcoal: '#09090B',
    charcoalLight: '#27272A',
    warmGray: '#717178',
    gold: '#18181B',
    goldLight: '#3F3F46',
  })
  
  const [fonts, setFonts] = useState({
    sans: 'Inter',
    display: 'Outfit',
  })
  
  const [settings, setSettings] = useState({
    headerStyle: 'minimal' as 'transparent' | 'minimal' | 'classic',
    footerStyle: 'simple' as 'simple' | 'detailed' | 'minimal',
    heroStyle: 'minimalist' as 'search-centered' | 'search-left' | 'minimalist',
    heroTitle: 'Coleção Lançamentos Curitiba',
    heroSubtitle: 'Curadoria especializada de apartamentos, coberturas e residências suspensas com design assinado.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
    cardVariant: 'compact' as 'default' | 'compact' | 'horizontal',
    showCardBedrooms: true,
    showCardBathrooms: false,
    showCardArea: true,
    showCardCondo: false,
    showCardPetFriendly: false,
    modules: {
      featured: true,
      categories: true,
      cities: true,
      testimonials: false,
      blog: true,
      launches: true,
    },
    pages: {
      blog: true,
      launches: true,
      contact: true,
      sobre: true,
      anunciar: true,
      avaliar: false,
    },
    homeFilters: ['tipo', 'neighborhood'],
    searchFiltersLayout: 'topbar' as 'sidebar' | 'topbar',
    detailGalleryStyle: 'slider' as 'mosaic' | 'slider' | 'grid',
    openingHours: 'Segunda a Sexta das 10h às 19h · Sábados das 10h às 16h',
    team: [] as any[]
  })

  // Contacts configuration
  const [contacts, setContacts] = useState({
    phone: '(41) 3012-9876',
    phoneRaw: '+554130129876',
    whatsapp: '(41) 98877-6655',
    whatsappRaw: '5541988776655',
    email: 'curadoria@luminaimoveis.com.br',
    creci: 'CRECI-PR 45.892-F',
    address: {
      street: 'Alameda Dom Pedro II, nº 321',
      neighborhood: 'Batel',
      city: 'Curitiba',
      state: 'PR',
      fullAddress: 'Edifício Batel Workspace, Batel, Curitiba - PR',
    }
  })

  // Load from localstorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lumina_builder_settings')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.colors) setColors(parsed.colors)
          if (parsed.fonts) setFonts(parsed.fonts)
          if (parsed.contacts) setContacts(parsed.contacts)
          
          setSettings({
            headerStyle: parsed.headerStyle || 'minimal',
            footerStyle: parsed.footerStyle || 'simple',
            heroStyle: parsed.heroStyle || 'minimalist',
            heroTitle: parsed.heroTitle || 'Coleção Lançamentos Curitiba',
            heroSubtitle: parsed.heroSubtitle || '',
            heroImage: parsed.heroImage || '',
            cardVariant: parsed.cardVariant || 'compact',
            showCardBedrooms: parsed.showCardBedrooms !== false,
            showCardBathrooms: !!parsed.showCardBathrooms,
            showCardArea: parsed.showCardArea !== false,
            showCardCondo: !!parsed.showCardCondo,
            showCardPetFriendly: !!parsed.showCardPetFriendly,
            modules: {
              featured: parsed.modules?.featured !== false,
              categories: parsed.modules?.categories !== false,
              cities: parsed.modules?.cities !== false,
              testimonials: !!parsed.modules?.testimonials,
              blog: parsed.modules?.blog !== false,
              launches: parsed.modules?.launches !== false,
            },
            pages: {
              blog: parsed.pages?.blog !== false,
              launches: parsed.pages?.launches !== false,
              contact: parsed.pages?.contact !== false,
              sobre: parsed.pages?.sobre !== false,
              anunciar: parsed.pages?.anunciar !== false,
              avaliar: !!parsed.pages?.avaliar,
            },
            homeFilters: parsed.homeFilters || ['tipo', 'neighborhood'],
            searchFiltersLayout: parsed.searchFiltersLayout || 'topbar',
            detailGalleryStyle: parsed.detailGalleryStyle || 'slider',
            openingHours: parsed.openingHours || 'Segunda a Sexta das 10h às 19h · Sábados das 10h às 16h',
            team: parsed.team || (defaultTenant?.builderSettings?.team || [])
          })
        } catch (e) {
          console.error(e)
        }
      } else if (defaultTenant) {
        setSettings(prev => ({
          ...prev,
          team: defaultTenant.builderSettings.team
        }))
      }
    }
  }, [])

  // Action: Save configuration
  const handleSave = (redirectToSite = false) => {
    if (typeof window !== 'undefined') {
      const payload = {
        ...settings,
        colors,
        fonts,
        contacts,
        creci: contacts.creci
      }
      localStorage.setItem('lumina_builder_settings', JSON.stringify(payload))
      window.dispatchEvent(new Event('lumina_builder_updated'))
      
      if (redirectToSite) {
        navigate({ to: '/$tenant', params: { tenant: 'Lumina' } })
      } else {
        alert('Configurações salvas com sucesso! Aplicação imediata no tema Lumina.')
      }
    }
  }

  // Action: Reset settings
  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar para o padrão inicial do tema Lumina?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumina_builder_settings')
        window.location.reload()
      }
    }
  }

  // Pre-configured Luxury Layout Presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'curitiba') {
      setColors({
        cream: '#0B0F19', // Dark Luxury Navy
        creamDark: '#070A10',
        creamBorder: '#1E293B',
        charcoal: '#FAFAFA', // White Text
        charcoalLight: '#E2E8F0',
        warmGray: '#94A3B8',
        gold: '#F59E0B', // Bright Amber
        goldLight: '#FBBF24',
      })
      setFonts({ sans: 'Outfit', display: 'Outfit' })
      setSettings(prev => ({
        ...prev,
        headerStyle: 'minimal',
        heroStyle: 'minimalist',
        heroTitle: 'Curitiba Minimalist Living',
        heroSubtitle: 'Arquitetura autoral, linhas retas e curadoria exclusiva de alto padrão no Batel e Cabral.',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
        cardVariant: 'compact',
        detailGalleryStyle: 'grid',
        modules: { featured: true, categories: true, cities: true, testimonials: true, blog: true, launches: true }
      }))
    } else if (presetName === 'beach') {
      setColors({
        cream: '#FAF6F0', // Sandy warm tone
        creamDark: '#F3ECE0',
        creamBorder: '#E6DCC8',
        charcoal: '#1A1816', // Earthy charcoal
        charcoalLight: '#3D3834',
        warmGray: '#8C8276',
        gold: '#D97706', // Sunny gold
        goldLight: '#F59E0B',
      })
      setFonts({ sans: 'DM Sans', display: 'Playfair Display' })
      setSettings(prev => ({
        ...prev,
        headerStyle: 'classic',
        heroStyle: 'search-centered',
        heroTitle: 'Vivências Urbanas Exclusivas',
        heroSubtitle: 'Seu refúgio de design contemporâneo e sofisticação natural.',
        heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&fit=crop',
        cardVariant: 'default',
        detailGalleryStyle: 'mosaic',
        modules: { featured: true, categories: true, cities: false, testimonials: true, blog: true, launches: true }
      }))
    } else if (presetName === 'corporate') {
      setColors({
        cream: '#FAFAFA',
        creamDark: '#F4F4F5',
        creamBorder: '#E4E4E7',
        charcoal: '#09090B',
        charcoalLight: '#27272A',
        warmGray: '#717178',
        gold: '#000000', // Noir minimalist
        goldLight: '#27272A',
      })
      setFonts({ sans: 'Inter', display: 'Inter' })
      setSettings(prev => ({
        ...prev,
        headerStyle: 'minimal',
        heroStyle: 'search-left',
        heroTitle: 'Galeria Batel Workspace',
        heroSubtitle: 'Curadoria de projetos residenciais e corporativos na melhor localização.',
        heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&fit=crop',
        cardVariant: 'horizontal',
        detailGalleryStyle: 'slider',
        modules: { featured: true, categories: true, cities: true, testimonials: false, blog: true, launches: true }
      }))
    }
  }

  // Manage dynamic Team members
  const addTeamMember = () => {
    const newMember = {
      name: 'Novo Corretor',
      role: 'Especialista em Lançamentos',
      phone: '(41) 99999-9999',
      email: 'corretor@lumina.com.br',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      instagram: 'https://instagram.com/'
    }
    setSettings(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }))
  }

  const updateTeamMember = (index: number, key: string, value: string) => {
    const list = [...settings.team]
    list[index] = { ...list[index], [key]: value }
    setSettings(prev => ({ ...prev, team: list }))
  }

  const removeTeamMember = (index: number) => {
    const list = settings.team.filter((_, i) => i !== index)
    setSettings(prev => ({ ...prev, team: list }))
  }

  const toggleHomeFilter = (val: string) => {
    if (settings.homeFilters.includes(val)) {
      setSettings(prev => ({ ...prev, homeFilters: prev.homeFilters.filter(item => item !== val) }))
    } else {
      setSettings(prev => ({ ...prev, homeFilters: [...prev.homeFilters, val] }))
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <title>Painel Lego V8 — Gerador de Sites de Luxo</title>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5  rounded-full filter blur-[120px] pointer-events-none" />

      {/* Top Header Workspace */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-black text-xl shadow-lg">
              V8
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight tracking-tight">V8 LEGO Builder</h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">MICRO-PORTAL & IDENTIDADE VISUAL DINÂMICA</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleReset}
              className="px-4 py-2 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw size={13} />
              Resetar Padrão
            </button>
            <button 
              onClick={() => handleSave(false)}
              className="px-4 py-2 border border-amber-500/20 hover:border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Save size={13} />
              Gravar Alterações
            </button>
            <button 
              onClick={() => handleSave(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/15 transition-all"
            >
              <Eye size={13} />
              Salvar e Abrir Lumina
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Panel */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        
        {/* LEFT COLUMN: Controls Dashboard */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* Preset templates showcase */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-amber-400 shrink-0" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Presets Temáticos Rápidos (1-Click WOW)</h2>
            </div>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Escolha uma curadoria de design recomendada para mudar instantaneamente a paleta de cores, tipografia e estrutura visual do site.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => applyPreset('curitiba')}
                className="p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-950/60 text-left transition-all hover:bg-slate-950"
              >
                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-amber-400 font-bold mb-3">01</div>
                <div className="font-bold text-xs text-slate-100">Curitiba High-End Dark</div>
                <p className="text-[10px] text-slate-500 mt-1">Paleta luxuosa escura, fonte Outfit e minimalismo vanguardista.</p>
              </button>
              <button 
                onClick={() => applyPreset('beach')}
                className="p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-950/60 text-left transition-all hover:bg-slate-950"
              >
                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-amber-400 font-bold mb-3">02</div>
                <div className="font-bold text-xs text-slate-100">Floripa Warm Sandy Vibe</div>
                <p className="text-[10px] text-slate-500 mt-1">Tons praianos quentes, fonte serifada clássica Playfair.</p>
              </button>
              <button 
                onClick={() => applyPreset('corporate')}
                className="p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-950/60 text-left transition-all hover:bg-slate-950"
              >
                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-amber-400 font-bold mb-3">03</div>
                <div className="font-bold text-xs text-slate-100">Minimalist Noir & White</div>
                <p className="text-[10px] text-slate-500 mt-1">Monocromático elegante, fontes modernas e clean layout.</p>
              </button>
            </div>
          </div>

          {/* COLOR PALETTE SETTINGS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Identidade Visual & Cores</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fundo Cream/Base</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={colors.cream} 
                    onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={colors.cream} 
                    onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fundo Dark/Destaque</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={colors.charcoal} 
                    onChange={(e) => setColors({ ...colors, charcoal: e.target.value })}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={colors.charcoal} 
                    onChange={(e) => setColors({ ...colors, charcoal: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Cor Accent/Dourado</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={colors.gold} 
                    onChange={(e) => setColors({ ...colors, gold: e.target.value })}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={colors.gold} 
                    onChange={(e) => setColors({ ...colors, gold: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fundo Secundário</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={colors.creamDark} 
                    onChange={(e) => setColors({ ...colors, creamDark: e.target.value })}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={colors.creamDark} 
                    onChange={(e) => setColors({ ...colors, creamDark: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY SETTINGS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Type className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Tipografia (Google Fonts)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Fonte Primária (Textos & Corpo)</label>
                <select 
                  value={fonts.sans}
                  onChange={(e) => setFonts({ ...fonts, sans: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  {SANS_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <p className="text-[10px] text-slate-500 mt-1.5">Ideal para maior legibilidade de parágrafos e especificações.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Fonte Secundária (Títulos & Display)</label>
                <select 
                  value={fonts.display}
                  onChange={(e) => setFonts({ ...fonts, display: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  {DISPLAY_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <p className="text-[10px] text-slate-500 mt-1.5">Aplicado em títulos de seções marcantes e cabeçalhos do Hero.</p>
              </div>
            </div>
          </div>

          {/* HEADERS, FOOTERS AND HERO STYLE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layout className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Estrutura de Header, Footer & Banner Hero</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Estilo do Cabeçalho</label>
                <select 
                  value={settings.headerStyle}
                  onChange={(e) => setSettings({ ...settings, headerStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  <option value="minimal">Minimalista (Logo + Menu limpo)</option>
                  <option value="transparent">Transparente Overlay (Sobreposto ao Hero)</option>
                  <option value="classic">Clássico Completo (Com fundo e borda superior)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Estilo do Rodapé</label>
                <select 
                  value={settings.footerStyle}
                  onChange={(e) => setSettings({ ...settings, footerStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  <option value="simple">Simples (Foco em contatos e redes)</option>
                  <option value="detailed">Detalhado Completo (Com links de páginas extras)</option>
                  <option value="minimal">Minimalista Compacto (Assinatura e CRECI)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Layout do Banner Hero</label>
                <select 
                  value={settings.heroStyle}
                  onChange={(e) => setSettings({ ...settings, heroStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  <option value="minimalist">Minimalista Editorial (Tipografia e fundo elegante)</option>
                  <option value="search-centered">Buscador Centralizado (Clássico V8)</option>
                  <option value="search-left">Buscador Alinhado à Esquerda</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-800 pt-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Título do Hero</label>
                <input 
                  type="text" 
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                  placeholder="Ex: Coleção Lançamentos Curitiba"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Subtítulo do Hero</label>
                <textarea 
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 h-20 resize-none"
                  placeholder="Resumo editorial marcante..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">URL da Imagem de Fundo (Hero)</label>
                <input 
                  type="text" 
                  value={settings.heroImage}
                  onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 text-xs font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </div>

          {/* ACTIVE PORTAL MODULES & EXTRA PAGES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Módulos Ativos do Site & Páginas Extras</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portal Section Modules */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Seções da Página Principal</h3>
                <div className="space-y-3.5">
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.featured} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, featured: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Imóveis em Destaque (Grade principal)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.categories} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, categories: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Categorias Rápidas (Comprar/Alugar/Lançamentos)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.cities} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, cities: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Onde Atuamos (Cidades principais)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.testimonials} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, testimonials: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Depoimentos de Clientes
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.blog} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, blog: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Artigos & Guia do Comprador (Blog)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.modules.launches} 
                      onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, launches: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Novos Lançamentos Teaser
                  </label>
                </div>
              </div>

              {/* Extra internal Pages */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Rotas & Páginas Extras Ativas</h3>
                <div className="space-y-3.5">
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.pages.blog} 
                      onChange={(e) => setSettings({ ...settings, pages: { ...settings.pages, blog: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Página de Blog Completo
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.pages.launches} 
                      onChange={(e) => setSettings({ ...settings, pages: { ...settings.pages, launches: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Página Editorial de Lançamentos
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.pages.sobre} 
                      onChange={(e) => setSettings({ ...settings, pages: { ...settings.pages, sobre: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Página Sobre Nós (História & Valores)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.pages.anunciar} 
                      onChange={(e) => setSettings({ ...settings, pages: { ...settings.pages, anunciar: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Página Anunciar Imóvel (Lead Generator)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={settings.pages.avaliar} 
                      onChange={(e) => setSettings({ ...settings, pages: { ...settings.pages, avaliar: e.target.checked } })}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    Página de Avaliação de Imóvel
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* HOME FILTER CONFIGURATION & SEARCH RESULTS LAYOUT */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Grid className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Configuração de Busca & Filtros</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Campos de Filtro no Buscador da Home</label>
                <div className="space-y-2.5">
                  {FILTER_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                      <input 
                        type="checkbox" 
                        checked={settings.homeFilters.includes(opt.value)}
                        onChange={() => toggleHomeFilter(opt.value)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Estilo dos Filtros na Página de Busca</label>
                <div className="space-y-3.5">
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="radio" 
                      name="searchFiltersLayout"
                      checked={settings.searchFiltersLayout === 'topbar'}
                      onChange={() => setSettings({ ...settings, searchFiltersLayout: 'topbar' })}
                      className="border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                    />
                    Topbar Horizontal (Moderno e Fluido)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                    <input 
                      type="radio" 
                      name="searchFiltersLayout"
                      checked={settings.searchFiltersLayout === 'sidebar'}
                      onChange={() => setSettings({ ...settings, searchFiltersLayout: 'sidebar' })}
                      className="border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                    />
                    Sidebar Lateral Esquerda (Tradicional Imobiliária)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* CARD STYLING & DETAIL GALLERY STYLE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Grid className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Design dos Cards & Galeria de Imóvel</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Variant de Cards dos Imóveis</label>
                <select 
                  value={settings.cardVariant}
                  onChange={(e) => setSettings({ ...settings, cardVariant: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  <option value="default">Card Padrão (Imagem Proporcional + Detalhes Completos)</option>
                  <option value="compact">Card Compacto (Ideal para grades densas e clean)</option>
                  <option value="horizontal">Card Horizontal (Lista editorial esticada)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Estilo de Galeria em Detalhes</label>
                <select 
                  value={settings.detailGalleryStyle}
                  onChange={(e) => setSettings({ ...settings, detailGalleryStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                >
                  <option value="mosaic">Mosaico Nobre (Layout de Alto Padrão Robles)</option>
                  <option value="slider">Slider Carrossel Editorial (Moda Lumina)</option>
                  <option value="grid">Grade Simétrica de Design (Estética Vanguarda)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Metadados Exibidos nos Cards</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={settings.showCardBedrooms} 
                    onChange={(e) => setSettings({ ...settings, showCardBedrooms: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                  />
                  Quartos
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={settings.showCardBathrooms} 
                    onChange={(e) => setSettings({ ...settings, showCardBathrooms: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                  />
                  Banheiros
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={settings.showCardArea} 
                    onChange={(e) => setSettings({ ...settings, showCardArea: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                  />
                  Área Útil (m²)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={settings.showCardCondo} 
                    onChange={(e) => setSettings({ ...settings, showCardCondo: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                  />
                  Valor Condomínio
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={settings.showCardPetFriendly} 
                    onChange={(e) => setSettings({ ...settings, showCardPetFriendly: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4"
                  />
                  Aceita Pets
                </label>
              </div>
            </div>
          </div>

          {/* DYNAMIC TEAM CREATOR CONFIGURATION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="text-amber-400" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Equipe & Consultores Exclusivos</h2>
              </div>
              <button 
                onClick={addTeamMember}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Plus size={12} />
                Adicionar Membro
              </button>
            </div>

            <div className="space-y-4">
              {settings.team.map((member, idx) => (
                <div key={idx} className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 relative group/member">
                  <button 
                    onClick={() => removeTeamMember(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="Excluir Consultor"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        value={member.name}
                        onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Cargo/Especialidade</label>
                      <input 
                        type="text" 
                        value={member.role}
                        onChange={(e) => updateTeamMember(idx, 'role', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Link Foto (URL)</label>
                      <input 
                        type="text" 
                        value={member.photo}
                        onChange={(e) => updateTeamMember(idx, 'photo', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Telefone Comercial</label>
                      <input 
                        type="text" 
                        value={member.phone}
                        onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">E-mail Comercial</label>
                      <input 
                        type="text" 
                        value={member.email}
                        onChange={(e) => updateTeamMember(idx, 'email', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">URL Instagram</label>
                      <input 
                        type="text" 
                        value={member.instagram}
                        onChange={(e) => updateTeamMember(idx, 'instagram', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {settings.team.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-500 italic bg-slate-950/20 border border-dashed border-slate-800 rounded-xl">
                  Nenhum consultor cadastrado. A equipe padrão do tema Lumina será carregada.
                </div>
              )}
            </div>
          </div>

          {/* CONTACT INFO & OPERATION HOURS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Contatos, CRECI & Horário Comercial</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Telefone Público Exibido</label>
                <input 
                  type="text" 
                  value={contacts.phone}
                  onChange={(e) => setContacts({ ...contacts, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Whatsapp Público Exibido</label>
                <input 
                  type="text" 
                  value={contacts.whatsapp}
                  onChange={(e) => setContacts({ ...contacts, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">E-mail Comercial Oficial</label>
                <input 
                  type="text" 
                  value={contacts.email}
                  onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Inscrição CRECI Imobiliária</label>
                <input 
                  type="text" 
                  value={contacts.creci}
                  onChange={(e) => setContacts({ ...contacts, creci: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Horário de Funcionamento Comercial</label>
              <input 
                type="text" 
                value={settings.openingHours}
                onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                placeholder="Ex: Segunda a Sexta das 10h às 19h · Sábados das 10h às 16h"
              />
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: Lego Concept Info & Fast Preview Widget */}
        <section className="lg:col-span-4 space-y-8">
          
          {/* Quick interactive Preview Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-28">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">Status da Modelagem Lego V8</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tenant Destino:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Building size={12} />
                  Lumina Curadoria
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tipografia Selecionada:</span>
                <span className="font-mono text-slate-300">{fonts.display} / {fonts.sans}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estilo Geral:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 font-semibold capitalize">{settings.cardVariant} Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Módulos do Site:</span>
                <span className="text-slate-300">{Object.values(settings.modules).filter(Boolean).length} / 6 Ativos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Páginas de Navegação:</span>
                <span className="text-slate-300">{Object.values(settings.pages).filter(Boolean).length} / 6 Ativas</span>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-2">
                <div className="text-[10px] text-slate-500 font-mono leading-relaxed mb-4">
                  *As customizações do Lego V8 são aplicadas dinamicamente via localState, simulando a injeção estocástica do microsserviço de temas da Microsistec.
                </div>
                <button 
                  onClick={() => handleSave(true)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <Eye size={14} />
                  Visualizar Tema Aplicado
                </button>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Plataforma V8 — Builder LEGO. Microsistec & Evolves.</p>
          <div className="font-mono text-[10px] text-slate-600">
            Assinatura do Autor: Jefferson Campos Beira Junior
          </div>
        </div>
      </footer>
    </div>
  )
}
