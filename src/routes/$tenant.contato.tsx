import { useTenant } from '@/routes/$tenant'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Check,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  ChevronDown,
} from 'lucide-react'

export const Route = createFileRoute('/$tenant/contato')({
  component: ContatoPage,
})

const offices = [
  {
    city: 'São Paulo — Sede',
    address: 'Avenida das Nações Unidas, nº 14171',
    neighborhood: 'Marble Tower, Vila Gertrudes',
    state: 'SP',
    phone: '(11) 3568-2495',
    email: 'claudia@roblesimobiliariasp.com.br',
    hours: 'De Seg. a Sex das 09h as 17h · Exceto domingo e feriados',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80&fit=crop',
  },
  {
    city: 'Rio de Janeiro',
    address: 'Av. Atlântica, 1702',
    neighborhood: 'Copacabana',
    state: 'RJ',
    phone: '(21) 4003-9944',
    email: 'rj@roblesimobiliaria.com.br',
    hours: 'Seg–Sex: 9h–19h · Sáb: 10h–14h',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80&fit=crop',
  },
  {
    city: 'Florianópolis',
    address: 'Av. Beira Mar Norte, 405',
    neighborhood: 'Centro',
    state: 'SC',
    phone: '(48) 4002-7711',
    email: 'sc@roblesimobiliaria.com.br',
    hours: 'Seg–Sex: 9h–18h · Sáb: 9h–13h',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&fit=crop',
  },
]

const faqs = [
  {
    question: 'Como funciona o processo de compra de um imóvel?',
    answer: 'Nosso time acompanha você em todas as etapas: da busca do imóvel até a assinatura da escritura. Começamos com uma conversa para entender suas necessidades, apresentamos as opções, intermediamos a negociação e coordenamos toda a documentação.',
  },
  {
    question: 'Qual a comissão cobrada nas vendas?',
    answer: 'A comissão de corretagem é regulamentada pelo CRECI e varia entre 5% e 8% do valor do imóvel. Na Robles, trabalhamos sempre com transparência sobre custos desde o início da negociação.',
  },
  {
    question: 'Vocês também ajudam com financiamento?',
    answer: 'Sim. Temos parceria com os principais bancos e podemos indicar as melhores condições de financiamento imobiliário. Nossa equipe te auxilia desde a simulação até a aprovação do crédito.',
  },
  {
    question: 'Como avaliam o preço de um imóvel para venda?',
    answer: 'Realizamos uma avaliação técnica gratuita baseada em comparativos de mercado, histórico de transações na região e estado de conservação do imóvel. O objetivo é definir o preço mais justo para uma venda rápida.',
  },
  {
    question: 'Qual o prazo médio para locação?',
    answer: 'Para locação residencial de alto padrão, o prazo médio de conclusão do negócio é de 15 a 30 dias. Realizamos uma criteriosa análise de crédito dos candidatos para garantir tranquilidade ao proprietário.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3 text-left">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl border border-cream-border overflow-hidden">
          <button
            type="button"
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-charcoal text-sm">{faq.question}</span>
            <ChevronDown
              size={18}
              className={`text-warm-gray shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-warm-gray text-sm leading-relaxed border-t border-cream-border pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactForm({ tenant }: { tenant: any }) {
  const fields = tenant.builderSettings?.formFields || {
    name: { label: 'Nome Completo', enabled: true, required: true },
    phone: { label: 'WhatsApp / Telefone', enabled: true, required: true },
    email: { label: 'E-mail', enabled: true, required: false },
    message: { label: 'Mensagem de Interesse', enabled: true, required: false },
  }

  const [form, setForm] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-gold" />
        </div>
        <h3 className="font-display text-2xl font-bold text-charcoal mb-2">Mensagem recebida!</h3>
        <p className="text-warm-gray text-sm max-w-sm mx-auto">
          Nossa equipe entrará em contato em até 24 horas úteis. Obrigado pelo interesse.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(fields).filter(([id, f]: any) => f.enabled && id !== 'message').map(([id, f]: any) => (
          <div key={id} className="text-left">
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            {id === 'propertyType' ? (
              <div className="relative">
                <select
                  required={f.required}
                  value={form[id] || ''}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                  className="w-full appearance-none bg-white border-2 border-cream-border focus:border-gold rounded-xl px-4 py-3.5 text-sm text-charcoal pr-8 outline-none transition-colors"
                >
                  <option value="">Selecione o tipo</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Cobertura</option>
                  <option>Terreno</option>
                  <option>Comercial</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
              </div>
            ) : (
              <input
                required={f.required}
                type={id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'text'}
                value={form[id] || ''}
                onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                placeholder={f.label}
                className="w-full bg-white border-2 border-cream-border focus:border-gold rounded-xl px-4 py-3.5 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors"
              />
            )}
          </div>
        ))}
      </div>
      {fields.message?.enabled && (
        <div className="text-left">
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
            {fields.message.label} {fields.message.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            required={fields.message.required}
            rows={4}
            value={form.message || ''}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Como podemos te ajudar? Descreva o que você está buscando..."
            className="w-full bg-white border-2 border-cream-border focus:border-gold rounded-xl px-4 py-3.5 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors resize-none"
          />
        </div>
      )}
      <button type="submit" className="btn-gold w-full py-4 rounded-xl text-sm font-semibold">
        Enviar mensagem
      </button>
    </form>
  )
}

function ContatoPage() {
  const tenant = useTenant()
  const settings = tenant.builderSettings || {}
  const pageStructure = settings.pageStructures?.contato || 'editorial'
  
  // Custom blocks order and list layout configuration (Requirement 12)
  const blocks = settings.pageBlocks?.contato || ['hero', 'form', 'text']
  const blocksLayout = settings.pageBlocksLayout?.contato || 'stack'

  const title = settings.contatoTitle || 'Fale Conosco'
  const subtitle = settings.contatoSubtitle || 'Nossa equipe especializada está pronta para ajudar você.'
  const address = settings.contatoAddress || tenant.contacts?.address?.fullAddress || 'Av. Batel, 1550 - Batel, Curitiba/PR'

  const renderHeroSection = () => {
    if (pageStructure === 'magazine') {
      const heroImage = settings.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop"
      return (
        <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden mb-12 rounded-3xl border border-cream-border">
          <img src={heroImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center px-6">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-3">{title}</h1>
            <p className="text-cream/80 text-sm md:text-base max-w-xl mx-auto">{subtitle}</p>
          </div>
        </div>
      )
    }

    // Default or Centered Header
    return (
      <div className={`max-w-3xl mx-auto px-6 text-center ${pageStructure === 'centered' ? 'mb-14' : 'mb-10'}`}>
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock size={12} />
          Fale Conosco
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

  const renderQuickContacts = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
      {[
        {
          icon: Phone,
          title: 'Telefone',
          value: tenant.contacts?.phone || '(11) 3568-2495',
          sub: 'Seg–Sex: 9h às 17h',
          href: `tel:${tenant.contacts?.phoneRaw || '+551135682495'}`,
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp',
          value: tenant.contacts?.whatsapp || '(11) 95033-8488',
          sub: 'Atendimento imediato',
          href: `https://wa.me/${tenant.contacts?.whatsappRaw || '5511950338488'}?text=Ol%C3%A1%2C%20gostaria%20de%20atendimento.`,
        },
        {
          icon: Mail,
          title: 'E-mail',
          value: tenant.contacts?.email || 'atendimento@roblesimobiliaria.com.br',
          sub: 'Retorno em até 24h',
          href: `mailto:${tenant.contacts?.email || 'atendimento@roblesimobiliaria.com.br'}`,
        },
      ].map((c) => (
        <a
          key={c.title}
          href={c.href}
          target={c.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-cream-border p-6 text-center hover:-translate-y-1 transition-transform duration-300 block shadow-sm"
        >
          <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <c.icon size={20} className="text-gold" />
          </div>
          <div className="text-[10px] text-warm-gray uppercase tracking-widest mb-1">{c.title}</div>
          <div className="font-semibold text-charcoal text-sm">{c.value}</div>
          <div className="text-[10px] text-warm-gray mt-1">{c.sub}</div>
        </a>
      ))}
    </div>
  )

  const renderMainContactPart = () => {
    if (pageStructure === 'centered') {
      return (
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="bg-white rounded-3xl border border-cream-border p-8 md:p-10 shadow-sm text-center">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-4">Envie sua Mensagem</h3>
            <ContactForm tenant={tenant} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl border border-cream-border p-6 shadow-sm">
              <h4 className="font-bold text-charcoal text-sm uppercase tracking-wider mb-2">Endereço Principal</h4>
              <p className="text-warm-gray text-sm leading-relaxed">{address}</p>
            </div>
            <div className="bg-cream-dark rounded-2xl p-6 flex flex-col justify-center text-left">
              <h4 className="font-bold text-gold text-sm uppercase tracking-wider mb-2">Redes Sociais</h4>
              <div className="flex gap-3 mt-1">
                {['instagram', 'facebook', 'youtube'].map((platform) => {
                  const url = (tenant.socials as any)?.[platform]
                  if (!url) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-cream-border flex items-center justify-center text-warm-gray bg-white hover:border-gold hover:text-gold transition-colors"
                    >
                      {platform === 'instagram' && <Instagram size={16} />}
                      {platform === 'facebook' && <Facebook size={16} />}
                      {platform === 'youtube' && <Linkedin size={16} />}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Editorial layout or magazine secondary content (two columns side-by-side)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 bg-white rounded-3xl border border-cream-border p-8 shadow-sm">
          <div className="section-title mb-6 text-left">
            <h2 className="font-display text-2xl font-bold text-charcoal">Envie uma mensagem</h2>
            <p className="text-warm-gray text-sm mt-1">
              Preencha o formulário e um especialista da sua cidade entrará em contato.
            </p>
          </div>
          <ContactForm tenant={tenant} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-cream-border p-6 shadow-sm text-left">
            <h3 className="font-display text-lg font-bold text-charcoal mb-4">Informações de Contato</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-warm-gray">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3 text-warm-gray">
                <Phone size={18} className="text-gold shrink-0" />
                <span>{tenant.contacts?.phone || '(11) 3568-2495'}</span>
              </div>
              <div className="flex items-center gap-3 text-warm-gray">
                <Mail size={18} className="text-gold shrink-0" />
                <span>{tenant.contacts?.email || 'atendimento@roblesimobiliaria.com.br'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-cream-border p-6 shadow-sm text-left">
            <h3 className="font-display text-lg font-bold text-charcoal mb-2">Redes Sociais</h3>
            <p className="text-warm-gray text-xs mb-4">Acompanhe nossos perfis e lançamentos de luxo.</p>
            <div className="flex gap-3">
              {['instagram', 'facebook', 'youtube'].map((platform) => {
                const url = (tenant.socials as any)?.[platform]
                if (!url) return null
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-cream-border flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors"
                  >
                    {platform === 'instagram' && <Instagram size={16} />}
                    {platform === 'facebook' && <Facebook size={16} />}
                    {platform === 'youtube' && <Linkedin size={16} />}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Statistics parser dynamically rendering custom stats using the period/comma parser (Requirement 17)
  const renderStats = () => {
    const statsList = settings.sobreStats
      ? settings.sobreStats.split(/\s*\.\s*/).map((s: string) => {
          const commaIndex = s.indexOf(',')
          if (commaIndex === -1) return { value: s.trim(), label: '' }
          return {
            value: s.substring(0, commaIndex).trim(),
            label: s.substring(commaIndex + 1).trim()
          }
        })
      : [
          { value: 'R$ 2,4 bi', label: 'Transacionados' },
          { value: '4.800+', label: 'Famílias atendidas' },
          { value: '1.240+', label: 'Imóveis disponíveis' },
        ]

    return (
      <div className="bg-charcoal py-12 rounded-3xl border border-cream-border my-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {statsList.map((s: any, idx: number) => (
              <div key={idx}>
                <div className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">{s.value}</div>
                <div className="text-cream/50 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Dynamic visual block dispatcher
  const renderBlock = (blockId: string) => {
    switch (blockId) {
      case 'hero':
        return <div key="hero">{renderHeroSection()}</div>
      case 'form':
        return (
          <div key="form" className="space-y-8">
            {renderQuickContacts()}
            {renderMainContactPart()}
          </div>
        )
      case 'stats':
        return renderStats()
      case 'team':
        if (!settings.team || settings.team.length === 0) return null
        const tStyle = settings.teamStyle || 'grid'
        return (
          <div key="team" className="py-12 bg-cream-dark rounded-3xl border border-cream-border my-6 px-6 text-center">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-2">Fale com Nossos Corretores</h3>
            <p className="text-warm-gray text-sm mb-8">Especialistas prontos para te atender com total exclusividade.</p>
            <div className={
              tStyle === 'list'
                ? "space-y-4 max-w-2xl mx-auto"
                : tStyle === 'minimal'
                ? "flex flex-wrap justify-center gap-8"
                : "grid grid-cols-1 md:grid-cols-3 gap-6"
            }>
              {settings.team.map((m: any, idx: number) => {
                if (tStyle === 'list') {
                  return (
                    <div key={idx} className="bg-white border border-cream-border rounded-2xl p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                        <div className="text-left text-left">
                          <h4 className="font-bold text-charcoal text-base">{m.name}</h4>
                          <p className="text-gold text-xs font-semibold">{m.role}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-charcoal bg-cream-dark px-4 py-2 rounded-full">{m.phone}</span>
                    </div>
                  )
                }
                if (tStyle === 'minimal') {
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full border-2 border-gold object-cover shadow-md mb-3" />
                      <h4 className="font-bold text-charcoal text-sm">{m.name}</h4>
                      <p className="text-warm-gray text-xs">{m.role}</p>
                    </div>
                  )
                }
                // Grid or Cards style
                return (
                  <div key={idx} className="bg-white border border-cream-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                    <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border" />
                    <h4 className="font-bold text-charcoal text-base">{m.name}</h4>
                    <p className="text-gold text-xs font-semibold mb-3">{m.role}</p>
                    <p className="text-warm-gray text-xs mb-1 font-semibold">{m.phone}</p>
                    <p className="text-warm-gray/60 text-xs">{m.email}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 'text': // FAQ & Offices block
        return (
          <div key="text" className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 text-left">
            <div>
              <div className="section-title mb-6 text-left">
                <h2 className="font-display text-2xl font-bold text-charcoal">Nossos Escritórios</h2>
                <p className="text-warm-gray text-sm mt-1">Visite uma de nossas sedes exclusivas no Brasil.</p>
              </div>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.city} className="bg-white rounded-2xl border border-cream-border overflow-hidden flex shadow-sm">
                    <img src={office.image} alt={office.city} className="w-24 object-cover shrink-0" />
                    <div className="p-4 text-left text-xs space-y-1">
                      <h4 className="font-bold text-charcoal text-sm mb-1">{office.city}</h4>
                      <p className="text-warm-gray">{office.address} — {office.state}</p>
                      <p className="text-warm-gray">Fone: {office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-title mb-6 text-left">
                <h2 className="font-display text-2xl font-bold text-charcoal">Perguntas Frequentes</h2>
                <p className="text-warm-gray text-sm mt-1">Dúvidas rápidas sobre atendimento e negociações.</p>
              </div>
              <FAQ />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Grid vs Stack rendering for the custom page blocks sequence (Requirement 12)
  const renderAllBlocks = () => {
    if (blocksLayout === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {blocks.map((blockId) => renderBlock(blockId))}
        </div>
      )
    }
    // Stack layout (one below another)
    return (
      <div className="space-y-12">
        {blocks.map((blockId) => renderBlock(blockId))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {renderAllBlocks()}
      </div>
    </div>
  )
}
