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
              favicon: p.favicon || t.favicon,
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
      tagline: '',
      logo: '',
      favicon: '/favicon.ico',
      creci: '',
      description: '',
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
        phone: '',
        phoneRaw: '',
        whatsapp: '',
        whatsappRaw: '',
        email: '',
        address: {
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          fullAddress: '',
        },
      },
      socials: {
        instagram: '',
        facebook: '',
        youtube: '',
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
        heroSubtitle: '',
        heroImage: '',
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
        openingHours: '',
        team: []
      }
    }

    const currentCustom = getCustomTenants()
    currentCustom.push(newTenant)
    localStorage.setItem('v8_custom_tenants', JSON.stringify(currentCustom))
    
    localStorage.setItem(`${newTenant.id}_builder_settings`, JSON.stringify({
      ...newTenant.builderSettings,
      logo: '',
      logoLight: '',
      marcaDagua: '',
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
      },
      sobreTitle: '',
      sobreText: '',
      sobreImage: '',
      sobreStats: '',
      anunciarTitle: '',
      anunciarSubtitle: '',
      contatoTitle: '',
      contatoSubtitle: '',
      contatoAddress: '',
    }))

    // Redirect to builder with dynamic ID
    window.location.href = `/builder?tenantId=${newTenant.id}`
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <title>Sites V8 - Microsistec</title>
      <link rel="icon" type="image/png" href="/v8-fav.png" />
      
      {/* Decorative background grid and ambient lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="bg-white/80 border-b border-slate-200 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center font-display font-bold text-white text-lg shadow-sm">
              V
            </div>
            <div>
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight block">V8 Portal Engine</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">Multi-Tenant Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Layers size={13} />
              LEGO Builder
            </Link>
            <div className="hidden sm:flex items-center gap-3 text-xs bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-slate-600">
              <Cpu size={12} className="text-amber-600" />
              <span>Versão V8 Ativa</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center items-center">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <Layers size={13} />
            Hub Multicliente Imobiliário
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-slate-900 tracking-tight">
            Selecione a Imobiliária
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Um único motor robusto (v8) gerenciando múltiplos portais imobiliários independentes. Escolha um dos nossos parceiros para acessar a listagem de imóveis de luxo.
          </p>
        </div>

        {/* Tenant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16 animate-fade-in-up animate-delay-200 animate-duration-500">
          {allTenants.map((tenant) => {
            const propsCount = getProperties(tenant.id).length
            const isRobles = tenant.id === 'robles'
            const isCustom = tenant.id.startsWith('custom_')
            const borderHover = isCustom 
              ? 'hover:border-amber-400/80 hover:shadow-sm' 
              : (isRobles ? 'hover:border-slate-400 hover:shadow-sm' : 'hover:border-slate-400 hover:shadow-sm')
            const badgeColor = isCustom
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : (isRobles ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-slate-100 text-slate-800 border-slate-200')
            const btnColor = isCustom
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : (isRobles ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white')

            const hasFavicon = tenant.favicon && tenant.favicon !== '/favicon.ico' && tenant.favicon !== 'favicon.ico'

            return (
              <div
                key={tenant.id}
                className={`group bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 shadow-sm relative overflow-hidden ${borderHover}`}
              >
                {/* Visual Ambient Light inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[40px] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-slate-400/10" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Branded Dynamic Emblem - Logo or Favicon if available, else first letter */}
                    {hasFavicon ? (
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm bg-slate-50 border border-slate-100 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={tenant.favicon} 
                          alt={`${tenant.name} favicon`} 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = `<span class="text-slate-850 text-2xl font-display font-bold">${tenant.name.charAt(0)}</span>`
                              parent.className = "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-sm bg-slate-100 text-slate-800 shrink-0 group-hover:scale-105 transition-transform duration-300"
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-sm bg-slate-900 text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {tenant.name.charAt(0)}
                      </div>
                    )}

                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeColor}`}>
                        {propsCount} Imóveis
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">{tenant.creci}</span>
                        {tenant.status === 'offline' ? (
                          <span className="flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 select-none">
                            <span className="w-1 h-1 rounded-full bg-rose-500" />
                            Offline
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 select-none">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            No Ar
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-slate-950 transition-colors">
                    {tenant.name}
                  </h3>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isCustom ? 'text-amber-600' : 'text-slate-500'}`}>
                    {tenant.tagline}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
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
                    className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800"
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
            className="group bg-white border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-50/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-400 hover:-translate-y-1.5 shadow-sm relative overflow-hidden cursor-pointer min-h-[300px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all mb-4">
              <Plus size={20} />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
              Criar Novo Portal V8
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Crie um novo site imobiliário exclusivo do zero com identidade visual, domínios e blocos LEGO personalizados.
            </p>
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-slate-200/80 pt-12 text-center animate-fade-in-up animate-delay-400">
          {[
            { icon: Code2, title: 'TanStack Start', desc: 'SSR & Router v1' },
            { icon: Cpu, title: 'Tailwind v4', desc: 'CSS Variables Theme' },
            { icon: ShieldCheck, title: 'Multi-Tenant', desc: 'Filtro Dinâmico v8' },
            { icon: Users, title: 'Autogerador', desc: 'Configuração via JSON' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <item.icon size={18} className="text-slate-400 mb-2" />
              <div className="text-xs font-semibold text-slate-700">{item.title}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 relative z-10 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 V8 Engine. Todos os direitos reservados. | Powered by <a href="https://microsistec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors font-semibold">Microsistec</a> e <a href="https://evolves.site" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors font-semibold">Evolves Tecnologia</a></p>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Assinatura: Jefferson Campos Beira Junior
          </div>
        </div>
      </footer>

    </div>
  )
}
