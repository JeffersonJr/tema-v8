import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ShieldCheck, Cpu, Code2, Users, Layers, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { tenants, getCustomTenants } from '@/data/tenants'
import type { Tenant } from '@/data/tenants'
import { getProperties } from '@/data/properties'

export const Route = createFileRoute('/')({
  component: PortalIndexPage,
})

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function PortalIndexPage() {
  const [allTenants, setAllTenants] = useState<Tenant[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const custom = getCustomTenants()
      const all = [...tenants, ...custom].map(t => {
        const stored = localStorage.getItem(`${t.id}_builder_settings`)
        if (stored) {
          try {
            const p = JSON.parse(stored)
            return {
              ...t,
              name: p.name || t.name,
              slug: p.slug || t.slug,
              status: p.status || t.status || 'online',
            }
          } catch (e) {}
        }
        return {
          ...t,
          status: t.status || 'online',
        }
      })
      setAllTenants(all)
    } else {
      setAllTenants(tenants.map(t => ({ ...t, status: t.status || 'online' })))
    }
  }, [])

  const handleCreateNewTenant = () => {
    if (typeof window === 'undefined') return
    const name = window.prompt('Qual o nome da nova imobiliária?')
    if (!name || !name.trim()) return
    const trimmedName = name.trim()
    const customSlug = slugify(trimmedName) || `portal-${Date.now().toString().slice(-4)}`
    
    const nextId = `custom_${Date.now()}`
    
    const newTenant: Tenant = {
      id: nextId,
      slug: customSlug,
      name: trimmedName,
      tagline: 'Lançamentos imobiliários e design de vanguarda.',
      logo: '',
      favicon: '/favicon.ico',
      creci: 'CRECI-PR 00.000-X',
      description: 'Novo portal imobiliário criado dinamicamente com o construtor modular LEGO V8.',
      status: 'online',
      colors: {
        cream: '#FAFAFA',
        creamDark: '#F4F4F5',
        creamBorder: '#E4E4E7',
        charcoal: '#09090B',
        charcoalLight: '#27272A',
        warmGray: '#717178',
        gold: '#18181B',
        goldLight: '#3F3F46',
      },
      contacts: {
        phone: '(41) 3000-0000',
        phoneRaw: '+554130000000',
        whatsapp: '(41) 99999-9999',
        whatsappRaw: '5541999999999',
        email: 'contato@novoportalv8.com.br',
        address: {
          street: 'Avenida do Batel, 1000',
          neighborhood: 'Batel',
          city: 'Curitiba',
          state: 'PR',
          fullAddress: 'Avenida do Batel, 1000, Batel, Curitiba - PR',
        },
      },
      socials: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/',
        youtube: 'https://youtube.com/',
      },
      fonts: {
        sans: 'Inter',
        display: 'Outfit',
      },
      builderSettings: {
        headerStyle: 'minimal',
        footerStyle: 'simple',
        heroStyle: 'minimalist',
        heroTitle: trimmedName,
        heroSubtitle: 'Selecione e configure os seus blocos premium na barra de ferramentas lateral.',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
        cardVariant: 'compact',
        showCardBedrooms: true,
        showCardBathrooms: true,
        showCardArea: true,
        showCardCondo: true,
        showCardPetFriendly: true,
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
        searchFiltersLayout: 'topbar',
        detailGalleryStyle: 'slider',
        openingHours: 'Segunda a Sexta das 9h às 18h',
        team: [
          {
            name: 'Consultor de Vanguarda',
            role: 'Diretor Comercial',
            phone: '(41) 99999-9999',
            email: 'diretor@novoportal.com.br',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
            instagram: 'https://instagram.com/',
          }
        ]
      }
    }

    const currentCustom = getCustomTenants()
    currentCustom.push(newTenant)
    localStorage.setItem('v8_custom_tenants', JSON.stringify(currentCustom))
    
    // Create direct settings key
    localStorage.setItem(`${newTenant.id}_builder_settings`, JSON.stringify({
      ...newTenant.builderSettings,
      colors: newTenant.colors,
      fonts: newTenant.fonts,
      contacts: newTenant.contacts,
      name: newTenant.name,
      slug: newTenant.slug,
      status: newTenant.status,
      homeBlocks: ['stats', 'featured', 'categories', 'launches', 'cities', 'testimonials', 'cta', 'tags'],
      pageStructures: {
        sobre: 'editorial',
        anunciar: 'editorial',
        contato: 'editorial',
        blog: 'editorial',
      },
      pageBlocks: {
        sobre: ['text', 'stats', 'team'],
        anunciar: ['text', 'form', 'cta'],
        contato: ['text', 'form'],
      },
      teamStyle: 'grid',
      formFields: {
        name: { label: 'Nome Completo', enabled: true, required: true },
        phone: { label: 'WhatsApp / Telefone', enabled: true, required: true },
        email: { label: 'E-mail', enabled: true, required: false },
        message: { label: 'Mensagem de Interesse', enabled: true, required: false },
        propertyType: { label: 'Tipo de Imóvel', enabled: false, required: false },
        neighborhood: { label: 'Bairro de Interesse', enabled: false, required: false },
      }
    }))

    // Redirect to builder with dynamic ID
    window.location.href = `/builder?tenantId=${newTenant.id}`
  }

  return (
    <div className="min-h-screen bg-[#0F110E] text-white flex flex-col justify-between selection:bg-[#EDBF71] selection:text-black">
      <title>Sites V8 - Microsistec</title>
      <link rel="icon" type="image/png" href="/v8-fav.png" />
      
      {/* Decorative background grid and ambient lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EDBF71]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#3A8266]/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EDBF71] to-[#3A8266] flex items-center justify-center font-display font-bold text-black text-lg shadow-lg">
              V
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight block">V8 Portal Engine</span>
              <span className="text-[10px] text-white/40 font-mono tracking-widest block uppercase">Multi-Tenant Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="text-xs bg-gradient-to-r from-[#EDBF71] to-[#3A8266] hover:from-[#EDBF71] hover:to-[#EDBF71] text-black font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Layers size={13} />
              LEGO Builder
            </Link>
            <div className="hidden sm:flex items-center gap-3 text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-white/70">
              <Cpu size={12} className="text-[#EDBF71]" />
              <span>Versão V8 Ativa</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center items-center">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#EDBF71]/10 border border-[#EDBF71]/20 text-[#EDBF71] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <Layers size={13} />
            Hub Multicliente Imobiliário
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Selecione a Imobiliária
          </h1>
          <p className="text-white/60 text-base md:text-lg">
            Um único motor robusto (v8) gerenciando múltiplos portais imobiliários independentes. Escolha um dos nossos parceiros para acessar a listagem de imóveis de luxo.
          </p>
        </div>

        {/* Tenant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16 animate-fade-in-up animate-delay-200 animate-duration-500">
          {allTenants.map((tenant) => {
            const propsCount = getProperties(tenant.id).length
            const isRobles = tenant.id === 'robles'
            const isCustom = tenant.id.startsWith('custom_')
            const accentColor = isCustom 
              ? 'hover:border-amber-400/60 hover:shadow-amber-400/5' 
              : (isRobles ? 'group-hover:border-[#EDBF71] hover:shadow-[#EDBF71]/5' : 'group-hover:border-[#3A8266] hover:shadow-[#3A8266]/5')
            const badgeColor = isCustom
              ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
              : (isRobles ? 'bg-[#EDBF71]/10 text-[#EDBF71] border-[#EDBF71]/20' : 'bg-[#3A8266]/10 text-[#3A8266] border-[#3A8266]/20')
            const btnColor = isCustom
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : (isRobles ? 'bg-[#EDBF71] hover:bg-[#D4A84E] text-black' : 'bg-[#3A8266] hover:bg-[#2C624D] text-white')

            return (
              <div
                key={tenant.id}
                className={`group bg-[#161915] border border-white/5 rounded-3xl p-8 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 shadow-2xl relative overflow-hidden ${accentColor}`}
              >
                {/* Visual Ambient Light inside card */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[40px] pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
                  isCustom ? 'bg-amber-400/10' : (isRobles ? 'bg-[#EDBF71]/20' : 'bg-[#3A8266]/20')
                }`} />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Branded Dynamic Emblem */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-md transition-transform duration-300 group-hover:scale-105 ${
                      isCustom ? 'bg-amber-500 text-slate-950' : (isRobles ? 'bg-[#EDBF71] text-black' : 'bg-[#3A8266] text-white')
                    }`}>
                      {tenant.name.charAt(0)}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeColor}`}>
                        {propsCount} Imóveis
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 font-mono">{tenant.creci}</span>
                        {tenant.status === 'offline' ? (
                          <span className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 select-none">
                            <span className="w-1 h-1 rounded-full bg-rose-500" />
                            Offline
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 select-none">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            No Ar
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                    {tenant.name}
                  </h3>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isCustom ? 'text-amber-400' : (isRobles ? 'text-[#EDBF71]' : 'text-[#3A8266]')}`}>
                    {tenant.tagline}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {tenant.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    to="/$tenant"
                    params={{ tenant: tenant.slug }}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${btnColor}`}
                  >
                    Acessar Site
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`/builder?tenantId=${tenant.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10 hover:bg-white/5 text-white/70 hover:text-white"
                  >
                    <Layers size={12} />
                    Editar no LEGO Builder
                  </a>
                </div>
              </div>
            )
          })}

          {/* Create New V8 Card */}
          <div
            onClick={handleCreateNewTenant}
            className="group bg-[#161915]/50 border-2 border-dashed border-white/10 hover:border-amber-400/40 rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-400 hover:-translate-y-1.5 shadow-2xl relative overflow-hidden cursor-pointer min-h-[300px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <Plus size={20} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              Criar Novo Portal V8
            </h3>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              Crie um novo site imobiliário exclusivo do zero com identidade visual, domínios e blocos LEGO personalizados.
            </p>
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-white/5 pt-12 text-center animate-fade-in-up animate-delay-400">
          {[
            { icon: Code2, title: 'TanStack Start', desc: 'SSR & Router v1' },
            { icon: Cpu, title: 'Tailwind v4', desc: 'CSS Variables Theme' },
            { icon: ShieldCheck, title: 'Multi-Tenant', desc: 'Filtro Dinâmico v8' },
            { icon: Users, title: 'Autogerador', desc: 'Configuração via JSON' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <item.icon size={18} className="text-white/40 mb-2" />
              <div className="text-xs font-semibold text-white/80">{item.title}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 relative z-10 py-8 bg-[#0B0D0A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 V8 Engine. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">Microsistec CRM</a> | Desenvolvido por <a href="https://evolves.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">Evolves Tecnologia</a></p>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#EDBF71]/60">
            Assinatura: Jefferson Campos Beira Junior
          </div>
        </div>
      </footer>

    </div>
  )
}
