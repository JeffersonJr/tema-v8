import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Award, Heart, ArrowRight, Compass, Smile, ThumbsUp, Scale, Instagram, Facebook, Linkedin, Clock } from 'lucide-react'

export const Route = createFileRoute('/$tenant/sobre')({
  component: SobrePage,
})

const teamStatic = [
  {
    name: 'Claudia Robles',
    role: 'Diretora Geral & Fundadora',
    bio: 'Mais de 25 anos no mercado imobiliário premium. Formada em Direito pela USP com MBA em Real Estate pela FGV.',
    photo: '/claudia.png',
    creci: 'CRECI-SP 82.341',
    socials: { instagram: 'https://www.instagram.com/roblesimobiliaria/', linkedin: '#', facebook: 'https://www.facebook.com/roblesimobiliariasp/' },
  },
  {
    name: 'Rafaela Monteiro',
    role: 'Diretora Comercial — São Paulo',
    bio: 'Especialista em imóveis de alto padrão em Jardins, Moema e Pinheiros. Referência no mercado paulistano há 14 anos.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SP 187.342',
    socials: { instagram: '#', linkedin: '#', facebook: '#' },
  },
  {
    name: 'Thiago Cavalcante',
    role: 'Diretor Comercial — Rio de Janeiro',
    bio: 'Conhece cada detalhe do mercado carioca. Especialista em Ipanema, Leblon e Barra da Tijuca há 17 anos.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-RJ 23.814',
    socials: { instagram: '#', linkedin: '#', facebook: '#' },
  },
  {
    name: 'Marcelo Duarte',
    role: 'Gerente — Florianópolis',
    bio: 'Referência em Jurerê Internacional e Campeche. Especialista em imóveis de alto padrão no litoral catarinense.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SC 18.234',
    socials: { instagram: '#', linkedin: '#', facebook: '#' },
  },
  {
    name: 'Carolina Ferraz',
    role: 'Gerente — Curitiba & BH',
    bio: 'Atua no mercado de luxo de Curitiba e BH há 11 anos. Especialista em condomínios fechados e imóveis residenciais premium.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-PR 31.459',
    socials: { instagram: '#', linkedin: '#', facebook: '#' },
  },
  {
    name: 'Bruno Nakamura',
    role: 'Gerente de Lançamentos',
    bio: 'Responsável pela área de empreendimentos e lançamentos. Experiência em incorporação imobiliária e projetos boutique.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SP 204.871',
    socials: { instagram: '#', linkedin: '#', facebook: '#' },
  },
]

const values = [
  {
    icon: Heart,
    title: 'Respeito',
    description: 'Priorizamos o respeito músuo em todas as interações, valorizando a diversidade e as necessidades individuais de cada cliente.',
  },
  {
    icon: Compass,
    title: 'Orientação ao Cliente',
    description: 'Colocamos as necessidades e os interesses dos clientes em primeiro lugar, fornecendo orientação personalizada e soluções adaptadas às suas circunstâncias únicas.',
  },
  {
    icon: Smile,
    title: 'Bom Atendimento',
    description: 'Comprometemo-nos a oferecer um serviço excepcional, demonstrando profissionalismo, cortesia e eficiência em cada etapa do processo.',
  },
  {
    icon: Award,
    title: 'Liderança',
    description: 'Buscamos liderar pelo exemplo, mantendo os mais altos padrões de integridade, competência e inovação em tudo o que fazemos.',
  },
  {
    icon: Scale,
    title: 'Ética',
    description: 'Agimos com integridade e honestidade em todas as nossas interações, mantendo a confiança e a transparência em nossos relacionamentos com os clientes e parceiros.',
  },
  {
    icon: ThumbsUp,
    title: 'Satisfação do Cliente',
    description: 'Nosso objetivo é garantir a satisfação total do cliente, superando suas expectativas e proporcionando uma experiência gratificante e memorável em cada momento.',
  },
]

import { useTenant } from '@/routes/$tenant'

function SobrePage() {
  const tenant = useTenant()
  const { tenant: tenantSlug } = useParams({ from: '/$tenant/sobre' })

  const settings = tenant.builderSettings || {}
  const pageStructure = settings.pageStructures?.sobre || 'editorial'
  const blocks = settings.pageBlocks?.sobre || ['hero', 'text', 'stats', 'team']
  const blocksLayout = settings.pageBlocksLayout?.sobre || 'stack'

  const sobreTitle = settings.sobreTitle || 'Nossa História, Seu Futuro'
  const sobreText = settings.sobreText || 'A Robles Imobiliária nasceu em 2002 para assessorar famílias exigentes a conquistarem residências extraordinárias com total segurança jurídica e discrição.'
  const sobreImage = settings.sobreImage || "/claudia.png"

  const renderHero = () => {
    if (pageStructure === 'magazine') {
      return (
        <div key="hero" className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden mb-12 rounded-3xl border border-cream-border">
          <img src={sobreImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center px-6 animate-fade-in">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-3">{sobreTitle}</h1>
            <p className="text-cream/80 text-sm md:text-base max-w-xl mx-auto">Conheça nossa tradição e curadoria extraordinária.</p>
          </div>
        </div>
      )
    }

    if (pageStructure === 'centered') {
      return (
        <div key="hero" className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart size={12} />
            Nossa Tradição
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {sobreTitle}
          </h1>
          <p className="text-warm-gray text-base max-w-xl mx-auto">
            Mais do que imóveis, curamos patrimônios e realizamos sonhos de vida.
          </p>
        </div>
      )
    }

    // Default: 'editorial'
    return (
      <div key="hero" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 animate-fade-in">
        <div className="text-left space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Heart size={12} />
            Legado de Prestígio
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {sobreTitle}
          </h1>
          <p className="text-warm-gray text-base leading-relaxed">
            Uma trajetória esculpida na excelência e atendimento sob medida para o mercado de alto luxo nacional.
          </p>
        </div>
        <div className="h-64 rounded-3xl overflow-hidden shadow-md border border-cream-border">
          <img src={sobreImage} alt="Cover" className="w-full h-full object-cover" />
        </div>
      </div>
    )
  }

  const renderStorySection = () => (
    <section key="text" className="max-w-5xl mx-auto py-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="section-title">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              {sobreTitle}
            </h2>
          </div>
          <div 
            className="mt-5 text-warm-gray leading-relaxed space-y-4 text-base"
            dangerouslySetInnerHTML={{ __html: sobreText }}
          />
          <div className="mt-8 flex flex-col items-start border-t border-cream-border pt-6">
            <img
              src={tenant.aboutSignature?.image || "/assinatura.png"}
              alt={`Assinatura ${tenant.aboutSignature?.name || tenant.name}`}
              className="h-14 w-auto object-contain brightness-95 filter"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-lg font-semibold text-charcoal mt-2">{tenant.aboutSignature?.name || "Claudia Robles"}</span>
            <span className="text-sm text-warm-gray">{tenant.aboutSignature?.role || "Fundadora & Diretora Geral"}</span>
          </div>
        </div>
        <div className="relative">
          <img
            src={sobreImage}
            alt={tenant.name}
            className="rounded-2xl w-full h-auto object-contain max-h-[500px] border border-cream-border/60 shadow-md bg-cream-dark"
          />
          {(!settings.sobreStats) && (
            <div className="absolute -bottom-6 -left-6 bg-gold text-white rounded-2xl p-6 w-40 shadow-lg">
              <div className="font-display text-4xl font-bold">23</div>
              <div className="text-base mt-1 text-white/80">anos de mercado</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )

  const renderStatsSection = () => {
    const rawStats = settings.sobreStats
    const parsedStats = rawStats
      ? rawStats.split(/\s*\.\s*/).map((s: string) => {
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
          { value: '5', label: 'Cidades de atuação' },
        ]

    return (
      <section key="stats" className="bg-charcoal py-16 rounded-3xl border border-cream-border my-6 animate-fade-in">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {parsedStats.map((s: any, idx: number) => (
              <div key={idx}>
                <div className="font-display text-3xl font-bold text-gold mb-1">{s.value}</div>
                <div className="text-cream/50 text-sm uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const renderTeamSection = () => {
    const teamMembers = settings.team && settings.team.length > 0 ? settings.team : teamStatic
    const tStyle = settings.teamStyle || 'grid'

    return (
      <section key="team" className="bg-cream-dark py-16 rounded-3xl border border-cream-border my-6 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-title" style={{ textAlign: 'center' }}>
              <h2 className="font-display text-3xl font-bold text-charcoal">Nossa Equipe</h2>
            </div>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto text-base">
              Especialistas dedicados ao mercado imobiliário corporativo e residencial boutique de alto padrão.
            </p>
          </div>

          <div className={
            tStyle === 'list'
              ? "space-y-4 max-w-2xl mx-auto"
              : tStyle === 'minimal'
              ? "flex flex-wrap justify-center gap-8"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }>
            {teamMembers.map((member: any, idx: number) => {
              if (tStyle === 'list') {
                return (
                  <div key={idx} className="bg-white border border-cream-border rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <img src={member.photo} alt={member.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                      <div className="text-left">
                        <h4 className="font-bold text-charcoal text-base">{member.name}</h4>
                        <p className="text-gold text-xs font-semibold">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-charcoal bg-cream-dark px-4 py-2 rounded-full">{member.phone}</span>
                  </div>
                )
              }
              if (tStyle === 'minimal') {
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full border-2 border-gold object-cover shadow-md mb-3" />
                    <h4 className="font-bold text-charcoal text-sm">{member.name}</h4>
                    <p className="text-warm-gray text-xs">{member.role}</p>
                  </div>
                )
              }
              // Grid or Cards style
              return (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-cream-border group hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold text-charcoal">{member.name}</h3>
                    <p className="text-gold text-xs font-semibold uppercase tracking-widest mt-1 mb-3">{member.role}</p>
                    <p className="text-warm-gray text-sm leading-relaxed mb-4">{member.bio || "Especialista perito de alto padrão focado em atendimento personalizado de excelência."}</p>
                    <span className="text-xs font-semibold text-charcoal bg-slate-50 border px-4 py-2 rounded-full">{member.phone}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  const renderBlock = (blockId: string) => {
    switch (blockId) {
      case 'hero':
        return renderHero()
      case 'text':
        return renderStorySection()
      case 'stats':
        return renderStatsSection()
      case 'team':
        return renderTeamSection()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className={blocksLayout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start" : "space-y-12"}>
          {blocks.map((blockId) => renderBlock(blockId))}
        </div>
      </div>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
        <div className="text-center mb-12">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2 className="font-display text-4xl font-bold text-charcoal">Nossos Valores</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-8 border border-cream-border hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">{v.title}</h3>
                <p className="text-warm-gray text-base leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-cream mb-4">
            Pronto para encontrar<br />seu próximo imóvel?
          </h2>
          <p className="text-cream/60 mb-8 text-base">
            Nossa equipe está pronta para ajudar você a encontrar o imóvel ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/$tenant/buscar" params={{ tenant: tenantSlug }} className="btn-gold px-8 py-4 rounded-full text-sm font-semibold">
              Ver imóveis
            </Link>
            <Link to="/$tenant/contato" params={{ tenant: tenantSlug }} className="border border-cream/30 text-cream hover:border-gold hover:text-gold px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center gap-2 justify-center">
              Fale conosco <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
