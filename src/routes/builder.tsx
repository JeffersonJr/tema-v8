import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
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
  Image as ImageIcon,
  Upload,
  ChevronRight,
  Sparkles,
  Layers,
  FileText,
  X,
  Move,
  Globe,
  Search,
  ArrowRight,
} from 'lucide-react'
import { getTenantById } from '@/data/tenants'
import { formatPrice } from '@/data/properties'

export const Route = createFileRoute('/builder')({
  component: BuilderPage,
})

// ─── FONTS ──────────────────────────────────────────────────────────────────
const FONTS_LIST = [
  { name: 'Inter', category: 'sans-serif', desc: 'Moderno, limpo e extremamente legível' },
  { name: 'DM Sans', category: 'sans-serif', desc: 'Arrojado, contemporâneo e suave' },
  { name: 'Outfit', category: 'sans-serif', desc: 'Arquitetônico, geométrico e vanguardista' },
  { name: 'Playfair Display', category: 'serif', desc: 'Clássico, editorial e altamente luxuoso' },
  { name: 'Montserrat', category: 'sans-serif', desc: 'Urbano, corporativo e elegante' },
  { name: 'Lora', category: 'serif', desc: 'Literário, requintado e tradicional' },
  { name: 'Cormorant Garamond', category: 'serif', desc: 'Sofisticação extrema, traços finos' },
  { name: 'Syne', category: 'display', desc: 'Artesanal, autoral e focado em design' },
]

// ─── COLOR PRESETS ───────────────────────────────────────────────────────────
const COLOR_PRESETS = [
  {
    name: 'Ouro Imperial & Cream',
    desc: 'O clássico requinte de alto padrão',
    colors: { cream: '#F5F0E8', creamDark: '#EDE8DE', creamBorder: '#E0DAD0', charcoal: '#1C1916', charcoalLight: '#3D3731', warmGray: '#7C7269', gold: '#EDBF71', goldLight: '#F0D080' },
  },
  {
    name: 'Curitiba Verde Esmeralda',
    desc: 'Conexão com a sustentabilidade urbana',
    colors: { cream: '#F4F7F5', creamDark: '#E8EFEA', creamBorder: '#D2DFD6', charcoal: '#0D2114', charcoalLight: '#183824', warmGray: '#5C7465', gold: '#3A8266', goldLight: '#55A082' },
  },
  {
    name: 'Batel Noir & Platina',
    desc: 'Luxo vanguardista contemporâneo',
    colors: { cream: '#FAFAFA', creamDark: '#F4F4F5', creamBorder: '#E4E4E7', charcoal: '#09090B', charcoalLight: '#27272A', warmGray: '#717178', gold: '#18181B', goldLight: '#3F3F46' },
  },
  {
    name: 'Midnight & Safira',
    desc: 'Profundidade, prestígio e elegância noturna',
    colors: { cream: '#0B132B', creamDark: '#1C2541', creamBorder: '#3A506B', charcoal: '#FFFFFF', charcoalLight: '#F1F5F9', warmGray: '#94A3B8', gold: '#4895EF', goldLight: '#4CC9F0' },
  },
  {
    name: 'Coral Quente & Terracota',
    desc: 'Aconchego, calor e sofisticação orgânica',
    colors: { cream: '#FDFBF7', creamDark: '#F7F3EB', creamBorder: '#EFE6D5', charcoal: '#2D1E18', charcoalLight: '#4E3629', warmGray: '#8A7264', gold: '#E07A5F', goldLight: '#F4A261' },
  },
]

// ─── STYLE PRESETS ───────────────────────────────────────────────────────────
const STYLE_PRESETS = [
  {
    id: 'moderno',
    name: 'Moderno',
    desc: 'Cores platina e safira com tipografia geométrica vanguardista.',
    colors: { cream: '#FAF9F6', creamDark: '#F0EFEA', creamBorder: '#E2E1D9', charcoal: '#0F172A', charcoalLight: '#1E293B', warmGray: '#64748B', gold: '#0EA5E9', goldLight: '#38BDF8' },
    fonts: { sans: 'Inter', display: 'Outfit' },
    settings: { headerStyle: 'minimal' as const, footerStyle: 'simple' as const, heroStyle: 'search-centered' as const, heroTitle: 'Coleção de Lançamentos Modernos', heroSubtitle: 'Apartamentos suspensos de alto padrão com arquitetura de vanguarda.', cardVariant: 'compact' as const, modules: { featured: true, categories: true, cities: true, testimonials: true, blog: true, launches: true }, moduleOrder: ['featured', 'categories', 'cities', 'testimonials'], sobreTitle: 'Vanguarda e Excelência Imobiliária', sobreText: 'Desenvolvemos curadorias específicas para clientes exigentes.', sobreImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', sobreStats: '10 Anos · 500+ Imóveis · R$ 2B+ Negociados', contatoTitle: 'Fale Conosco', contatoSubtitle: 'Fale com nossos curadores agora mesmo.', contatoAddress: 'Av. Batel, 1550 - Batel, Curitiba - PR' },
  },
  {
    id: 'minimalista',
    name: 'Minimalista',
    desc: 'Espaço, luz, contrastes puros e tipografia grotesca.',
    colors: { cream: '#FFFFFF', creamDark: '#F8F9FA', creamBorder: '#E9ECEF', charcoal: '#111111', charcoalLight: '#1F1F1F', warmGray: '#6C757D', gold: '#111111', goldLight: '#444444' },
    fonts: { sans: 'Inter', display: 'Inter' },
    settings: { headerStyle: 'transparent' as const, footerStyle: 'minimal' as const, heroStyle: 'minimalist' as const, heroTitle: 'Lumina Curadoria Imobiliária', heroSubtitle: 'Espaço, silêncio e luz natural. Uma seleção rigorosa de imóveis de grife.', cardVariant: 'horizontal' as const, modules: { featured: true, categories: false, cities: false, testimonials: false, blog: false, launches: false }, moduleOrder: ['featured', 'categories', 'cities', 'testimonials'], sobreTitle: 'Silêncio, Espaço e Luz', sobreText: 'Nossa missão é simples: filtrar o excesso.', sobreImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', sobreStats: 'Curadoria Exclusiva · 0% Excesso · 100% Foco no Design', contatoTitle: 'Conexão Direta', contatoSubtitle: 'Seja atendido de forma confidencial por um de nossos diretores.', contatoAddress: 'Batel, Curitiba - PR' },
  },
  {
    id: 'classico',
    name: 'Clássico',
    desc: 'Tons creme aquecidos, detalhes dourados e tipografia serifada.',
    colors: { cream: '#FDFBF7', creamDark: '#F7F3EB', creamBorder: '#EFE6D5', charcoal: '#2D1E18', charcoalLight: '#4E3629', warmGray: '#8A7264', gold: '#EDBF71', goldLight: '#F0D080' },
    fonts: { sans: 'DM Sans', display: 'Playfair Display' },
    settings: { headerStyle: 'classic' as const, footerStyle: 'detailed' as const, heroStyle: 'search-left' as const, heroTitle: 'Residências de Prestígio Extraordinário', heroSubtitle: 'A herança viva da sofisticação e conforto no Batel, Cabral e Ecoville.', cardVariant: 'default' as const, modules: { featured: true, categories: true, cities: true, testimonials: true, blog: true, launches: true }, moduleOrder: ['featured', 'categories', 'cities', 'testimonials'], sobreTitle: 'Uma Tradição em Alto Padrão', sobreText: 'Há mais de uma década, somos sinônimo de excelência imobiliária.', sobreImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', sobreStats: '15 Anos de Tradição · R$ 1.5B+ Negociados · 100% Satisfeitos', contatoTitle: 'Agende uma Reunião Privada', contatoSubtitle: 'Estamos prontos para recebê-lo em nossa sede no Batel.', contatoAddress: 'Av. do Batel, 1200 - Batel, Curitiba - PR' },
  },
]

// ─── CARD TAGS ───────────────────────────────────────────────────────────────
const CARD_TAGS = [
  { id: 'none', label: 'Nenhuma', color: 'bg-slate-200 text-slate-600', emoji: '—' },
  { id: 'destaque', label: 'Destaque', color: 'bg-amber-500 text-white', emoji: '⭐' },
  { id: 'exclusivo', label: 'Exclusivo', color: 'bg-violet-600 text-white', emoji: '💎' },
  { id: 'oportunidade', label: 'Oportunidade', color: 'bg-red-500 text-white', emoji: '🔥' },
  { id: 'novo', label: 'Novo', color: 'bg-emerald-500 text-white', emoji: '✨' },
  { id: 'lancamento', label: 'Lançamento', color: 'bg-blue-600 text-white', emoji: '🚀' },
]

// ─── HOME BLOCKS AVAILABLE ───────────────────────────────────────────────────
const ALL_HOME_BLOCKS = [
  { id: 'stats', label: '📊 Stats Bar', desc: 'Números de destaque da empresa' },
  { id: 'featured', label: '✨ Imóveis em Destaque', desc: 'Grid premium de imóveis selecionados' },
  { id: 'categories', label: '🗂️ Categorias', desc: 'Comprar, Alugar, Lançamentos' },
  { id: 'launches', label: '🚀 Novos Lançamentos', desc: 'Cards de empreendimentos na planta' },
  { id: 'cities', label: '🏙️ Cidades & Bairros', desc: 'Onde a empresa atua' },
  { id: 'testimonials', label: '💬 Depoimentos', desc: 'O que dizem os clientes' },
  { id: 'cta', label: '📣 CTA (Anunciar)', desc: 'Chamada para anunciar imóvel' },
  { id: 'tags', label: '🔗 Nuvem de Tags', desc: 'Termos de busca populares' },
]

// ─── PAGE STRUCTURES ─────────────────────────────────────────────────────────
const PAGE_STRUCTURES = [
  { id: 'editorial', name: 'Editorial', desc: '2 colunas · Texto + Imagem lado a lado', icon: '📰' },
  { id: 'centered', name: 'Centrado', desc: 'Conteúdo centralizado · Hero no topo', icon: '🎯' },
  { id: 'magazine', name: 'Magazine', desc: 'Header imersivo + seções em blocos', icon: '✦' },
]

const PAGE_BLOCKS_OPTIONS = [
  { id: 'hero', label: 'Hero / Banner' },
  { id: 'text', label: 'Texto Principal' },
  { id: 'stats', label: 'Estatísticas' },
  { id: 'team', label: 'Equipe' },
  { id: 'form', label: 'Formulário' },
  { id: 'testimonials', label: 'Depoimentos' },
  { id: 'cta', label: 'Call to Action' },
  { id: 'gallery', label: 'Galeria' },
]

// ─── SUBPAGES ────────────────────────────────────────────────────────────────
const SUBPAGES = [
  { id: 'comprar', label: 'Comprar', emoji: '🏠', editable: false },
  { id: 'alugar', label: 'Alugar', emoji: '🔑', editable: false },
  { id: 'lancamentos', label: 'Lançamentos', emoji: '🚀', editable: false },
  { id: 'anunciar', label: 'Anunciar', emoji: '📣', editable: true },
  { id: 'blog', label: 'Blog', emoji: '📝', editable: false },
  { id: 'sobre', label: 'Sobre', emoji: '📖', editable: true },
  { id: 'contato', label: 'Contato', emoji: '📞', editable: true },
]

// ─── MOCK PROPERTY ───────────────────────────────────────────────────────────
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

// ─── SECTION ACCORDION ──────────────────────────────────────────────────────
function SectionAccordion({ icon, title, defaultOpen = true, children }: { icon: React.ReactNode; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-amber-500">{icon}</span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">{title}</h2>
        </div>
        <ChevronRight size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 space-y-5 border-t border-slate-100">{children}</div>}
    </div>
  )
}

// ─── TOGGLE ─────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-amber-500' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </div>
      <span className="text-xs text-slate-700 group-hover:text-slate-900 font-medium">{label}</span>
    </label>
  )
}

// ─── INPUT FIELD ────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-400 transition-colors"
      />
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-400 transition-colors resize-none"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function BuilderPage() {
  const defaultTenant = getTenantById('lumina')

  // Colors & fonts
  const [colors, setColors] = useState({
    cream: '#FAFAFA', creamDark: '#F4F4F5', creamBorder: '#E4E4E7',
    charcoal: '#09090B', charcoalLight: '#27272A', warmGray: '#717178',
    gold: '#18181B', goldLight: '#3F3F46',
  })
  const [fonts, setFonts] = useState({ sans: 'Inter', display: 'Outfit' })

  // UI state
  const [activePreviewTab, setActivePreviewTab] = useState('home')
  const [activeFontTab, setActiveFontTab] = useState<'sans' | 'display'>('sans')
  const previewTabsRef = useRef<HTMLDivElement>(null)

  // Settings
  const [settings, setSettings] = useState({
    headerStyle: 'minimal' as 'transparent' | 'minimal' | 'classic',
    headerFixed: true,
    footerStyle: 'simple' as 'simple' | 'detailed' | 'minimal',
    heroStyle: 'minimalist' as 'search-centered' | 'search-left' | 'minimalist' | 'split-screen' | 'video-ambient',
    heroTitle: 'Coleção Lançamentos Curitiba',
    heroSubtitle: 'Curadoria especializada de apartamentos, coberturas e residências suspensas com design assinado.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
    logo: '/logo.png',
    marcaDagua: '',
    favicon: '/favicon.ico',
    cardVerticalStyle: 'classic' as 'classic' | 'minimalist' | 'glassmorphism' | 'editorial' | 'bold-border' | 'dark-elegance',
    cardHorizontalStyle: 'cozy' as 'cozy' | 'strip' | 'overlay' | 'offset' | 'asymmetric' | 'dashboard',
    cardTag: 'destaque' as string,
    showCardBedrooms: true,
    showCardBathrooms: false,
    showCardArea: true,
    showCardCondo: false,
    showCardPetFriendly: false,
    modules: { featured: true, categories: true, cities: true, testimonials: false, blog: true, launches: true },
    homeBlocks: ['stats', 'featured', 'categories', 'launches', 'cities', 'testimonials', 'cta', 'tags'],
    enabledPages: {
      comprar: true, alugar: true, lancamentos: true,
      anunciar: true, blog: true, sobre: true, contato: true,
    },
    pageStructures: {
      sobre: 'editorial' as 'editorial' | 'centered' | 'magazine',
      anunciar: 'editorial' as 'editorial' | 'centered' | 'magazine',
      contato: 'editorial' as 'editorial' | 'centered' | 'magazine',
      blog: 'editorial' as 'editorial' | 'centered' | 'magazine',
    },
    pageBlocks: {
      sobre: ['hero', 'text', 'stats', 'team'],
      anunciar: ['hero', 'text', 'form'],
      contato: ['hero', 'form', 'text'],
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
    anunciarTitle: 'Anuncie seu Imóvel',
    anunciarSubtitle: 'Alcance milhares de compradores qualificados com nossa plataforma premium.',
    contatoTitle: 'Conecte-se com a Exclusividade',
    contatoSubtitle: 'Agende uma visita exclusiva com nossos curadores de imóveis no Batel.',
    contatoAddress: 'Av. do Batel, 1200 - Batel, Curitiba/PR',
  })

  const [contacts, setContacts] = useState({
    phone: '(41) 3012-9876',
    phoneRaw: '+554130129876',
    whatsapp: '(41) 98877-6655',
    whatsappRaw: '5541988776655',
    email: 'curadoria@luminaimoveis.com.br',
    creci: 'CRECI-PR 45.892-F',
    address: { street: 'Alameda Dom Pedro II, nº 321', neighborhood: 'Batel', city: 'Curitiba', state: 'PR', fullAddress: 'Edifício Batel Workspace, Batel, Curitiba - PR' },
  })

  // File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'logo' | 'marcaDagua' | 'favicon' | 'heroImage') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setSettings(prev => ({ ...prev, [key]: base64 }))
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && settings.favicon) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
      if (link) { link.href = settings.favicon }
      else { const l = document.createElement('link'); l.rel = 'icon'; l.href = settings.favicon; document.head.appendChild(l) }
    }
  }, [settings.favicon])

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lumina_builder_settings')
      if (stored) {
        try {
          const p = JSON.parse(stored)
          if (p.colors) setColors(p.colors)
          if (p.fonts) setFonts(p.fonts)
          if (p.contacts) setContacts(p.contacts)
          setSettings(prev => ({
            ...prev,
            ...p,
            modules: { ...prev.modules, ...(p.modules || {}) },
            enabledPages: { ...prev.enabledPages, ...(p.enabledPages || {}) },
            pageStructures: { ...prev.pageStructures, ...(p.pageStructures || {}) },
            pageBlocks: { ...prev.pageBlocks, ...(p.pageBlocks || {}) },
            homeBlocks: p.homeBlocks || prev.homeBlocks,
            team: p.team || (defaultTenant?.builderSettings?.team || []),
          }))
        } catch (e) { console.error(e) }
      } else if (defaultTenant) {
        setSettings(prev => ({ ...prev, team: defaultTenant.builderSettings.team }))
      }
    }
  }, [])

  const handleSave = (redirectToSite = false) => {
    if (typeof window !== 'undefined') {
      const payload = { ...settings, colors, fonts, contacts, creci: contacts.creci }
      localStorage.setItem('lumina_builder_settings', JSON.stringify(payload))
      window.dispatchEvent(new Event('lumina_builder_updated'))
      if (redirectToSite) { window.open('/lumina', '_blank') }
      else { alert('Identidade visual LEGO e componentes atualizados!') }
    }
  }

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar para o padrão inicial do tema Lumina?')) {
      if (typeof window !== 'undefined') { localStorage.removeItem('lumina_builder_settings'); window.location.reload() }
    }
  }

  // Team
  const addTeamMember = () => {
    setSettings(prev => ({ ...prev, team: [...prev.team, { name: 'Novo Consultor', role: 'Especialista Batel', phone: '(41) 98888-7777', email: 'consultor@lumina.com.br', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', instagram: 'https://instagram.com/' }] }))
  }
  const updateTeamMember = (index: number, key: string, value: string) => {
    const list = [...settings.team]; list[index] = { ...list[index], [key]: value }
    setSettings(prev => ({ ...prev, team: list }))
  }
  const removeTeamMember = (index: number) => {
    setSettings(prev => ({ ...prev, team: prev.team.filter((_: any, i: number) => i !== index) }))
  }

  // Home blocks
  const addHomeBlock = (id: string) => {
    if (!settings.homeBlocks.includes(id)) {
      setSettings(prev => ({ ...prev, homeBlocks: [...prev.homeBlocks, id] }))
    }
  }
  const removeHomeBlock = (id: string) => {
    setSettings(prev => ({ ...prev, homeBlocks: prev.homeBlocks.filter(b => b !== id) }))
  }
  const moveHomeBlock = (index: number, dir: 'up' | 'down') => {
    const list = [...settings.homeBlocks]
    const target = dir === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= list.length) return
    ;[list[index], list[target]] = [list[target], list[index]]
    setSettings(prev => ({ ...prev, homeBlocks: list }))
  }

  // Page blocks
  const togglePageBlock = (page: 'sobre' | 'anunciar' | 'contato', blockId: string) => {
    setSettings(prev => {
      const current = prev.pageBlocks[page] || []
      const next = current.includes(blockId) ? current.filter(b => b !== blockId) : [...current, blockId]
      return { ...prev, pageBlocks: { ...prev.pageBlocks, [page]: next } }
    })
  }

  // Active preview pages
  const activePreviewPages = [
    { id: 'home', label: '🏠 Home', always: true },
    ...SUBPAGES.filter(p => settings.enabledPages[p.id as keyof typeof settings.enabledPages]).map(p => ({ id: p.id, label: `${p.emoji} ${p.label}`, always: false })),
  ]

  // CSS vars for preview
  const previewStyles = {
    '--theme-cream': colors.cream, '--theme-cream-dark': colors.creamDark,
    '--theme-cream-border': colors.creamBorder, '--theme-charcoal': colors.charcoal,
    '--theme-charcoal-light': colors.charcoalLight, '--theme-warm-gray': colors.warmGray,
    '--theme-gold': colors.gold, '--theme-gold-light': colors.goldLight,
    '--theme-font-sans': fonts.sans, '--theme-font-display': fonts.display,
    '--color-cream': colors.cream, '--color-cream-dark': colors.creamDark,
    '--color-cream-border': colors.creamBorder, '--color-charcoal': colors.charcoal,
    '--color-charcoal-light': colors.charcoalLight, '--color-warm-gray': colors.warmGray,
    '--color-gold': colors.gold, '--color-gold-light': colors.goldLight,
    '--font-sans': `'${fonts.sans}', sans-serif`, '--font-display': `'${fonts.display}', serif`,
  } as React.CSSProperties

  // ─── CARD RENDERERS ─────────────────────────────────────────────────────────
  const renderVerticalCard = (property: any, styleName: string, tag?: typeof CARD_TAGS[0]) => {
    const isDark = styleName === 'dark-elegance'
    let cardClass = 'rounded-xl overflow-hidden shadow-sm transition-all border '
    if (styleName === 'classic') cardClass += 'bg-white border-slate-200 hover:shadow-md'
    else if (styleName === 'minimalist') cardClass += 'bg-white border-slate-200 shadow-none hover:border-slate-400'
    else if (styleName === 'glassmorphism') cardClass += 'bg-white/40 backdrop-blur-md border-white/20 shadow-lg'
    else if (styleName === 'editorial') cardClass += 'bg-white border-slate-100 hover:border-slate-300'
    else if (styleName === 'bold-border') cardClass += 'bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#EDBF71]'
    else if (styleName === 'dark-elegance') cardClass += 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl'

    const tagInfo = tag && tag.id !== 'none' ? tag : null

    return (
      <div className={`${cardClass} flex flex-col h-full text-left`}>
        <div className="relative h-28 bg-slate-100 overflow-hidden shrink-0">
          <img src={property.image} className="w-full h-full object-cover" />
          {tagInfo && (
            <span className={`absolute top-2 left-2 ${tagInfo.color} text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider`}>
              {tagInfo.emoji} {tagInfo.label}
            </span>
          )}
          {styleName === 'editorial' && (
            <span className="absolute top-2 right-2 bg-slate-900 text-white font-bold text-[7px] px-1.5 py-0.5 rounded font-display uppercase tracking-widest">Collection</span>
          )}
        </div>
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div className="space-y-1">
            <div className={`text-[7px] uppercase tracking-widest font-semibold ${isDark ? 'text-amber-400/90' : 'text-slate-500'}`}>{property.neighborhood}</div>
            <div className={`text-[10px] font-bold line-clamp-2 leading-tight ${isDark ? 'text-white' : 'text-slate-900'} ${styleName === 'classic' || styleName === 'editorial' ? 'font-display' : ''}`} style={{ fontFamily: styleName === 'classic' || styleName === 'editorial' ? fonts.display : fonts.sans }}>{property.title}</div>
          </div>
          <div className="mt-3">
            <div className={`flex flex-wrap gap-2 text-[8px] border-b pb-1.5 mb-1.5 ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
              {settings.showCardBedrooms && <span><BedDouble size={8} className="inline mr-0.5" />{property.bedrooms} Qts</span>}
              {settings.showCardBathrooms && <span><Bath size={8} className="inline mr-0.5" />{property.bathrooms} Banh</span>}
              {settings.showCardArea && <span><Maximize2 size={8} className="inline mr-0.5" />{property.area}m²</span>}
              {settings.showCardCondo && <span>Cond: {formatPrice(property.condoPrice)}</span>}
              {settings.showCardPetFriendly && <span className="text-emerald-500 font-bold">Pet</span>}
            </div>
            <div className={`text-xs font-bold ${isDark ? 'text-amber-400' : 'text-slate-900'}`} style={{ fontFamily: fonts.display }}>{formatPrice(property.price)}</div>
          </div>
        </div>
      </div>
    )
  }

  const renderHorizontalCard = (property: any, styleName: string, tag?: typeof CARD_TAGS[0]) => {
    let cardClass = 'rounded-xl overflow-hidden shadow-sm transition-all border flex '
    if (styleName === 'cozy') cardClass += 'bg-white border-slate-200 hover:shadow-md h-24'
    else if (styleName === 'strip') cardClass += 'bg-white border-slate-200 shadow-none border-b-2 hover:border-b-slate-400 h-24'
    else if (styleName === 'overlay') cardClass += 'bg-white/50 backdrop-blur-sm border-slate-100 h-24'
    else if (styleName === 'offset') cardClass += 'bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#EDBF71] h-24'
    else if (styleName === 'asymmetric') cardClass += 'bg-white border-slate-200 hover:shadow-md h-24'
    else if (styleName === 'dashboard') cardClass += 'bg-white border-slate-200 shadow-sm h-28'
    const tagInfo = tag && tag.id !== 'none' ? tag : null

    return (
      <div className={`${cardClass} text-left w-full`}>
        <div className={`shrink-0 overflow-hidden bg-slate-100 relative ${styleName === 'asymmetric' ? 'w-24 rounded-tr-3xl rounded-bl-3xl' : 'w-24'}`}>
          <img src={property.image} className="w-full h-full object-cover" />
          {tagInfo && <span className={`absolute top-1.5 left-1.5 ${tagInfo.color} text-[6px] font-bold px-1 py-0.5 rounded-full uppercase`}>{tagInfo.emoji}</span>}
        </div>
        <div className="p-2.5 flex flex-col justify-between flex-1 min-w-0">
          <div className="min-w-0 space-y-0.5">
            <div className="text-[7px] text-slate-500 uppercase tracking-widest font-semibold">{property.neighborhood}</div>
            <div className={`text-[9px] font-bold text-slate-900 truncate`} style={{ fontFamily: styleName === 'asymmetric' ? fonts.display : fonts.sans }}>{property.title}</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5 text-[8px] text-slate-500 mb-1 border-t border-slate-100 pt-1">
              {settings.showCardBedrooms && <span>{property.bedrooms}Q</span>}
              {settings.showCardBathrooms && <span>{property.bathrooms}B</span>}
              {settings.showCardArea && <span>{property.area}m²</span>}
              {settings.showCardCondo && <span className="text-[7px]">Cond: {formatPrice(property.condoPrice)}</span>}
              {settings.showCardPetFriendly && <span className="text-emerald-500 font-bold">Pet</span>}
            </div>
            <div className="text-[10px] font-bold text-slate-900" style={{ fontFamily: fonts.display }}>{formatPrice(property.price)}</div>
          </div>
        </div>
      </div>
    )
  }

  // ─── PREVIEW HERO RENDERER ─────────────────────────────────────────────────
  const renderPreviewHero = () => {
    const heroImg = settings.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop'
    const logoEl = settings.logo ? (
      <img src={settings.logo} className="h-5 w-auto object-contain" alt="Logo" />
    ) : (
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden text-[10px] font-bold" style={{ backgroundColor: colors.gold, color: colors.cream }}>
          {settings.marcaDagua ? <img src={settings.marcaDagua} className="w-full h-full object-cover" /> : (defaultTenant?.name?.charAt(0) || 'L')}
        </div>
        <span className="text-[11px] font-bold tracking-tight" style={{ fontFamily: fonts.display, color: activePreviewTab === 'home' && settings.heroStyle !== 'minimalist' ? '#fff' : colors.charcoal }}>{defaultTenant?.name || 'Lumina'}</span>
      </div>
    )

    const navItems = [
      { id: 'home', label: 'Home' },
      ...SUBPAGES.filter(p => settings.enabledPages[p.id as keyof typeof settings.enabledPages]).map(p => ({ id: p.id, label: p.label })),
    ]

    // Navbar
    const navbar = (
      <header className={`px-4 py-3 flex items-center justify-between ${settings.headerStyle === 'transparent' ? 'absolute top-0 left-0 right-0 z-20 bg-transparent' : settings.headerStyle === 'classic' ? 'border-b' : 'border-b'}`}
        style={{ borderColor: settings.headerStyle === 'transparent' ? 'rgba(255,255,255,0.1)' : colors.creamBorder, backgroundColor: settings.headerStyle === 'transparent' ? 'transparent' : colors.creamDark }}>
        {logoEl}
        <nav className="flex items-center gap-2.5 flex-wrap">
          {navItems.slice(0, 5).map(n => (
            <button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className={`text-[8px] font-semibold transition-colors cursor-pointer ${activePreviewTab === n.id ? 'underline' : 'opacity-70 hover:opacity-100'}`}
              style={{ color: settings.headerStyle === 'transparent' && activePreviewTab === 'home' ? '#fff' : colors.charcoal }}>
              {n.label}
            </button>
          ))}
        </nav>
      </header>
    )

    if (settings.heroStyle === 'split-screen') {
      return (
        <div className="relative">
          {/* Split screen: left dark, right image */}
          <div className="flex min-h-[260px]">
            <div className="flex-1 flex flex-col justify-center p-6 pr-4 relative z-10" style={{ backgroundColor: colors.charcoal }}>
              {settings.headerStyle === 'transparent' && (
                <div className="flex items-center gap-1.5 mb-4">
                  {settings.logo ? <img src={settings.logo} className="h-5 w-auto object-contain" /> : (
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: colors.gold, color: colors.cream }}>{defaultTenant?.name?.charAt(0) || 'L'}</div>
                      <span className="text-[10px] font-bold" style={{ color: colors.cream, fontFamily: fonts.display }}>{defaultTenant?.name || 'Lumina'}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="text-[8px] uppercase tracking-widest mb-2 font-medium" style={{ color: colors.gold }}>Alto Padrão · Curitiba</div>
              <h2 className="text-sm font-bold leading-tight mb-2" style={{ color: colors.cream, fontFamily: fonts.display }}>{settings.heroTitle}</h2>
              <p className="text-[8px] leading-relaxed mb-4 opacity-70" style={{ color: colors.cream }}>{settings.heroSubtitle}</p>
              <div className="flex gap-1.5 bg-white/10 p-1 rounded-lg border border-white/10">
                <input disabled placeholder="Buscar imóvel..." className="w-full text-[7px] bg-transparent p-1 px-2" style={{ color: colors.cream }} />
                <span className="text-[7px] font-bold px-2.5 py-1 rounded flex items-center" style={{ backgroundColor: colors.gold, color: colors.cream }}>Buscar</span>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }} />
            </div>
          </div>
          {settings.headerStyle !== 'transparent' && (
            <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-20"
              style={{ backgroundColor: colors.creamDark, borderBottom: `1px solid ${colors.creamBorder}` }}>
              {logoEl}
              <nav className="flex gap-2 flex-wrap">
                {navItems.slice(0, 5).map(n => (
                  <button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className={`text-[7px] font-semibold cursor-pointer ${activePreviewTab === n.id ? 'underline' : 'opacity-60 hover:opacity-100'}`} style={{ color: colors.charcoal }}>{n.label}</button>
                ))}
              </nav>
            </div>
          )}
        </div>
      )
    }

    if (settings.heroStyle === 'video-ambient') {
      return (
        <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden">
          <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.charcoal}e6 0%, ${colors.charcoal}99 50%, ${colors.charcoal}66 100%)` }} />
          {/* Animated glow orbs */}
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: colors.gold }} />
          <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full opacity-15 blur-2xl" style={{ backgroundColor: colors.gold }} />
          {settings.headerStyle !== 'transparent' && navbar}
          {settings.headerStyle === 'transparent' && (
            <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-20">
              {logoEl}
              <nav className="flex gap-2">{navItems.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold text-white/80 hover:text-white cursor-pointer">{n.label}</button>))}</nav>
            </div>
          )}
          <div className="relative z-10 text-center px-6 py-16">
            <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-[7px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${colors.gold}30`, color: colors.gold, border: `1px solid ${colors.gold}40` }}>
              <Sparkles size={8} /> Curadoria Premium · Exclusivo
            </div>
            <h2 className="font-bold text-xl leading-tight mb-2" style={{ color: '#fff', fontFamily: fonts.display }}>{settings.heroTitle}</h2>
            <p className="text-[9px] leading-relaxed max-w-xs mx-auto mb-1" style={{ color: 'rgba(255,255,255,0.70)' }}>{settings.heroSubtitle}</p>
          </div>
        </div>
      )
    }

    if (settings.heroStyle === 'search-left') {
      return (
        <div className="relative min-h-[260px] overflow-hidden">
          <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(105deg, ${colors.charcoal}dd 0%, ${colors.charcoal}99 55%, ${colors.charcoal}22 100%)` }} />
          {navbar}
          <div className="relative z-10 px-5 pt-14 pb-6 grid grid-cols-2 gap-4 items-center">
            <div>
              <div className="text-[7px] uppercase tracking-widest mb-2 font-medium" style={{ color: colors.gold }}>Curadoria Premium</div>
              <h2 className="font-bold text-base leading-tight mb-2" style={{ color: '#fff', fontFamily: fonts.display }}>{settings.heroTitle}</h2>
              <p className="text-[8px] leading-relaxed opacity-75" style={{ color: '#fff' }}>{settings.heroSubtitle}</p>
            </div>
            <div className="bg-white/95 p-2.5 rounded-xl shadow-lg">
              <div className="text-[7px] font-bold mb-1.5" style={{ color: colors.charcoal }}>Buscar imóvel</div>
              <div className="flex gap-1 bg-white border rounded-lg p-1 border-slate-200">
                <input disabled placeholder="Localização ou tipo..." className="w-full text-[7px] bg-transparent p-0.5 px-1" style={{ color: colors.charcoal }} />
                <span className="text-[7px] font-bold px-2 py-1 rounded flex items-center" style={{ backgroundColor: colors.gold, color: '#fff' }}>Ir</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (settings.heroStyle === 'minimalist') {
      return (
        <div className="relative">
          {settings.headerStyle !== 'transparent' && (
            <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
              {logoEl}
              <nav className="flex gap-2">{navItems.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold opacity-60 hover:opacity-100 cursor-pointer" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
            </header>
          )}
          <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
            <img src={heroImg} className="absolute inset-0 w-full h-full object-cover opacity-20" />
            {settings.headerStyle === 'transparent' && (
              <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-10">
                {logoEl}
                <nav className="flex gap-2">{navItems.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
              </div>
            )}
            <div className="relative z-10 text-center px-6 py-10">
              <h2 className="font-bold text-xl leading-tight mb-2" style={{ color: colors.charcoal, fontFamily: fonts.display }}>{settings.heroTitle}</h2>
              <p className="text-[9px] leading-relaxed max-w-xs mx-auto" style={{ color: colors.warmGray }}>{settings.heroSubtitle}</p>
            </div>
          </div>
        </div>
      )
    }

    // search-centered (default)
    return (
      <div className="relative min-h-[260px] overflow-hidden flex flex-col">
        <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${colors.charcoal}cc 0%, ${colors.charcoal}99 60%, ${colors.charcoal}bb 100%)` }} />
        {navbar}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-sm mx-auto">
            <h2 className="font-bold text-lg leading-tight mb-2" style={{ color: '#fff', fontFamily: fonts.display }}>{settings.heroTitle}</h2>
            <p className="text-[8px] leading-relaxed mb-4 opacity-75" style={{ color: '#fff' }}>{settings.heroSubtitle}</p>
            <div className="flex gap-1.5 bg-white/95 p-1 rounded-lg border border-white/20 max-w-[220px] mx-auto">
              <input disabled placeholder="Cidade ou tipo..." className="w-full text-[7px] bg-transparent p-1 px-2" style={{ color: colors.charcoal }} />
              <span className="text-[7px] font-bold px-2.5 py-1 rounded flex items-center" style={{ backgroundColor: colors.gold, color: '#fff' }}>Buscar</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── PREVIEW PAGE CONTENT ──────────────────────────────────────────────────
  const renderPreviewPage = () => {
    const cardTag = CARD_TAGS.find(t => t.id === settings.cardTag)

    if (activePreviewTab === 'home') {
      return (
        <>
          {renderPreviewHero()}
          <div className="p-4 space-y-5" style={{ backgroundColor: colors.cream }}>
            {settings.homeBlocks.map((blockId: string) => {
              if (blockId === 'stats') return (
                <div key="stats" className="py-4 px-3 rounded-xl" style={{ backgroundColor: colors.charcoal }}>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[{ v: 'R$ 2,4 bi', l: 'Negociados' }, { v: '1.200+', l: 'Imóveis' }, { v: '5', l: 'Cidades' }, { v: '23 anos', l: 'Experiência' }].map(s => (
                      <div key={s.l}>
                        <div className="text-xs font-bold" style={{ color: colors.gold, fontFamily: fonts.display }}>{s.v}</div>
                        <div className="text-[6px] uppercase tracking-wider mt-0.5" style={{ color: `${colors.cream}80` }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )

              if (blockId === 'featured') return (
                <div key="featured" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Imóveis em Destaque</h3>
                    <span className="text-[7px] font-medium" style={{ color: colors.gold }}>Ver todos →</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2].map(i => renderVerticalCard({ ...mockProperty, image: `https://images.unsplash.com/photo-${i === 1 ? '1600585154340-be6161a56a0c' : '1600596542815-ffad4c1539a9'}?w=400&q=80` }, settings.cardVerticalStyle, cardTag))}
                  </div>
                </div>
              )

              if (blockId === 'categories') return (
                <div key="categories" className="space-y-2">
                  <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>O que você procura?</h3>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[{ label: 'Comprar', emoji: '🏠' }, { label: 'Alugar', emoji: '🔑' }, { label: 'Lançamentos', emoji: '🚀' }].map(c => (
                      <div key={c.label} className="text-center p-2 rounded-xl text-[8px] font-bold border" style={{ backgroundColor: colors.creamDark, borderColor: colors.creamBorder, color: colors.charcoal }}>
                        <div>{c.emoji}</div><div>{c.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )

              if (blockId === 'launches') return (
                <div key="launches" className="space-y-2">
                  <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Novos Lançamentos</h3>
                  <div className="space-y-2">
                    {[1, 2].map(i => renderHorizontalCard({ ...mockProperty, image: `https://images.unsplash.com/photo-${i === 1 ? '1545324418-cc1a3fa10c00' : '1560448204-e02f11c3d0e2'}?w=400&q=80` }, settings.cardHorizontalStyle, cardTag))}
                  </div>
                </div>
              )

              if (blockId === 'cities') return (
                <div key="cities" className="space-y-2">
                  <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Onde Atuamos</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {['Batel', 'Ecoville', 'Cabral', 'Champagnat'].map(c => (
                      <span key={c} className="text-[7px] px-2 py-0.5 rounded-full border font-medium" style={{ backgroundColor: colors.creamDark, borderColor: colors.creamBorder, color: colors.warmGray }}>📍 {c}</span>
                    ))}
                  </div>
                </div>
              )

              if (blockId === 'testimonials') return (
                <div key="testimonials" className="p-3 rounded-xl border" style={{ backgroundColor: colors.creamDark, borderColor: colors.creamBorder }}>
                  <p className="text-[8px] italic mb-1.5" style={{ color: colors.charcoal }}>"Excelente atendimento, encontrei minha cobertura dos sonhos!"</p>
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: colors.gold }}>Beatriz Almeida · Batel</span>
                </div>
              )

              if (blockId === 'cta') return (
                <div key="cta" className="p-3 rounded-xl" style={{ backgroundColor: colors.creamDark, border: `1px solid ${colors.creamBorder}` }}>
                  <div className="text-[9px] font-bold mb-1" style={{ color: colors.charcoal, fontFamily: fonts.display }}>Quer vender seu imóvel?</div>
                  <p className="text-[7px] mb-2" style={{ color: colors.warmGray }}>Nossa equipe avalia gratuitamente.</p>
                  <button className="text-[7px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: colors.gold, color: '#fff' }}>Anunciar meu imóvel</button>
                </div>
              )

              if (blockId === 'tags') return (
                <div key="tags" className="space-y-1.5">
                  <div className="text-[7px] font-bold uppercase tracking-wider" style={{ color: colors.warmGray }}>Explore</div>
                  <div className="flex flex-wrap gap-1">
                    {['Apt Luxo Batel', 'Cobertura Cabral', 'Casa Ecoville', 'Lançamentos', 'Studios'].map(t => (
                      <span key={t} className="text-[6px] px-2 py-0.5 rounded-full border font-medium" style={{ backgroundColor: '#fff', borderColor: colors.creamBorder, color: colors.charcoal }}>{t}</span>
                    ))}
                  </div>
                </div>
              )

              return null
            })}
          </div>
          <footer className="px-4 py-3 text-center" style={{ backgroundColor: colors.charcoal }}>
            <div className="text-[8px] font-bold mb-0.5" style={{ color: colors.cream, fontFamily: fonts.display }}>{defaultTenant?.name}</div>
            <div className="text-[6px]" style={{ color: `${colors.cream}60` }}>{contacts.creci}</div>
          </footer>
        </>
      )
    }

    if (activePreviewTab === 'comprar' || activePreviewTab === 'alugar') {
      const label = activePreviewTab === 'comprar' ? 'Comprar' : 'Alugar'
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto object-contain" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
            <nav className="flex gap-2">{activePreviewPages.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
          </header>
          <div className="px-4 py-3" style={{ backgroundColor: colors.cream }}>
            <div className="flex items-center gap-1.5 mb-3 p-2 rounded-xl border" style={{ backgroundColor: colors.creamDark, borderColor: colors.creamBorder }}>
              <Search size={10} style={{ color: colors.warmGray }} />
              <span className="text-[7px]" style={{ color: colors.warmGray }}>Filtrar por tipo, bairro, preço...</span>
              <span className="ml-auto text-[7px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: colors.gold, color: '#fff' }}>Buscar</span>
            </div>
            <div className="text-[7px] mb-2 font-medium" style={{ color: colors.warmGray }}>23 imóveis para <strong style={{ color: colors.charcoal }}>{label.toLowerCase()}</strong></div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => renderVerticalCard({ ...mockProperty, image: `https://images.unsplash.com/photo-${['1600585154340-be6161a56a0c', '1600596542815-ffad4c1539a9', '1545324418-cc1a3fa10c00', '1560448204-e02f11c3d0e2'][i - 1]}?w=400&q=80` }, settings.cardVerticalStyle, cardTag))}
            </div>
          </div>
        </>
      )
    }

    if (activePreviewTab === 'lancamentos') {
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
            <nav className="flex gap-2">{activePreviewPages.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
          </header>
          <div className="px-4 py-3" style={{ backgroundColor: colors.cream }}>
            <div className="text-[7px] uppercase tracking-widest mb-0.5 font-bold" style={{ color: colors.gold }}>Exclusivos</div>
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Novos Lançamentos</h3>
            <div className="space-y-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-2.5 rounded-xl border p-2 items-center" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-${['1545324418-cc1a3fa10c00', '1560448204-e02f11c3d0e2', '1486406146926-c627a92ad1ab'][i - 1]}?w=200&q=80`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[7px] uppercase tracking-widest font-bold" style={{ color: colors.gold }}>Lançamento • Batel</div>
                    <div className="text-[9px] font-bold truncate" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Ícaro Jardins {i}</div>
                    <div className="text-[8px] font-bold mt-1" style={{ color: colors.gold }}>{formatPrice(5500000 + i * 800000)}</div>
                  </div>
                  <span className="text-[6px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: colors.gold, color: '#fff' }}>🚀 Lançamento</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    }

    if (activePreviewTab === 'anunciar') {
      const struct = settings.pageStructures.anunciar
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
            <nav className="flex gap-2">{activePreviewPages.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
          </header>
          {struct === 'magazine' ? (
            <div>
              <div className="relative h-24 overflow-hidden">
                <img src={settings.heroImage} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${colors.charcoal}cc` }}>
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily: fonts.display }}>{settings.anunciarTitle}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3" style={{ backgroundColor: colors.cream }}>
                <p className="text-[8px]" style={{ color: colors.warmGray }}>{settings.anunciarSubtitle}</p>
                <div className="p-3 rounded-xl border space-y-2" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                  {['Nome', 'Telefone', 'Endereço do imóvel'].map(f => <div key={f} className="bg-white rounded-lg px-2 py-1.5 text-[7px] border" style={{ borderColor: colors.creamBorder, color: colors.warmGray }}>{f}</div>)}
                  <button className="w-full text-[7px] font-bold py-1.5 rounded-lg" style={{ backgroundColor: colors.gold, color: '#fff' }}>Anunciar agora</button>
                </div>
              </div>
            </div>
          ) : struct === 'centered' ? (
            <div className="p-4 text-center space-y-3" style={{ backgroundColor: colors.cream }}>
              <h3 className="text-sm font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{settings.anunciarTitle}</h3>
              <p className="text-[8px]" style={{ color: colors.warmGray }}>{settings.anunciarSubtitle}</p>
              <div className="max-w-xs mx-auto p-3 rounded-xl border space-y-1.5" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                {['Nome', 'Telefone', 'Endereço'].map(f => <div key={f} className="bg-white rounded-lg px-2 py-1.5 text-[7px] border" style={{ borderColor: colors.creamBorder, color: colors.warmGray }}>{f}</div>)}
                <button className="w-full text-[7px] font-bold py-1.5 rounded-lg" style={{ backgroundColor: colors.gold, color: '#fff' }}>Anunciar</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-0" style={{ backgroundColor: colors.cream }}>
              <div className="p-4 space-y-2">
                <div className="text-[7px] uppercase tracking-widest font-bold" style={{ color: colors.gold }}>Anuncie</div>
                <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{settings.anunciarTitle}</h3>
                <p className="text-[7px] leading-relaxed" style={{ color: colors.warmGray }}>{settings.anunciarSubtitle}</p>
                <div className="text-[7px] font-bold flex items-center gap-1" style={{ color: colors.gold }}>Saiba mais <ArrowRight size={8} /></div>
              </div>
              <div className="p-3 border-l space-y-1.5" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                {['Nome', 'Telefone', 'Endereço'].map(f => <div key={f} className="bg-white rounded-lg px-2 py-1.5 text-[7px] border" style={{ borderColor: colors.creamBorder, color: colors.warmGray }}>{f}</div>)}
                <button className="w-full text-[7px] font-bold py-1.5 rounded-lg" style={{ backgroundColor: colors.gold, color: '#fff' }}>Enviar</button>
              </div>
            </div>
          )}
        </>
      )
    }

    if (activePreviewTab === 'blog') {
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
          </header>
          <div className="p-4 space-y-2" style={{ backgroundColor: colors.cream }}>
            <h3 className="text-xs font-bold mb-3" style={{ fontFamily: fonts.display, color: colors.charcoal }}>Blog & Conteúdo</h3>
            {['Como avaliar o preço justo de um imóvel', 'Melhores bairros para morar em Curitiba 2026', 'Lançamentos: o que analisar antes de comprar'].map((title, i) => (
              <div key={i} className="flex gap-2 p-2 rounded-xl border" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <img src={`https://images.unsplash.com/photo-${['1486406146926-c627a92ad1ab', '1600596542815-ffad4c1539a9', '1545324418-cc1a3fa10c00'][i]}?w=200&q=80`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[6px] uppercase tracking-widest font-bold mb-0.5" style={{ color: colors.gold }}>Mercado Imobiliário</div>
                  <div className="text-[8px] font-bold leading-tight" style={{ color: colors.charcoal, fontFamily: fonts.display }}>{title}</div>
                  <div className="text-[6px] mt-1" style={{ color: colors.warmGray }}>5 min de leitura</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    }

    if (activePreviewTab === 'sobre') {
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
            <nav className="flex gap-2">{activePreviewPages.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
          </header>
          <div className="p-4 space-y-4" style={{ backgroundColor: colors.cream }}>
            {settings.pageStructures.sobre === 'centered' ? (
              <div className="text-center space-y-3">
                <div className="h-20 rounded-xl overflow-hidden"><img src={settings.sobreImage} className="w-full h-full object-cover" /></div>
                <h3 className="text-sm font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{settings.sobreTitle}</h3>
                <p className="text-[8px] leading-relaxed" style={{ color: colors.warmGray }}>{settings.sobreText}</p>
              </div>
            ) : settings.pageStructures.sobre === 'magazine' ? (
              <div>
                <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                  <img src={settings.sobreImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: fonts.display }}>{settings.sobreTitle}</h3>
                  </div>
                </div>
                <p className="text-[8px] leading-relaxed" style={{ color: colors.warmGray }}>{settings.sobreText}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{settings.sobreTitle}</h3>
                  <p className="text-[7px] leading-relaxed" style={{ color: colors.warmGray }}>{settings.sobreText}</p>
                  <div className="flex flex-wrap gap-1">
                    {(settings.sobreStats || '').split(' · ').map((s: string, i: number) => (
                      <span key={i} className="text-[6px] px-1.5 py-0.5 rounded border font-medium" style={{ borderColor: colors.creamBorder, color: colors.warmGray, backgroundColor: colors.creamDark }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden h-32"><img src={settings.sobreImage} className="w-full h-full object-cover" /></div>
              </div>
            )}

            {settings.team && settings.team.length > 0 && (
              <div className="pt-3 border-t space-y-2" style={{ borderColor: colors.creamBorder }}>
                <h4 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.charcoal }}>Nossa Equipe</h4>
                <div className="grid grid-cols-2 gap-2">
                  {settings.team.slice(0, 4).map((m: any, i: number) => (
                    <div key={i} className="flex gap-1.5 p-1.5 rounded-xl border items-center" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border" style={{ borderColor: colors.creamBorder }}>
                        {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : <Users size={12} className="m-auto mt-1.5" style={{ color: colors.warmGray }} />}
                      </div>
                      <div><div className="text-[7px] font-bold" style={{ color: colors.charcoal }}>{m.name}</div><div className="text-[6px] uppercase tracking-wider" style={{ color: colors.gold }}>{m.role}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )
    }

    if (activePreviewTab === 'contato') {
      return (
        <>
          <header className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
            {settings.logo ? <img src={settings.logo} className="h-5 w-auto" /> : <div className="text-[10px] font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{defaultTenant?.name}</div>}
            <nav className="flex gap-2">{activePreviewPages.slice(0, 4).map(n => (<button key={n.id} type="button" onClick={() => setActivePreviewTab(n.id)} className="text-[7px] font-semibold cursor-pointer opacity-60 hover:opacity-100" style={{ color: colors.charcoal }}>{n.label}</button>))}</nav>
          </header>
          <div className="p-4 space-y-3" style={{ backgroundColor: colors.cream }}>
            <div className="text-center">
              <h3 className="text-sm font-bold" style={{ fontFamily: fonts.display, color: colors.charcoal }}>{settings.contatoTitle}</h3>
              <p className="text-[7px] mt-0.5" style={{ color: colors.warmGray }}>{settings.contatoSubtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2 text-[8px]">
                <div className="font-bold uppercase tracking-wider text-[6px]" style={{ color: colors.charcoal }}>Endereço</div>
                <p className="leading-relaxed" style={{ color: colors.warmGray }}>{settings.contatoAddress}</p>
                <div className="space-y-1">
                  <p className="flex items-center gap-1" style={{ color: colors.warmGray }}><Phone size={8} /> {contacts.phone}</p>
                  <p className="flex items-center gap-1" style={{ color: colors.warmGray }}><Mail size={8} /> {contacts.email}</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl border space-y-1.5" style={{ borderColor: colors.creamBorder, backgroundColor: colors.creamDark }}>
                {['Seu Nome', 'Seu WhatsApp', 'Mensagem...'].map(f => (
                  <div key={f} className="bg-white rounded-lg px-2 py-1.5 text-[7px] border" style={{ borderColor: colors.creamBorder, color: colors.warmGray }}>{f}</div>
                ))}
                <button className="w-full text-[7px] font-bold py-1.5 rounded-lg" style={{ backgroundColor: colors.gold, color: '#fff' }}>Enviar Mensagem</button>
              </div>
            </div>
          </div>
        </>
      )
    }

    return null
  }

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      <title>LEGO Builder — Construtor Dinâmico V8</title>

      {/* Font imports */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Syne:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Decorative */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-white text-lg">V8</div>
          <div>
            <h1 className="font-semibold text-sm tracking-tight text-slate-900 flex items-center gap-2">
              LEGO Builder
              <span className="bg-amber-500/10 text-amber-600 text-[9px] px-2 py-0.5 rounded font-mono border border-amber-500/20 uppercase tracking-widest">Active</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-mono">CONSTRUTOR DE MÓDULOS MULTI-TENANT</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleReset} className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
            <RotateCcw size={12} /> Resetar
          </button>
          <button onClick={() => handleSave(false)} className="px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
            <Save size={12} /> Salvar
          </button>
          <button onClick={() => handleSave(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition-colors cursor-pointer">
            <Eye size={12} /> Ver no Site
          </button>
        </div>
      </header>

      {/* ── SPLIT LAYOUT ────────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full">

        {/* ── LEFT COLUMN: Controls ─────────────────────────────────────────── */}
        <section className="lg:col-span-6 p-5 space-y-4 border-r border-slate-200 bg-slate-50/50 overflow-y-auto">

          {/* 0 · BASE PRESETS */}
          <SectionAccordion icon={<Grid size={16} />} title="Bases Prontas (Estilos Completos)">
            <p className="text-[10px] text-slate-500 leading-normal -mt-1">Selecione um estilo visual completo. Cores, fontes, cabeçalhos e layouts são reconfigurados automaticamente.</p>
            <div className="grid grid-cols-3 gap-2.5">
              {STYLE_PRESETS.map(preset => (
                <button key={preset.id} onClick={() => { setColors(preset.colors); setFonts(preset.fonts); setSettings(prev => ({ ...prev, ...preset.settings })) }}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-center transition-all flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="flex gap-1">
                    <span className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: preset.colors.cream }} />
                    <span className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: preset.colors.charcoal }} />
                    <span className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: preset.colors.gold }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 group-hover:text-amber-600 transition-colors uppercase tracking-wider">{preset.name}</span>
                  <span className="text-[7px] text-slate-400 leading-tight text-center">{preset.desc.substring(0, 40)}</span>
                  <span className="text-[8px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded font-bold tracking-widest uppercase">Aplicar</span>
                </button>
              ))}
            </div>
          </SectionAccordion>

          {/* 1 · CORES */}
          <SectionAccordion icon={<Palette size={16} />} title="Identidade Visual & Cores">
            <div className="space-y-3">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Paletas Temáticas</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLOR_PRESETS.map(p => (
                  <button key={p.name} onClick={() => setColors(p.colors)} className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 text-left transition-all hover:bg-amber-50/30 flex gap-3 items-center group cursor-pointer">
                    <div className="flex gap-0.5 shrink-0">
                      <span className="w-5 h-10 rounded-l-lg border border-slate-200" style={{ backgroundColor: p.colors.cream }} />
                      <span className="w-5 h-10 border-y border-slate-200" style={{ backgroundColor: p.colors.charcoal }} />
                      <span className="w-5 h-10 rounded-r-lg border border-slate-200" style={{ backgroundColor: p.colors.gold }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-700 group-hover:text-amber-600 transition-colors leading-tight">{p.name}</div>
                      <div className="text-[8px] text-slate-400 mt-0.5 leading-tight">{p.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-4">
              {[
                { label: 'Base (Cream)', key: 'cream' as const },
                { label: 'Dark (Charcoal)', key: 'charcoal' as const },
                { label: 'Accent (Gold)', key: 'gold' as const },
                { label: 'Secundário', key: 'creamDark' as const },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={colors[key]} onChange={e => setColors({ ...colors, [key]: e.target.value })} className="w-7 h-7 border-0 rounded cursor-pointer bg-transparent" />
                    <span className="text-[8px] font-mono text-slate-500 uppercase">{colors[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionAccordion>

          {/* 1.5 · UPLOADS */}
          <SectionAccordion icon={<Upload size={16} />} title="Uploads de Marca & Hero">
            <p className="text-[10px] text-slate-500 -mt-1 leading-normal">Arquivos processados localmente. As imagens aparecem imediatamente no preview ao lado.</p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { key: 'logo', label: 'Logo Principal', desc: 'Substitui o logotipo textual no header' },
                { key: 'marcaDagua', label: "Marca d'Água", desc: 'Ícone circular e elemento de selo' },
                { key: 'favicon', label: 'Favicon da Aba', desc: 'Ícone da aba do navegador' },
                { key: 'heroImage', label: 'Fundo do Hero', desc: 'Imagem de plano de fundo do hero' },
              ] as const).map(item => (
                <div key={item.key} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-700">{item.label}</div>
                    <p className="text-[7px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm ${item.key === 'marcaDagua' ? 'rounded-full' : ''}`}>
                      {settings[item.key] ? <img src={settings[item.key]} className="w-full h-full object-cover" alt={item.label} /> : <ImageIcon size={14} className="text-slate-300" />}
                    </div>
                    <label className="flex-1 px-2 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-[9px] text-center text-slate-600 font-semibold rounded-lg cursor-pointer transition-colors">
                      Escolher
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e, item.key as any)} className="hidden" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </SectionAccordion>

          {/* 2 · TIPOGRAFIA */}
          <SectionAccordion icon={<Type size={16} />} title="Tipografia & Fontes">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Fonte Primária (Texto)</label>
                <select value={fonts.sans} onChange={e => setFonts({ ...fonts, sans: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 shadow-sm">
                  {FONTS_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Fonte Secundária (Títulos)</label>
                <select value={fonts.display} onChange={e => setFonts({ ...fonts, display: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 shadow-sm">
                  {FONTS_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-full w-full justify-between">
                {(['sans', 'display'] as const).map(tab => (
                  <button key={tab} type="button" onClick={() => setActiveFontTab(tab)} className={`flex-1 py-1.5 px-3 rounded-full text-[9px] font-bold text-center transition-all cursor-pointer ${activeFontTab === tab ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    {tab === 'sans' ? `✍️ Primária (${fonts.sans})` : `👑 Secundária (${fonts.display})`}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {FONTS_LIST.map(f => {
                  const isSelected = activeFontTab === 'sans' ? fonts.sans === f.name : fonts.display === f.name
                  return (
                    <div key={f.name} onClick={() => setFonts(prev => ({ ...prev, [activeFontTab]: f.name }))}
                      className={`p-3 bg-slate-50 border rounded-xl cursor-pointer transition-all flex flex-col justify-between h-24 ${isSelected ? 'border-amber-400 bg-amber-50/30 ring-1 ring-amber-400' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] text-slate-700 font-bold">{f.name}</span>
                          <span className="text-[7px] text-slate-400 font-semibold uppercase tracking-wider block">{f.category}</span>
                        </div>
                        {isSelected && <span className="text-[7px] bg-amber-500/10 text-amber-700 font-bold px-1.5 py-0.5 rounded">Ativo</span>}
                      </div>
                      <span style={{ fontFamily: f.name }} className="text-sm font-bold text-slate-800 tracking-tight truncate block">{defaultTenant?.name || 'Lumina'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </SectionAccordion>

          {/* 3 · CARDS */}
          <SectionAccordion icon={<Grid size={16} />} title="Design dos Cards & Tags">

            {/* Tag selector */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">Tag do Card (uma por vez)</label>
              <div className="flex flex-wrap gap-1.5">
                {CARD_TAGS.map(tag => (
                  <button key={tag.id} type="button" onClick={() => setSettings(prev => ({ ...prev, cardTag: tag.id }))}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold transition-all cursor-pointer border ${settings.cardTag === tag.id ? 'ring-2 ring-amber-500 ring-offset-1' : 'hover:scale-105'} ${tag.color}`}>
                    {tag.emoji} {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card previews side by side */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500 text-center mb-3">Preview dos Cards com Tag Selecionada</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider text-center">Vertical — {settings.cardVerticalStyle}</div>
                  <div className="p-1.5 bg-white rounded-xl border border-slate-100 h-56 flex flex-col justify-center">
                    {renderVerticalCard(mockProperty, settings.cardVerticalStyle, CARD_TAGS.find(t => t.id === settings.cardTag))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider text-center">Horizontal — {settings.cardHorizontalStyle}</div>
                  <div className="p-1.5 bg-white rounded-xl border border-slate-100 h-56 flex flex-col justify-center">
                    {renderHorizontalCard(mockProperty, settings.cardHorizontalStyle, CARD_TAGS.find(t => t.id === settings.cardTag))}
                  </div>
                </div>
              </div>
            </div>

            {/* Style selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estilo Vertical (6 versões)</label>
                <div className="space-y-1">
                  {['classic', 'minimalist', 'glassmorphism', 'editorial', 'bold-border', 'dark-elegance'].map(style => (
                    <button key={style} type="button" onClick={() => setSettings(prev => ({ ...prev, cardVerticalStyle: style as any }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[9px] font-medium transition-all cursor-pointer border ${settings.cardVerticalStyle === style ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'}`}>
                      {settings.cardVerticalStyle === style && '✓ '}{style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estilo Horizontal (6 versões)</label>
                <div className="space-y-1">
                  {['cozy', 'strip', 'overlay', 'offset', 'asymmetric', 'dashboard'].map(style => (
                    <button key={style} type="button" onClick={() => setSettings(prev => ({ ...prev, cardHorizontalStyle: style as any }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[9px] font-medium transition-all cursor-pointer border ${settings.cardHorizontalStyle === style ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'}`}>
                      {settings.cardHorizontalStyle === style && '✓ '}{style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs toggles */}
            <div className="border-t border-slate-100 pt-3">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">Informações visíveis no card</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'showCardBedrooms', label: 'Quartos' },
                  { key: 'showCardBathrooms', label: 'Banheiros' },
                  { key: 'showCardArea', label: 'Área (m²)' },
                  { key: 'showCardCondo', label: 'Condomínio' },
                  { key: 'showCardPetFriendly', label: 'Aceita Pets' },
                ].map(({ key, label }) => (
                  <Toggle key={key} label={label} checked={(settings as any)[key]} onChange={v => setSettings(prev => ({ ...prev, [key]: v }))} />
                ))}
              </div>
            </div>
          </SectionAccordion>

          {/* 4 · HERO STYLES */}
          <SectionAccordion icon={<Layout size={16} />} title="Tipos de Hero (4 opções)">
            <p className="text-[10px] text-slate-500 -mt-1">Clique para selecionar. A mudança é imediatamente visível no preview.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'search-centered', label: 'Busca Centralizada', desc: 'Hero fullscreen com busca no centro', emoji: '🎯' },
                { id: 'search-left', label: 'Busca à Esquerda', desc: 'Split text+search com imagem de fundo', emoji: '◀️' },
                { id: 'minimalist', label: 'Minimalista', desc: 'Sem busca, imagem sutil, foco no título', emoji: '✦' },
                { id: 'split-screen', label: 'Tela Dividida', desc: 'Metade escura com texto, metade imagem', emoji: '▌▐' },
                { id: 'video-ambient', label: 'Ambiente Premium', desc: 'Overlay imersivo com efeito de brilho', emoji: '✨' },
              ].map(h => (
                <button key={h.id} type="button" onClick={() => setSettings(prev => ({ ...prev, heroStyle: h.id as any }))}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${settings.heroStyle === h.id ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-400' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}`}>
                  <div className="text-lg mb-1">{h.emoji}</div>
                  <div className={`text-[9px] font-bold ${settings.heroStyle === h.id ? 'text-amber-700' : 'text-slate-700'}`}>{h.label}</div>
                  <div className="text-[7px] text-slate-400 mt-0.5 leading-tight">{h.desc}</div>
                  {settings.heroStyle === h.id && <div className="mt-1.5 text-[7px] font-bold text-amber-600 uppercase tracking-wider">✓ Selecionado</div>}
                </button>
              ))}
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              <InputField label="Título Principal do Hero" value={settings.heroTitle} onChange={v => setSettings(prev => ({ ...prev, heroTitle: v }))} placeholder="Ex: Residências de Prestígio" />
              <TextareaField label="Subtítulo / Chamada" value={settings.heroSubtitle} onChange={v => setSettings(prev => ({ ...prev, heroSubtitle: v }))} placeholder="Descrição do hero..." />
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-3">
              {[
                { label: 'Preset Header', key: 'headerStyle', options: [{ v: 'minimal', l: 'Minimal' }, { v: 'transparent', l: 'Transparente' }, { v: 'classic', l: 'Clássico' }] },
                { label: 'Preset Footer', key: 'footerStyle', options: [{ v: 'simple', l: 'Simple' }, { v: 'detailed', l: 'Detalhado' }, { v: 'minimal', l: 'Minimal' }] },
                { label: 'Galeria de Imóvel', key: 'detailGalleryStyle', options: [{ v: 'slider', l: 'Slider' }, { v: 'mosaic', l: 'Mosaico' }, { v: 'grid', l: 'Grid' }] },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{field.label}</label>
                  <select value={(settings as any)[field.key]} onChange={e => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700">
                    {field.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </SectionAccordion>

          {/* 5 · SUBPÁGINAS */}
          <SectionAccordion icon={<Globe size={16} />} title="Sub-Páginas do Site">
            <p className="text-[10px] text-slate-500 -mt-1 leading-normal">Ative ou desative cada página. As páginas ativas aparecem no menu de navegação e nas abas do preview.</p>
            <div className="space-y-2">
              {SUBPAGES.map(page => (
                <div key={page.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${settings.enabledPages[page.id as keyof typeof settings.enabledPages] ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{page.emoji}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{page.label}</div>
                      {page.editable && <div className="text-[7px] text-slate-400">Conteúdo editável abaixo</div>}
                    </div>
                  </div>
                  <Toggle
                    label=""
                    checked={settings.enabledPages[page.id as keyof typeof settings.enabledPages]}
                    onChange={v => setSettings(prev => ({ ...prev, enabledPages: { ...prev.enabledPages, [page.id]: v } }))}
                  />
                </div>
              ))}
            </div>
          </SectionAccordion>

          {/* 6 · ESTRUTURAS DE PÁGINAS EXTRAS */}
          <SectionAccordion icon={<FileText size={16} />} title="Estrutura & Blocos das Páginas">
            {(['sobre', 'anunciar', 'contato'] as const).map(pageKey => {
              const pageInfo = SUBPAGES.find(p => p.id === pageKey)!
              const isEnabled = settings.enabledPages[pageKey]
              return (
                <div key={pageKey} className={`rounded-xl border p-3 space-y-3 ${isEnabled ? 'border-slate-200' : 'border-dashed border-slate-200 opacity-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{pageInfo.emoji}</span>
                      <span className="text-xs font-bold text-slate-700">Página {pageInfo.label}</span>
                      {!isEnabled && <span className="text-[7px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">Inativa</span>}
                    </div>
                  </div>

                  {/* Estrutura */}
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estrutura de Layout</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PAGE_STRUCTURES.map(struct => (
                        <button key={struct.id} type="button"
                          onClick={() => setSettings(prev => ({ ...prev, pageStructures: { ...prev.pageStructures, [pageKey]: struct.id } }))}
                          className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${settings.pageStructures[pageKey] === struct.id ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-400' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                          <div className="text-sm mb-0.5">{struct.icon}</div>
                          <div className={`text-[8px] font-bold ${settings.pageStructures[pageKey] === struct.id ? 'text-amber-700' : 'text-slate-600'}`}>{struct.name}</div>
                          <div className="text-[6px] text-slate-400 mt-0.5 leading-tight">{struct.desc.split('·')[0].trim()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blocos */}
                  {['sobre', 'anunciar', 'contato'].includes(pageKey) && (
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Blocos Visíveis</label>
                      <div className="flex flex-wrap gap-1.5">
                        {PAGE_BLOCKS_OPTIONS.map(block => {
                          const isOn = (settings.pageBlocks[pageKey] || []).includes(block.id)
                          return (
                            <button key={block.id} type="button" onClick={() => togglePageBlock(pageKey, block.id)}
                              className={`px-2 py-1 rounded-full text-[8px] font-medium border cursor-pointer transition-all ${isOn ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}>
                              {isOn ? '✓ ' : ''}{block.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </SectionAccordion>

          {/* 7 · BLOCOS DA HOME */}
          <SectionAccordion icon={<Layers size={16} />} title="Blocos da Home (Adicionar / Remover)">
            <p className="text-[10px] text-slate-500 -mt-1">Arraste com as setas para reordenar. Clique × para remover. Use "+ Adicionar" para incluir blocos.</p>

            {/* Active blocks list */}
            <div className="space-y-1.5">
              {settings.homeBlocks.map((blockId: string, idx: number) => {
                const block = ALL_HOME_BLOCKS.find(b => b.id === blockId)
                if (!block) return null
                return (
                  <div key={blockId} className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 group hover:border-amber-200 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <button type="button" disabled={idx === 0} onClick={() => moveHomeBlock(idx, 'up')} className="text-slate-400 hover:text-amber-500 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"><ChevronUp size={11} /></button>
                      <button type="button" disabled={idx === settings.homeBlocks.length - 1} onClick={() => moveHomeBlock(idx, 'down')} className="text-slate-400 hover:text-amber-500 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"><ChevronDown size={11} /></button>
                    </div>
                    <Move size={10} className="text-slate-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-700">{block.label}</div>
                      <div className="text-[7px] text-slate-400">{block.desc}</div>
                    </div>
                    <button type="button" onClick={() => removeHomeBlock(blockId)} className="text-slate-300 hover:text-red-500 p-1 rounded cursor-pointer transition-colors opacity-0 group-hover:opacity-100"><X size={12} /></button>
                  </div>
                )
              })}
            </div>

            {/* Add blocks */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">+ Adicionar Blocos Disponíveis</label>
              <div className="grid grid-cols-2 gap-1.5">
                {ALL_HOME_BLOCKS.filter(b => !settings.homeBlocks.includes(b.id)).map(block => (
                  <button key={block.id} type="button" onClick={() => addHomeBlock(block.id)}
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/30 text-left transition-all cursor-pointer group">
                    <Plus size={10} className="text-slate-400 group-hover:text-amber-500 shrink-0" />
                    <div>
                      <div className="text-[9px] font-semibold text-slate-600 group-hover:text-amber-700">{block.label}</div>
                    </div>
                  </button>
                ))}
                {ALL_HOME_BLOCKS.every(b => settings.homeBlocks.includes(b.id)) && (
                  <div className="col-span-2 text-center text-[9px] text-slate-400 py-2">✓ Todos os blocos estão ativos</div>
                )}
              </div>
            </div>
          </SectionAccordion>

          {/* 8 · EQUIPE */}
          <SectionAccordion icon={<Users size={16} />} title="Equipe & Corretores" defaultOpen={false}>
            <div className="flex justify-end">
              <button onClick={addTeamMember} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-amber-500/10">
                <Plus size={12} /> Adicionar Membro
              </button>
            </div>
            <div className="space-y-3">
              {settings.team.map((member: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative space-y-3 hover:border-amber-200 transition-colors">
                  <button onClick={() => removeTeamMember(idx)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"><Trash2 size={13} /></button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-white flex items-center justify-center shrink-0">
                      {member.photo ? <img src={member.photo} className="w-full h-full object-cover" onError={e => { (e.target as HTMLElement).style.display = 'none' }} /> : <Users size={16} className="text-slate-400" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{member.name || 'Sem nome'}</div>
                      <div className="text-[10px] text-amber-600 font-mono uppercase tracking-wider">{member.role || 'Sem cargo'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                    {[{ label: 'Nome', key: 'name', ph: 'Nome completo' }, { label: 'Cargo', key: 'role', ph: 'Especialidade' }, { label: 'WhatsApp', key: 'phone', ph: '(41) 99999-9999' }, { label: 'E-mail', key: 'email', ph: 'nome@lumina.com.br' }].map(f => (
                      <div key={f.key}>
                        <label className="block text-[7px] font-bold uppercase tracking-wider text-slate-500 mb-1">{f.label}</label>
                        <input type="text" value={member[f.key] || ''} onChange={e => updateTeamMember(idx, f.key, e.target.value)} placeholder={f.ph} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-700 focus:outline-none focus:border-amber-400" />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-[7px] font-bold uppercase tracking-wider text-slate-500 mb-1">Foto (URL)</label>
                      <input type="text" value={member.photo || ''} onChange={e => updateTeamMember(idx, 'photo', e.target.value)} placeholder="https://..." className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-700 focus:outline-none focus:border-amber-400" />
                    </div>
                  </div>
                </div>
              ))}
              {settings.team.length === 0 && (
                <div className="text-center py-6 text-[10px] text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                  Nenhum membro adicionado. Clique em "Adicionar Membro" acima.
                </div>
              )}
            </div>
          </SectionAccordion>

          {/* 9 · CONTEÚDO DAS PÁGINAS */}
          <SectionAccordion icon={<FileText size={16} />} title="Conteúdo: Sobre, Anunciar & Contato" defaultOpen={false}>
            {/* Sobre */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1">
                <span className="text-base">📖</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Página Sobre Nós</span>
              </div>
              <InputField label="Título Principal" value={settings.sobreTitle} onChange={v => setSettings(prev => ({ ...prev, sobreTitle: v }))} placeholder="Ex: Nossa História" />
              <TextareaField label="Texto Institucional" value={settings.sobreText} onChange={v => setSettings(prev => ({ ...prev, sobreText: v }))} placeholder="História da empresa..." rows={4} />
              <InputField label="Imagem (URL)" value={settings.sobreImage} onChange={v => setSettings(prev => ({ ...prev, sobreImage: v }))} placeholder="https://..." />
              <InputField label='Estatísticas (separadas por " · ")' value={settings.sobreStats} onChange={v => setSettings(prev => ({ ...prev, sobreStats: v }))} placeholder="10 Anos · 500+ Clientes" />
            </div>

            {/* Anunciar */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 pb-1">
                <span className="text-base">📣</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Página Anunciar</span>
              </div>
              <InputField label="Título da Página" value={settings.anunciarTitle} onChange={v => setSettings(prev => ({ ...prev, anunciarTitle: v }))} placeholder="Ex: Anuncie seu Imóvel" />
              <InputField label="Subtítulo / Chamada" value={settings.anunciarSubtitle} onChange={v => setSettings(prev => ({ ...prev, anunciarSubtitle: v }))} placeholder="Descrição..." />
            </div>

            {/* Contato */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 pb-1">
                <span className="text-base">📞</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Página Contato</span>
              </div>
              <InputField label="Título de Contato" value={settings.contatoTitle} onChange={v => setSettings(prev => ({ ...prev, contatoTitle: v }))} placeholder="Ex: Entre em Contato" />
              <InputField label="Subtítulo / Chamada" value={settings.contatoSubtitle} onChange={v => setSettings(prev => ({ ...prev, contatoSubtitle: v }))} placeholder="Agende uma visita..." />
              <InputField label="Endereço Físico" value={settings.contatoAddress} onChange={v => setSettings(prev => ({ ...prev, contatoAddress: v }))} placeholder="Rua, número, bairro..." />
            </div>

            {/* Contato info */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dados de Contato</div>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Telefone" value={contacts.phone} onChange={v => setContacts(prev => ({ ...prev, phone: v }))} placeholder="(41) 3000-0000" />
                <InputField label="E-mail" value={contacts.email} onChange={v => setContacts(prev => ({ ...prev, email: v }))} placeholder="email@..." />
                <InputField label="WhatsApp" value={contacts.whatsapp} onChange={v => setContacts(prev => ({ ...prev, whatsapp: v }))} placeholder="(41) 99999-9999" />
                <InputField label="CRECI" value={contacts.creci} onChange={v => setContacts(prev => ({ ...prev, creci: v }))} placeholder="CRECI-PR 00.000-F" />
              </div>
            </div>
          </SectionAccordion>

        </section>

        {/* ── RIGHT COLUMN: Preview ─────────────────────────────────────────── */}
        <section className="lg:col-span-6 bg-slate-100 flex flex-col lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-6.5rem)] z-20 overflow-hidden">

          {/* Preview bar */}
          <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-800">Preview em Tempo Real</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full text-[8px] text-slate-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.gold }} />
                {fonts.display}
              </div>
            </div>
          </div>

          {/* Sub-page tabs (scrollable) */}
          <div className="bg-white border-b border-slate-200 px-3 py-2 shrink-0 overflow-x-auto" ref={previewTabsRef}>
            <div className="flex gap-1.5 min-w-max">
              {activePreviewPages.map(page => (
                <button key={page.id} type="button" onClick={() => setActivePreviewTab(page.id)}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap transition-all cursor-pointer ${activePreviewTab === page.id ? 'shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100'}`}
                  style={activePreviewTab === page.id ? { backgroundColor: colors.gold, color: '#fff' } : {}}>
                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview content */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center items-start">
            <div
              style={previewStyles}
              className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transition-all duration-300"
            >
              <div style={{ fontFamily: fonts.sans }}>
                {renderPreviewPage()}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
