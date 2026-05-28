import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { 
  Save, 
  Eye, 
  RotateCcw, 
  Palette, 
  Type, 
  Layout, 
  Grid, 
  Users, 
  Plus, 
  Trash2,
  BedDouble,
  Maximize2,
  Bath,
  ChevronUp,
  ChevronDown,
  Phone,
  Mail,
  Instagram,
  Image as ImageIcon
} from 'lucide-react'
import { getTenantById } from '@/data/tenants'
import { formatPrice } from '@/data/properties'



export const Route = createFileRoute('/builder')({
  component: BuilderPage,
})

// Expanded Google Fonts
const FONTS_LIST = [
  { name: 'Inter', category: 'sans-serif', desc: 'Moderno, limpo e extremamente legível' },
  { name: 'DM Sans', category: 'sans-serif', desc: 'Arrojado, contemporâneo e suave' },
  { name: 'Outfit', category: 'sans-serif', desc: 'Arquitetônico, geométrico e vanguardista' },
  { name: 'Playfair Display', category: 'serif', desc: 'Clássico, editorial e altamente luxuoso' },
  { name: 'Montserrat', category: 'sans-serif', desc: 'Urbano, corporativo e elegante' },
  { name: 'Lora', category: 'serif', desc: 'Literário, requintado e tradicional' },
  { name: 'Cormorant Garamond', category: 'serif', desc: 'Sofisticação extrema, traços finos' },
  { name: 'Syne', category: 'display', desc: 'Artesanal, autoral e focado em design' }
]

// Exquisite color presets
const COLOR_PRESETS = [
  {
    name: 'Ouro Imperial & Cream',
    desc: 'O clássico requinte de alto padrão',
    colors: {
      cream: '#F5F0E8',
      creamDark: '#EDE8DE',
      creamBorder: '#E0DAD0',
      charcoal: '#1C1916',
      charcoalLight: '#3D3731',
      warmGray: '#7C7269',
      gold: '#EDBF71',
      goldLight: '#F0D080',
    }
  },
  {
    name: 'Curitiba Verde Esmeralda',
    desc: 'Conexão com a sustentabilidade urbana',
    colors: {
      cream: '#F4F7F5',
      creamDark: '#E8EFEA',
      creamBorder: '#D2DFD6',
      charcoal: '#0D2114',
      charcoalLight: '#183824',
      warmGray: '#5C7465',
      gold: '#3A8266',
      goldLight: '#55A082',
    }
  },
  {
    name: 'Batel Noir & Platina',
    desc: 'Luxo vanguardista contemporâneo',
    colors: {
      cream: '#FAFAFA',
      creamDark: '#F4F4F5',
      creamBorder: '#E4E4E7',
      charcoal: '#09090B',
      charcoalLight: '#27272A',
      warmGray: '#717178',
      gold: '#18181B',
      goldLight: '#3F3F46',
    }
  },
  {
    name: 'Midnight & Safira',
    desc: 'Profundidade, prestígio e elegância noturna',
    colors: {
      cream: '#0B132B',
      creamDark: '#1C2541',
      creamBorder: '#3A506B',
      charcoal: '#FFFFFF',
      charcoalLight: '#F1F5F9',
      warmGray: '#94A3B8',
      gold: '#4895EF',
      goldLight: '#4CC9F0',
    }
  },
  {
    name: 'Coral Quente & Terracota',
    desc: 'Aconchego, calor e sofisticação orgânica',
    colors: {
      cream: '#FDFBF7',
      creamDark: '#F7F3EB',
      creamBorder: '#EFE6D5',
      charcoal: '#2D1E18',
      charcoalLight: '#4E3629',
      warmGray: '#8A7264',
      gold: '#E07A5F',
      goldLight: '#F4A261',
    }
  }
]

// Exquisite complete style presets
const STYLE_PRESETS = [
  {
    id: 'moderno',
    name: 'Moderno',
    desc: 'Cores platina e safira com tipografia geométrica vanguardista. Ideal para lançamentos de luxo.',
    colors: {
      cream: '#FAF9F6',
      creamDark: '#F0EFEA',
      creamBorder: '#E2E1D9',
      charcoal: '#0F172A',
      charcoalLight: '#1E293B',
      warmGray: '#64748B',
      gold: '#0EA5E9',
      goldLight: '#38BDF8',
    },
    fonts: {
      sans: 'Inter',
      display: 'Outfit',
    },
    settings: {
      headerStyle: 'minimal' as const,
      footerStyle: 'simple' as const,
      heroStyle: 'search-centered' as const,
      heroTitle: 'Coleção de Lançamentos Modernos',
      heroSubtitle: 'Apartamentos suspensos de alto padrão com arquitetura de vanguarda nas áreas mais nobres.',
      cardVariant: 'compact' as const,
      modules: {
        featured: true,
        categories: true,
        cities: true,
        testimonials: true,
        blog: true,
        launches: true,
      },
      moduleOrder: ['featured', 'categories', 'cities', 'testimonials'],
      sobreTitle: 'Vanguarda e Excelência Imobiliária',
      sobreText: 'Desenvolvemos curadorias específicas para clientes exigentes que valorizam engenharia de ponta, design autoral e as melhores localizações.',
      sobreImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      sobreStats: '10 Anos · 500+ Imóveis Entregues · R$ 2B+ Negociados',
      contatoTitle: 'Fale Conosco',
      contatoSubtitle: 'Fale com nossos curadores de imóveis agora mesmo.',
      contatoAddress: 'Av. Batel, 1550 - Batel, Curitiba - PR',
    }
  },
  {
    id: 'minimalista',
    name: 'Minimalista',
    desc: 'Espaço, luz, contrastes puros de preto e branco e tipografia grotesca sem serifa. Sofisticação discreta.',
    colors: {
      cream: '#FFFFFF',
      creamDark: '#F8F9FA',
      creamBorder: '#E9ECEF',
      charcoal: '#111111',
      charcoalLight: '#1F1F1F',
      warmGray: '#6C757D',
      gold: '#111111',
      goldLight: '#444444',
    },
    fonts: {
      sans: 'Inter',
      display: 'Inter',
    },
    settings: {
      headerStyle: 'transparent' as const,
      footerStyle: 'minimal' as const,
      heroStyle: 'minimalist' as const,
      heroTitle: 'Lumina Curadoria Imobiliária',
      heroSubtitle: 'Espaço, silêncio e luz natural. Uma seleção rigorosa de imóveis de grife em Curitiba.',
      cardVariant: 'horizontal' as const,
      modules: {
        featured: true,
        categories: false,
        cities: false,
        testimonials: false,
        blog: false,
        launches: false,
      },
      moduleOrder: ['featured', 'categories', 'cities', 'testimonials'],
      sobreTitle: 'Silêncio, Espaço e Luz',
      sobreText: 'Nossa missão é simples: filtrar o excesso. Apresentamos apenas propriedades que atingem a perfeição de proporções e acabamentos.',
      sobreImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      sobreStats: 'Curadoria Exclusiva · 0% Excesso · 100% Foco no Design',
      contatoTitle: 'Conexão Direta',
      contatoSubtitle: 'Seja atendido de forma confidencial por um de nossos diretores.',
      contatoAddress: 'Batel, Curitiba - PR',
    }
  },
  {
    id: 'classico',
    name: 'Clássico',
    desc: 'Tons creme aquecidos, detalhes dourados imperiais e tipografia serifada luxuosa editorial.',
    colors: {
      cream: '#FDFBF7',
      creamDark: '#F7F3EB',
      creamBorder: '#EFE6D5',
      charcoal: '#2D1E18',
      charcoalLight: '#4E3629',
      warmGray: '#8A7264',
      gold: '#EDBF71',
      goldLight: '#F0D080',
    },
    fonts: {
      sans: 'DM Sans',
      display: 'Playfair Display',
    },
    settings: {
      headerStyle: 'classic' as const,
      footerStyle: 'detailed' as const,
      heroStyle: 'search-left' as const,
      heroTitle: 'Residências de Prestígio Extraordinário',
      heroSubtitle: 'A herança viva da sofisticação e conforto no Batel, Cabral e Ecoville.',
      cardVariant: 'default' as const,
      modules: {
        featured: true,
        categories: true,
        cities: true,
        testimonials: true,
        blog: true,
        launches: true,
      },
      moduleOrder: ['featured', 'categories', 'cities', 'testimonials'],
      sobreTitle: 'Uma Tradição em Alto Padrão',
      sobreText: 'Há mais de uma década, a Lumina é sinônimo de excelência imobiliária tradicional, oferecendo suporte jurídico e curadoria incomparável.',
      sobreImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      sobreStats: '15 Anos de Tradição · R$ 1.5B+ Negociados · 100% Clientes Satisfeitos',
      contatoTitle: 'Agende uma Reunião Privada',
      contatoSubtitle: 'Estamos prontos para recebê-lo em nossa sede no Batel.',
      contatoAddress: 'Av. do Batel, 1200 - Batel, Curitiba - PR',
    }
  }
]

function BuilderPage() {
  const navigate = useNavigate()
  
  // Default values from Lumina
  const defaultTenant = getTenantById('lumina')
  
  // Colors & Typography state
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

  const [activePreviewTab, setActivePreviewTab] = useState<'home' | 'sobre' | 'contato'>('home')
  
  // Page Builder States
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
    team: [] as any[],
    moduleOrder: ['featured', 'categories', 'cities', 'testimonials'] as string[],
    sobreTitle: 'Nossa História, Seu Futuro',
    sobreText: 'Na Lumina, acreditamos que encontrar um imóvel de alto padrão em Curitiba é uma arte. Selecionamos cada propriedade com rigor estético e técnico.',
    sobreImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    sobreStats: '15 Anos de Tradição · 400+ Sonhos Realizados · R$ 1.5B+ Negociados',
    contatoTitle: 'Conecte-se com a Exclusividade',
    contatoSubtitle: 'Agende uma visita exclusiva com nossos curadores de imóveis no Batel.',
    contatoAddress: 'Av. do Batel, 1200 - Batel, Curitiba/PR',
  })

  // Basic contact info
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

  // Load configuration from localstorage on mount
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
            team: parsed.team || (defaultTenant?.builderSettings?.team || []),
            moduleOrder: parsed.moduleOrder || ['featured', 'categories', 'cities', 'testimonials'],
            sobreTitle: parsed.sobreTitle || 'Nossa História, Seu Futuro',
            sobreText: parsed.sobreText || 'Na Lumina, acreditamos que encontrar um imóvel de alto padrão em Curitiba é uma arte. Selecionamos cada propriedade com rigor estético e técnico.',
            sobreImage: parsed.sobreImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            sobreStats: parsed.sobreStats || '15 Anos de Tradição · 400+ Sonhos Realizados · R$ 1.5B+ Negociados',
            contatoTitle: parsed.contatoTitle || 'Conecte-se com a Exclusividade',
            contatoSubtitle: parsed.contatoSubtitle || 'Agende uma visita exclusiva com nossos curadores de imóveis no Batel.',
            contatoAddress: parsed.contatoAddress || 'Av. do Batel, 1200 - Batel, Curitiba/PR',
          })
        } catch (e) {
          console.error(e)
        }
      } else if (defaultTenant) {
        setSettings((prev: any) => ({
          ...prev,
          team: defaultTenant.builderSettings.team
        }))
      }
    }
  }, [])

  // Save changes
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
        alert('Identidade visual LEGO e componentes atualizados!')
      }
    }
  }

  // Reset to theme default
  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar para o padrão inicial do tema Lumina?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lumina_builder_settings')
        window.location.reload()
      }
    }
  }

  // Team configurations
  const addTeamMember = () => {
    const newMember = {
      name: 'Novo Consultor',
      role: 'Especialista Batel',
      phone: '(41) 98888-7777',
      email: 'consultor@lumina.com.br',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      instagram: 'https://instagram.com/'
    }
    setSettings((prev: any) => ({
      ...prev,
      team: [...prev.team, newMember]
    }))
  }

  const updateTeamMember = (index: number, key: string, value: string) => {
    const list = [...settings.team]
    list[index] = { ...list[index], [key]: value }
    setSettings((prev: any) => ({ ...prev, team: list }))
  }

  const removeTeamMember = (index: number) => {
    const list = settings.team.filter((_: any, i: number) => i !== index)
    setSettings((prev: any) => ({ ...prev, team: list }))
  }

  // LEGO Blocks reordering
  const moveModule = (index: number, direction: 'up' | 'down') => {
    const list = [...settings.moduleOrder]
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= list.length) return
    const temp = list[index]
    list[index] = list[targetIdx]
    list[targetIdx] = temp
    setSettings((prev: any) => ({ ...prev, moduleOrder: list }))
  }

  // Sample Property for Previews
  const mockProperty = {
    title: 'Ícaro Jardins do Batel — Cobertura Suspensa',
    neighborhood: 'Batel',
    city: 'Curitiba',
    bedrooms: 4,
    bathrooms: 5,
    area: 385,
    condoPrice: 2400,
    price: 8900000,
    purpose: 'venda',
    type: 'Cobertura',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  }

  // Dynamic style injection for Live Preview Frame
  const previewStyles = {
    '--theme-cream': colors.cream,
    '--theme-cream-dark': colors.creamDark,
    '--theme-cream-border': colors.creamBorder,
    '--theme-charcoal': colors.charcoal,
    '--theme-charcoal-light': colors.charcoalLight,
    '--theme-warm-gray': colors.warmGray,
    '--theme-gold': colors.gold,
    '--theme-gold-light': colors.goldLight,
    '--theme-font-sans': fonts.sans,
    '--theme-font-display': fonts.display,
    // Direct Tailwind v4 variable overrides to guarantee real-time updates in preview
    '--color-cream': colors.cream,
    '--color-cream-dark': colors.creamDark,
    '--color-cream-border': colors.creamBorder,
    '--color-charcoal': colors.charcoal,
    '--color-charcoal-light': colors.charcoalLight,
    '--color-warm-gray': colors.warmGray,
    '--color-gold': colors.gold,
    '--color-gold-light': colors.goldLight,
    '--font-sans': `${fonts.sans}, sans-serif`,
    '--font-display': `${fonts.display}, serif`,
  } as React.CSSProperties

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <title>LEGO Builder — Construtor Dinâmico V8</title>

      {/* Font imports for visual inline sample rendering */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Syne:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Decorative lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Header Controls workspace */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-black text-lg">
            V8
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
              LEGO Builder
              <span className="bg-amber-500/10 text-amber-400 text-[9px] px-2 py-0.5 rounded font-mono border border-amber-500/20 uppercase tracking-widest">Active</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-mono">CONSTRUTOR DE MÓDULOS MULTI-TENANT</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-3.5 py-1.5 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            Resetar
          </button>
          <button 
            onClick={() => handleSave(false)}
            className="px-3.5 py-1.5 border border-slate-800 bg-slate-800/40 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save size={12} />
            Salvar Layout
          </button>
          <button 
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition-colors cursor-pointer"
          >
            <Eye size={12} />
            Ver no Site
          </button>
        </div>
      </header>

      {/* Main Split Layout Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full">
        
        {/* LEFT COLUMN: Controls Dashboard (Natural scroll) */}
        <section className="lg:col-span-6 p-6 space-y-8 border-r border-slate-800/80 bg-slate-900/40">
          
          {/* SECTION 0: Bases/Estilos de Site Completos */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Grid className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Escolha uma Base Pronta (Bases Completas)</h2>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Selecione um estilo visual completo. Cores, fontes, cabeçalhos, layouts de cartões e páginas internas serão reconfigurados automaticamente!
            </p>
            <div className="grid grid-cols-3 gap-3">
              {STYLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setColors(preset.colors);
                    setFonts(preset.fonts);
                    setSettings((prev: any) => ({
                      ...prev,
                      ...preset.settings
                    }));
                  }}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/40 text-center transition-all flex flex-col justify-between items-center space-y-2 group cursor-pointer"
                >
                  <span className="text-[10px] font-bold text-slate-200 group-hover:text-amber-400 transition-colors uppercase tracking-wider">{preset.name}</span>
                  <span className="text-[8px] text-slate-500 leading-snug">{preset.desc.substring(0, 35)}...</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">Aplicar</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 1: Color Presets & Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Palette className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Identidade Visual & Cores</h2>
            </div>

            {/* Quick Palettes Grid */}
            <div className="space-y-3">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Escolha uma Paleta Temática</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setColors(p.colors)
                    }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/30 text-left transition-all hover:bg-slate-950 flex flex-col justify-between h-20 group cursor-pointer"
                  >
                    <div className="text-[11px] font-semibold text-slate-200 group-hover:text-amber-400 transition-colors leading-tight">{p.name}</div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="w-5 h-5 rounded-full border border-slate-800" style={{ backgroundColor: p.colors.cream }} />
                      <span className="w-5 h-5 rounded-full border border-slate-800" style={{ backgroundColor: p.colors.charcoal }} />
                      <span className="w-5 h-5 rounded-full border border-slate-800" style={{ backgroundColor: p.colors.gold }} />
                      <span className="w-5 h-5 rounded-full border border-slate-800" style={{ backgroundColor: p.colors.creamDark }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Color Pickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 pt-4">
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Base (Cream)</label>
                <div className="flex gap-1.5 items-center">
                  <input type="color" value={colors.cream} onChange={(e) => setColors({ ...colors, cream: e.target.value })} className="w-6 h-6 border-0 rounded cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono uppercase">{colors.cream}</span>
                </div>
              </div>
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Dark (Charcoal)</label>
                <div className="flex gap-1.5 items-center">
                  <input type="color" value={colors.charcoal} onChange={(e) => setColors({ ...colors, charcoal: e.target.value })} className="w-6 h-6 border-0 rounded cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono uppercase">{colors.charcoal}</span>
                </div>
              </div>
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Accent (Gold)</label>
                <div className="flex gap-1.5 items-center">
                  <input type="color" value={colors.gold} onChange={(e) => setColors({ ...colors, gold: e.target.value })} className="w-6 h-6 border-0 rounded cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono uppercase">{colors.gold}</span>
                </div>
              </div>
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Secundário</label>
                <div className="flex gap-1.5 items-center">
                  <input type="color" value={colors.creamDark} onChange={(e) => setColors({ ...colors, creamDark: e.target.value })} className="w-6 h-6 border-0 rounded cursor-pointer bg-transparent" />
                  <span className="text-[10px] font-mono uppercase">{colors.creamDark}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Typography Selection with live inline previews */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Type className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Tipografia & Fontes</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Fonte Primária (Textos & Corpo)</label>
                <select 
                  value={fonts.sans}
                  onChange={(e) => setFonts({ ...fonts, sans: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
                >
                  {FONTS_LIST.filter(f => f.category === 'sans-serif').map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Fonte Secundária (Títulos & Display)</label>
                <select 
                  value={fonts.display}
                  onChange={(e) => setFonts({ ...fonts, display: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
                >
                  {FONTS_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
            </div>

            {/* Typography sample grid with tenant's dynamic name rendering */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Amostragem Real ({defaultTenant?.name || 'Lumina'})</label>
              <div className="grid grid-cols-2 gap-3">
                {FONTS_LIST.map((f) => (
                  <div 
                    key={f.name}
                    onClick={() => setFonts((prev: any) => ({ ...prev, display: f.name }))}
                    className={`p-3 bg-slate-950 border rounded-xl text-left cursor-pointer transition-all ${
                      fonts.display === f.name ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">{f.name}</div>
                    <div 
                      style={{ fontFamily: f.name }}
                      className="text-sm font-bold text-white tracking-tight truncate"
                    >
                      {defaultTenant?.name || 'Lumina Curadoria'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: Card Variant Previews and specs configuration */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Grid className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Design & Especificações dos Cards</h2>
            </div>

            {/* LIVE CARD COMPONENT PREVIEW WIDGET */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 space-y-3">
              <span className="block text-[8px] font-bold uppercase tracking-widest text-amber-400">Preview Vivo do Card Selecionado</span>
              <div className="p-2 border border-slate-800 rounded-xl bg-slate-900/60 max-w-sm mx-auto">
                {settings.cardVariant === 'horizontal' ? (
                  <div className="flex gap-3 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 h-28">
                    <img src={mockProperty.image} className="w-24 object-cover h-full" />
                    <div className="p-2 flex flex-col justify-between flex-1">
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase">{mockProperty.type} · {mockProperty.neighborhood}</div>
                        <div className="text-[11px] font-bold text-slate-100 line-clamp-1">{mockProperty.title}</div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-2 text-[9px] text-slate-500">
                          {settings.showCardBedrooms && <span>{mockProperty.bedrooms} Qts</span>}
                          {settings.showCardBathrooms && <span>{mockProperty.bathrooms} Banh</span>}
                          {settings.showCardArea && <span>{mockProperty.area}m²</span>}
                          {settings.showCardCondo && <span>Cond: {formatPrice(mockProperty.condoPrice)}</span>}
                          {settings.showCardPetFriendly && <span className="text-emerald-500 font-semibold">Pet</span>}
                        </div>
                        <div className="text-[11px] font-bold text-amber-400 mt-1">{formatPrice(mockProperty.price)}</div>
                      </div>
                    </div>
                  </div>
                ) : settings.cardVariant === 'compact' ? (
                  <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                    <div className="relative h-24 bg-slate-900">
                      <img src={mockProperty.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <div className="text-[8px] font-mono text-slate-400 uppercase">{mockProperty.neighborhood}</div>
                      <div className="text-[11px] font-bold text-slate-100 line-clamp-1">{mockProperty.title}</div>
                      <div className="flex flex-wrap gap-1.5 text-[9px] text-slate-500 my-1">
                        {settings.showCardBedrooms && <span>{mockProperty.bedrooms}Q</span>}
                        {settings.showCardBathrooms && <span>· {mockProperty.bathrooms}B</span>}
                        {settings.showCardArea && <span>· {mockProperty.area}m²</span>}
                        {settings.showCardCondo && <span className="text-[8px]">· Cond: {formatPrice(mockProperty.condoPrice)}</span>}
                        {settings.showCardPetFriendly && <span className="text-emerald-500 text-[8px]">· Pet</span>}
                      </div>
                      <div className="text-xs font-bold text-amber-400">{formatPrice(mockProperty.price)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                    <div className="relative h-32 bg-slate-900">
                      <img src={mockProperty.image} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-bold text-[8px] px-1.5 py-0.5 rounded">Destaque</span>
                    </div>
                    <div className="p-3">
                      <div className="text-[8px] font-mono text-slate-400 uppercase">{mockProperty.neighborhood}, {mockProperty.city}</div>
                      <div className="text-xs font-bold text-slate-100 line-clamp-1">{mockProperty.title}</div>
                      <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 my-2">
                        {settings.showCardBedrooms && <span className="flex items-center gap-0.5"><BedDouble size={10} /> {mockProperty.bedrooms} Qts</span>}
                        {settings.showCardBathrooms && <span className="flex items-center gap-0.5"><Bath size={10} /> {mockProperty.bathrooms} Banh</span>}
                        {settings.showCardArea && <span className="flex items-center gap-0.5"><Maximize2 size={10} /> {mockProperty.area}m²</span>}
                        {settings.showCardCondo && <span className="flex items-center gap-0.5">Cond: {formatPrice(mockProperty.condoPrice)}</span>}
                        {settings.showCardPetFriendly && <span className="text-emerald-500 font-semibold">Pet</span>}
                      </div>
                      <div className="text-sm font-bold text-amber-400">{formatPrice(mockProperty.price)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Variant de Cards</label>
                <select 
                  value={settings.cardVariant}
                  onChange={(e) => setSettings({ ...settings, cardVariant: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
                >
                  <option value="default">Padrão Destaque (Completo com foto proporcional)</option>
                  <option value="compact">Compacto Autoral (Grade densa moderna)</option>
                  <option value="horizontal">Grade Horizontal (Lista editorial)</option>
                </select>
              </div>

              {/* Toggles for details */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.showCardBedrooms} onChange={(e) => setSettings({ ...settings, showCardBedrooms: e.target.checked })} className="rounded border-slate-700 bg-slate-950 text-amber-500 w-3.5 h-3.5" />
                  Quartos
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.showCardBathrooms} onChange={(e) => setSettings({ ...settings, showCardBathrooms: e.target.checked })} className="rounded border-slate-700 bg-slate-950 text-amber-500 w-3.5 h-3.5" />
                  Banheiros
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.showCardArea} onChange={(e) => setSettings({ ...settings, showCardArea: e.target.checked })} className="rounded border-slate-700 bg-slate-950 text-amber-500 w-3.5 h-3.5" />
                  Área (m²)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.showCardCondo} onChange={(e) => setSettings({ ...settings, showCardCondo: e.target.checked })} className="rounded border-slate-700 bg-slate-950 text-amber-500 w-3.5 h-3.5" />
                  Condomínio
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.showCardPetFriendly} onChange={(e) => setSettings({ ...settings, showCardPetFriendly: e.target.checked })} className="rounded border-slate-700 bg-slate-950 text-amber-500 w-3.5 h-3.5" />
                  Aceita Pets
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 4: Structured Layout & Modules */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layout className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Header, Hero & Módulos</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preset Header</label>
                <select value={settings.headerStyle} onChange={(e) => setSettings({ ...settings, headerStyle: e.target.value as any })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200">
                  <option value="minimal">Minimal</option>
                  <option value="transparent">Transparent</option>
                  <option value="classic">Classic</option>
                </select>
              </div>
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preset Footer</label>
                <select value={settings.footerStyle} onChange={(e) => setSettings({ ...settings, footerStyle: e.target.value as any })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200">
                  <option value="simple">Simple</option>
                  <option value="detailed">Detailed</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              <div>
                <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preset Hero</label>
                <select value={settings.heroStyle} onChange={(e) => setSettings({ ...settings, heroStyle: e.target.value as any })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200">
                  <option value="minimalist">Minimalist</option>
                  <option value="search-centered">Centered</option>
                  <option value="search-left">Left Align</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Título & Banner Principal</label>
              <input type="text" value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200" placeholder="Título..." />
              <textarea value={settings.heroSubtitle} onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 resize-none h-16" placeholder="Subtítulo..." />
            </div>

            {/* Checkboxes liga/desliga de seções da home */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-3">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Seções Ativas (Home)</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.modules.featured} onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, featured: e.target.checked } })} className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5" />
                  Destaques
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.modules.categories} onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, categories: e.target.checked } })} className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5" />
                  Categorias
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.modules.cities} onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, cities: e.target.checked } })} className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5" />
                  Cidades
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input type="checkbox" checked={settings.modules.testimonials} onChange={(e) => setSettings({ ...settings, modules: { ...settings.modules, testimonials: e.target.checked } })} className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5" />
                  Depoimentos
                </label>
              </div>
            </div>

            {/* MINI LAYOUT FLOW PREVIEW */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 space-y-3">
              <span className="block text-[8px] font-bold uppercase tracking-widest text-amber-400">Esquema Dinâmico do Layout (LEGO Blocks)</span>
              
              <div className="border border-slate-800 rounded-xl bg-slate-900/60 p-3 max-w-sm mx-auto space-y-2 text-[9px] font-mono text-slate-400">
                {/* Header block preview */}
                <div className={`p-1.5 rounded border text-center transition-all ${
                  settings.headerStyle === 'transparent' ? 'border-dashed border-teal-500/40 bg-teal-500/5 text-teal-400' :
                  settings.headerStyle === 'classic' ? 'border-slate-700 bg-slate-800/80 text-slate-200 font-bold' :
                  'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}>
                  [Header: {settings.headerStyle.toUpperCase()}]
                </div>

                {/* Hero block preview */}
                <div className="p-3 rounded border text-center bg-gradient-to-r from-amber-500/5 to-amber-600/5 border-amber-500/20 text-amber-400 space-y-1 transition-all">
                  <div className={`font-bold text-[10px] ${
                    settings.heroStyle === 'search-centered' ? 'text-center' : 'text-left'
                  }`}>
                    {settings.heroTitle || 'Título do Hero'}
                  </div>
                  <div className={`text-[7px] text-slate-500 ${
                    settings.heroStyle === 'search-centered' ? 'text-center' : 'text-left'
                  }`}>
                    {settings.heroSubtitle || 'Subtítulo do Hero'}
                  </div>
                  {settings.heroStyle !== 'minimalist' && (
                    <div className={`mt-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded text-[7px] max-w-[120px] ${
                      settings.heroStyle === 'search-centered' ? 'mx-auto' : ''
                    }`}>
                      🔍 Barra de Busca
                    </div>
                  )}
                </div>

                {/* Active Modules Stack */}
                <div className="space-y-1">
                  <div className="text-[7px] uppercase tracking-wider text-slate-500 mb-1 flex justify-between items-center">
                    <span>Fluxo de Módulos (Reordenar)</span>
                    <span className="text-[6px] text-amber-500 font-bold">USE AS SETAS</span>
                  </div>
                  
                  {settings.moduleOrder.map((modKey, idx) => {
                    const isActive = settings.modules[modKey as keyof typeof settings.modules];
                    const label = modKey === 'featured' ? '✨ Seção Destaques' :
                                  modKey === 'categories' ? '🗂️ Categorias Rápidas' :
                                  modKey === 'cities' ? '🏙️ Cidades & Filtros' :
                                  '💬 Depoimentos Clientes';

                    return (
                      <div 
                        key={modKey} 
                        className={`p-1.5 rounded border flex items-center justify-between px-2.5 transition-all ${
                          isActive 
                            ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-medium' 
                            : 'border-dashed border-slate-800 bg-slate-950/20 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {/* Up/Down controls */}
                          <div className="flex flex-col gap-0.5 mr-1">
                            <button 
                              type="button"
                              disabled={idx === 0} 
                              onClick={() => moveModule(idx, 'up')}
                              className="text-slate-500 hover:text-amber-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            >
                              <ChevronUp size={10} />
                            </button>
                            <button 
                              type="button"
                              disabled={idx === settings.moduleOrder.length - 1} 
                              onClick={() => moveModule(idx, 'down')}
                              className="text-slate-500 hover:text-amber-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            >
                              <ChevronDown size={10} />
                            </button>
                          </div>
                          <span>{label}</span>
                        </div>
                        <span className={`text-[7px] px-1 rounded ${isActive ? 'bg-emerald-500/10' : 'bg-slate-800/10 text-slate-500'}`}>
                          {isActive ? 'ATIVO' : 'INATIVO'}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Footer preview */}
                <div className={`p-1.5 rounded border text-center text-slate-500 border-slate-850 bg-slate-950/40 text-[7px]`}>
                  [Footer: {settings.footerStyle.toUpperCase()} · Creci Ativo]
                </div>

              </div>
            </div>
          </div>

          {/* SECTION 5: Dynamic Team Array config */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="text-amber-400" size={16} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Equipe & Corretores</h2>
              </div>
              <button onClick={addTeamMember} className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-amber-500/10">
                <Plus size={12} /> Adicionar
              </button>
            </div>

            <div className="space-y-4">
              {settings.team.map((member, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 relative space-y-4 hover:border-slate-700 transition-colors">
                  <button onClick={() => removeTeamMember(idx)} className="absolute top-3 right-3 text-slate-500 hover:text-red-400 p-1 cursor-pointer transition-colors" title="Remover corretor">
                    <Trash2 size={14} />
                  </button>
                  
                  {/* Premium Header/Avatar section */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center shrink-0">
                      {member.photo ? (
                        <img src={member.photo} className="w-full h-full object-cover" onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }} />
                      ) : (
                        <Users size={18} className="text-slate-600" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{member.name || 'Sem nome'}</div>
                      <div className="text-[10px] text-amber-500 font-mono font-medium uppercase tracking-wider">{member.role || 'Sem cargo'}</div>
                    </div>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-900">
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Nome Completo</label>
                      <input type="text" value={member.name} onChange={(e) => updateTeamMember(idx, 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="Nome" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Cargo / Especialidade</label>
                      <input type="text" value={member.role} onChange={(e) => updateTeamMember(idx, 'role', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="Cargo" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"><Phone size={8} /> WhatsApp</label>
                      <input type="text" value={member.phone || ''} onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="(41) 99999-9999" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"><Mail size={8} /> E-mail Profissional</label>
                      <input type="text" value={member.email || ''} onChange={(e) => updateTeamMember(idx, 'email', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="nome@lumina.com.br" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"><ImageIcon size={8} /> Link da Foto de Perfil</label>
                      <input type="text" value={member.photo || ''} onChange={(e) => updateTeamMember(idx, 'photo', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="https://..." />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"><Instagram size={8} /> Perfil do Instagram</label>
                      <input type="text" value={member.instagram || ''} onChange={(e) => updateTeamMember(idx, 'instagram', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:border-slate-700 focus:outline-none" placeholder="https://instagram.com/..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: Pages Customization (Sobre & Contato) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Type className="text-amber-400" size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Páginas Internas (Sobre & Contato)</h2>
            </div>

            {/* Sobre Nós Inputs */}
            <div className="space-y-4">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-amber-500">📖 Conteúdo da Página Sobre Nós</span>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Título Principal</label>
                  <input type="text" value={settings.sobreTitle} onChange={(e) => setSettings({ ...settings, sobreTitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="Ex: Nossa História" />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Texto Institucional</label>
                  <textarea value={settings.sobreText} onChange={(e) => setSettings({ ...settings, sobreText: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none resize-none h-20" placeholder="História..." />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"><ImageIcon size={8} /> Link da Imagem Institucional</label>
                  <input type="text" value={settings.sobreImage} onChange={(e) => setSettings({ ...settings, sobreImage: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Estatísticas (Separadas por " · ")</label>
                  <input type="text" value={settings.sobreStats} onChange={(e) => setSettings({ ...settings, sobreStats: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="Ex: 10 Anos · 500+ Clientes" />
                </div>
              </div>
            </div>

            {/* Contato Inputs */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-amber-500">📞 Conteúdo da Página Contato</span>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Título de Contato</label>
                  <input type="text" value={settings.contatoTitle} onChange={(e) => setSettings({ ...settings, contatoTitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="Ex: Entre em Contato" />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">Subtítulo / Chamada</label>
                  <input type="text" value={settings.contatoSubtitle} onChange={(e) => setSettings({ ...settings, contatoSubtitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="Ex: Agende uma visita" />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">Endereço Físico</label>
                  <input type="text" value={settings.contatoAddress} onChange={(e) => setSettings({ ...settings, contatoAddress: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-slate-200 focus:outline-none" placeholder="Rua..." />
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: Live Interactive Real-time Site Preview (Sticky Scroll Following) */}
        <section className="lg:col-span-6 bg-slate-950 flex flex-col lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-8.5rem)] z-20 border-t lg:border-t-0 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          <div className="bg-slate-900/60 backdrop-blur border-b border-slate-850 px-6 py-3 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Live Preview Real-time (Fidelidade do Tema)</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-full text-[9px] text-slate-500 font-mono">
              <span>Lumina Subpage Overlay Mode</span>
            </div>
          </div>

          {/* Real-time Subpage Switcher Tab bar */}
          <div className="p-3 bg-slate-900/40 border-b border-slate-850 flex justify-center shrink-0">
            <div className="flex bg-slate-950 border border-slate-800 rounded-full p-1 max-w-xs w-full justify-between items-center font-sans">
              <button 
                type="button"
                onClick={() => setActivePreviewTab('home')}
                className={`flex-1 py-1 px-2.5 rounded-full text-[9px] font-bold transition-all text-center cursor-pointer ${
                  activePreviewTab === 'home' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🏠 Home
              </button>
              <button 
                type="button"
                onClick={() => setActivePreviewTab('sobre')}
                className={`flex-1 py-1 px-2.5 rounded-full text-[9px] font-bold transition-all text-center cursor-pointer ${
                  activePreviewTab === 'sobre' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📖 Sobre
              </button>
              <button 
                type="button"
                onClick={() => setActivePreviewTab('contato')}
                className={`flex-1 py-1 px-2.5 rounded-full text-[9px] font-bold transition-all text-center cursor-pointer ${
                  activePreviewTab === 'contato' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📞 Contato
              </button>
            </div>
          </div>

          {/* Interactive Screen Simulation */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-950 flex justify-center items-start">
            
            {/* Embedded simulation container styled dynamically */}
            <div 
              style={previewStyles}
              className="w-full max-w-2xl bg-cream text-charcoal border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
            >
              <div style={{ fontFamily: fonts.sans }} className="text-charcoal leading-relaxed">
                
                {/* Header navbar preset */}
                <header className={`px-5 py-4 flex items-center justify-between border-b border-cream-border ${
                  settings.headerStyle === 'transparent' ? 'bg-cream/20 backdrop-blur-sm' : 'bg-cream-dark'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-cream text-xs font-bold font-display">
                      {defaultTenant?.name?.charAt(0) || 'L'}
                    </div>
                    <span className="text-xs font-bold font-display tracking-tight text-charcoal">{defaultTenant?.name || 'Lumina'}</span>
                  </div>
                  <nav className="flex items-center gap-3 text-[10px] font-semibold text-charcoal/70">
                    <span onClick={() => setActivePreviewTab('home')} className="cursor-pointer hover:text-charcoal transition-colors">Home</span>
                    <span onClick={() => setActivePreviewTab('sobre')} className="cursor-pointer hover:text-charcoal transition-colors">Sobre</span>
                    <span onClick={() => setActivePreviewTab('contato')} className="cursor-pointer hover:text-charcoal transition-colors">Contato</span>
                  </nav>
                </header>

                {activePreviewTab === 'home' ? (
                  <>
                    {/* Hero preset styling dynamic */}
                    <div className="relative px-6 py-12 text-center overflow-hidden flex flex-col justify-center min-h-[220px]">
                      <img src={settings.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-15" />
                      <div className="relative z-10 max-w-md mx-auto space-y-2">
                        <h2 
                          style={{ fontFamily: fonts.display }}
                          className="text-2xl font-bold leading-tight text-charcoal font-display"
                        >
                          {settings.heroTitle}
                        </h2>
                        <p className="text-[10px] text-warm-gray leading-normal">{settings.heroSubtitle}</p>
                        
                        {settings.heroStyle !== 'minimalist' && (
                          <div className="flex gap-1.5 bg-white/95 p-1 rounded-lg border border-cream-border max-w-xs mx-auto mt-3">
                            <input disabled placeholder="Cidade ou tipo..." className="w-full text-[9px] bg-transparent p-1 px-2 pointer-events-none" />
                            <span className="bg-gold text-cream text-[9px] font-bold p-1 px-3.5 rounded flex items-center">Buscar</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active Modules & Card Grid rendered in dynamic order */}
                    <div className="p-6 space-y-6">
                      {(settings.moduleOrder || ['featured', 'categories', 'cities', 'testimonials']).map((modKey: string) => {
                        if (modKey === 'featured' && settings.modules.featured) {
                          return (
                            <div key="featured" className="space-y-3">
                              <div className="text-left">
                                <h3 style={{ fontFamily: fonts.display }} className="text-sm font-bold uppercase tracking-wider text-charcoal font-display border-b border-cream-border pb-1">Novidades Exclusivas</h3>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1, 2].map((i) => (
                                  <div 
                                    key={i} 
                                    className={`bg-white border border-cream-border rounded-xl overflow-hidden shadow-sm transition-all ${
                                      settings.cardVariant === 'horizontal' ? 'flex h-24' : ''
                                    }`}
                                  >
                                    <img src={mockProperty.image} className={settings.cardVariant === 'horizontal' ? 'w-20 object-cover' : 'w-full h-24 object-cover'} />
                                    <div className="p-2.5 flex flex-col justify-between flex-1 text-left">
                                      <div>
                                        <div className="text-[7px] text-warm-gray uppercase tracking-widest font-semibold">{mockProperty.neighborhood}</div>
                                        <div className="text-[10px] font-bold text-charcoal truncate">{mockProperty.title}</div>
                                      </div>
                                      <div>
                                        <div className="flex flex-wrap gap-2 text-[8px] text-warm-gray mb-1">
                                          {settings.showCardBedrooms && <span>{mockProperty.bedrooms} Qts</span>}
                                          {settings.showCardBathrooms && <span>{mockProperty.bathrooms} Banh</span>}
                                          {settings.showCardArea && <span>{mockProperty.area}m²</span>}
                                          {settings.showCardCondo && <span>Cond: {formatPrice(mockProperty.condoPrice)}</span>}
                                          {settings.showCardPetFriendly && <span className="text-emerald-600 font-semibold">Pet</span>}
                                        </div>
                                        <div className="text-xs font-bold text-charcoal font-display">{formatPrice(mockProperty.price)}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        if (modKey === 'categories' && settings.modules.categories) {
                          return (
                            <div key="categories" className="space-y-3">
                              <h3 style={{ fontFamily: fonts.display }} className="text-sm font-bold uppercase tracking-wider text-charcoal font-display border-b border-cream-border pb-1">Categorias de Sucesso</h3>
                              <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold text-charcoal">
                                <span className="bg-cream-dark p-2 rounded-lg border border-cream-border">🏢 Coberturas</span>
                                <span className="bg-cream-dark p-2 rounded-lg border border-cream-border">🏡 Casas Batel</span>
                                <span className="bg-cream-dark p-2 rounded-lg border border-cream-border">📈 Lançamentos</span>
                              </div>
                            </div>
                          )
                        }

                        if (modKey === 'cities' && settings.modules.cities) {
                          return (
                            <div key="cities" className="space-y-3">
                              <h3 style={{ fontFamily: fonts.display }} className="text-sm font-bold uppercase tracking-wider text-charcoal font-display border-b border-cream-border pb-1">Bairros Nobres</h3>
                              <div className="flex gap-2 flex-wrap text-[8px] text-warm-gray">
                                <span className="bg-cream-dark px-2.5 py-1 rounded-full border border-cream-border">📍 Batel</span>
                                <span className="bg-cream-dark px-2.5 py-1 rounded-full border border-cream-border">📍 Ecoville</span>
                                <span className="bg-cream-dark px-2.5 py-1 rounded-full border border-cream-border">📍 Cabral</span>
                                <span className="bg-cream-dark px-2.5 py-1 rounded-full border border-cream-border">📍 Champagnat</span>
                              </div>
                            </div>
                          )
                        }

                        if (modKey === 'testimonials' && settings.modules.testimonials) {
                          return (
                            <div key="testimonials" className="bg-cream-dark p-4 rounded-xl border border-cream-border text-center space-y-2">
                              <p className="text-[10px] italic text-charcoal/70">"Excelente atendimento, a equipe da Lumina me ajudou a comprar minha cobertura suspensa de forma descomplicada."</p>
                              <span className="block text-[8px] font-bold uppercase tracking-wider text-gold">Beatriz Almeida · Batel</span>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </>
                ) : activePreviewTab === 'sobre' ? (
                  <div className="p-6 space-y-6 font-sans">
                    {/* Title */}
                    <div className="space-y-2 text-center pb-4 border-b border-cream-border">
                      <h2 style={{ fontFamily: fonts.display }} className="text-xl font-bold font-display text-charcoal">{settings.sobreTitle}</h2>
                      <div className="text-[8px] font-mono text-warm-gray uppercase tracking-wider">História & Propósito</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                      <div className="space-y-3 text-left">
                        <p className="text-[10px] text-charcoal/80 leading-relaxed whitespace-pre-line">{settings.sobreText}</p>
                        
                        {/* Stats indicator */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(settings.sobreStats || '').split(' · ').map((stat: string, idx: number) => (
                            <span key={idx} className="bg-cream-dark border border-cream-border px-2 py-0.5 rounded text-[8px] font-medium text-warm-gray">{stat}</span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Image section */}
                      <div className="rounded-xl overflow-hidden border border-cream-border h-40 bg-cream-dark">
                        {settings.sobreImage && (
                          <img src={settings.sobreImage} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </div>

                    {/* Active Team/Corretores inside about subpage */}
                    {settings.team && settings.team.length > 0 && (
                      <div className="space-y-3 pt-6 border-t border-cream-border">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal text-center font-display">Nossa Equipe</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {settings.team.map((member: any, idx: number) => (
                            <div key={idx} className="bg-cream-dark border border-cream-border p-2.5 rounded-xl flex gap-2.5 items-center text-left">
                              <div className="w-8 h-8 rounded-full border border-cream-border overflow-hidden shrink-0 bg-white">
                                {member.photo ? (
                                  <img src={member.photo} className="w-full h-full object-cover" />
                                ) : (
                                  <Users size={14} className="text-slate-400 m-auto mt-2" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="text-[9px] font-bold text-charcoal truncate">{member.name}</div>
                                <div className="text-[7px] text-gold uppercase tracking-wider truncate font-semibold">{member.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 space-y-6 font-sans">
                    {/* Header title */}
                    <div className="space-y-2 text-center pb-4 border-b border-cream-border">
                      <h2 style={{ fontFamily: fonts.display }} className="text-xl font-bold font-display text-charcoal">{settings.contatoTitle}</h2>
                      <p className="text-[9px] text-warm-gray">{settings.contatoSubtitle}</p>
                    </div>

                    {/* Form Layout Split */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4 text-left text-[10px]">
                        <div>
                          <div className="font-bold text-charcoal uppercase tracking-wider text-[8px] mb-1">Nosso Endereço</div>
                          <p className="text-warm-gray leading-relaxed">{settings.contatoAddress}</p>
                        </div>
                        <div>
                          <div className="font-bold text-charcoal uppercase tracking-wider text-[8px] mb-1">Canais Diretos</div>
                          <p className="text-warm-gray flex items-center gap-1">📞 {contacts.phone}</p>
                          <p className="text-warm-gray flex items-center gap-1">✉️ {contacts.email}</p>
                        </div>
                      </div>

                      {/* Mockup Form using active gold colors */}
                      <div className="bg-cream-dark p-4 rounded-xl border border-cream-border space-y-2 text-left text-[9px]">
                        <div>
                          <input disabled placeholder="Seu Nome" className="w-full bg-white border border-cream-border rounded p-1.5 focus:outline-none pointer-events-none" />
                        </div>
                        <div>
                          <input disabled placeholder="Seu WhatsApp" className="w-full bg-white border border-cream-border rounded p-1.5 focus:outline-none pointer-events-none" />
                        </div>
                        <div>
                          <textarea disabled placeholder="Sua Mensagem..." className="w-full bg-white border border-cream-border rounded p-1.5 resize-none h-12 focus:outline-none pointer-events-none" />
                        </div>
                        <button type="button" className="w-full bg-gold text-cream font-bold py-1.5 rounded uppercase tracking-wider text-[9px] cursor-not-allowed">Enviar Mensagem</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer simulation */}
                <footer className="bg-charcoal text-cream/70 p-5 text-center text-[9px] border-t border-cream-border space-y-2">
                  <div className="flex justify-between items-center text-[8px] border-b border-cream-border/10 pb-2">
                    <span className="font-bold text-cream font-display">{defaultTenant?.name}</span>
                    <span>{contacts.creci}</span>
                  </div>
                  <p>© 2026 Plataforma LEGO. Powered by Microsistec.</p>
                </footer>

              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  )
}
