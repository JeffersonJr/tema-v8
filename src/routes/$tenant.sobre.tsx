import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute, Link , useParams } from '@tanstack/react-router'
import { Award, Heart, ArrowRight, Compass, Smile, ThumbsUp, Scale, Instagram, Facebook, Linkedin } from 'lucide-react'

export const Route = createFileRoute('/$tenant/sobre')({
  component: SobrePage,
})

const team = [
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
    description: 'Priorizamos o respeito mútuo em todas as interações, valorizando a diversidade e as necessidades individuais de cada cliente.',
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

function SobrePage() {

  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  return (
    <div className="min-h-screen bg-cream pt-28">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart size={12} />
          Nossa História
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Sobre a Robles
        </h1>
        <p className="text-warm-gray text-base max-w-xl mx-auto">
          Especialistas em encontrar o imóvel ideal para cada momento da sua vida com discrição e excelência.
        </p>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-title">
              <h2 className="font-display text-4xl font-bold text-charcoal">
                {tenant.builderSettings?.sobreTitle || `${tenant.name} — Curadoria Imobiliária`}
              </h2>
            </div>
            {tenant.builderSettings?.sobreText ? (
              <div 
                className={`mt-5 text-warm-gray leading-relaxed space-y-4 ${
                  tenant.builderSettings?.sobreTextFontSize || 'text-base'
                }`}
                dangerouslySetInnerHTML={{ __html: tenant.builderSettings.sobreText }}
              />
            ) : (
              <div className="space-y-4 mt-5 text-warm-gray text-base leading-relaxed">
                <p>
                  A Robles Imobiliária nasceu em 2002 da visão de Claudia Robles: criar uma imobiliária que tratasse cada cliente como único, entendendo não apenas o que ele quer, mas o que ele realmente precisa.
                </p>
                <p>
                  Começamos com um pequeno escritório nos Jardins, São Paulo. Hoje somos referência no mercado imobiliário de alto padrão em cinco das principais cidades do Brasil: São Paulo, Rio de Janeiro, Florianópolis, Curitiba e Belo Horizonte.
                </p>
                <p>
                  Nossa equipe é formada por especialistas com profundo conhecimento de cada mercado onde atuamos. Mais do que corretores, somos consultores que acompanham o cliente do primeiro contato às chaves na mão — e além.
                </p>
                <p>
                  R$ 2,4 bilhões em transações, 4.800 famílias atendidas e uma reputação construída negociação a negociação. Esse é o nosso legado, e é o que nos motiva a fazer ainda melhor todos os dias.
                </p>
              </div>
            )}
            
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
              src={tenant.builderSettings?.sobreImage || "/claudia.png"}
              alt={tenant.name}
              className="rounded-2xl w-full h-auto object-contain max-h-[500px] border border-cream-border/60 shadow-md bg-cream-dark"
            />
            {(!tenant.builderSettings?.sobreStats) && (
              <div className="absolute -bottom-6 -left-6 bg-gold text-white rounded-2xl p-6 w-40">
                <div className="font-display text-4xl font-bold">23</div>
                <div className="text-base mt-1 text-white/80">anos de mercado</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(tenant.builderSettings?.sobreStats 
              ? tenant.builderSettings.sobreStats.split(' · ').map((s: string) => {
                  const spaceIdx = s.indexOf(' ');
                  if (spaceIdx === -1) return { value: s, label: '' };
                  return {
                    value: s.substring(0, spaceIdx),
                    label: s.substring(spaceIdx + 1)
                  };
                })
              : [
                  { value: 'R$ 2,4 bi', label: 'Transacionados' },
                  { value: '4.800+', label: 'Famílias atendidas' },
                  { value: '1.240+', label: 'Imóveis disponíveis' },
                  { value: '5', label: 'Cidades de atuação' },
                ]
            ).map((s: any) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-gold mb-1">{s.value}</div>
                <div className="text-cream/50 text-sm uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
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

      {/* Team */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-title" style={{ textAlign: 'center' }}>
              <h2 className="font-display text-4xl font-bold text-charcoal">Nossa Equipe</h2>
            </div>
            <p className="text-warm-gray mt-3 max-w-xl mx-auto text-base">
              Especialistas apaixonados pelo mercado imobiliário, com presença nos melhores endereços do Brasil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden border border-cream-border group hover:-translate-y-1 transition-transform duration-300">
                <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-charcoal">{member.name}</h3>
                  <div className="text-gold text-sm font-medium uppercase tracking-wider mt-1 mb-3">{member.role}</div>
                  <p className="text-warm-gray text-base leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-warm-gray/60">{member.creci}</div>
                    <div className="flex gap-2">
                      <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-cream-border flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors">
                        <Instagram size={12} />
                      </a>
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-cream-border flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors">
                        <Linkedin size={12} />
                      </a>
                      <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-cream-border flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors">
                        <Facebook size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-cream-dark rounded-3xl p-10 md:p-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="section-title">
                <h2 className="font-display text-3xl font-bold text-charcoal">
                  Reconhecida pelo mercado
                </h2>
              </div>
              <p className="text-warm-gray text-base mt-3 leading-relaxed">
                Ao longo de 23 anos, a Robles Imobiliária acumulou prêmios e reconhecimentos que refletem nosso compromisso com a excelência no atendimento e nas transações imobiliárias.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: '2024', award: 'Melhor Imobiliária Premium SP', entity: 'SECOVI-SP' },
                { year: '2023', award: 'Top 5 Imobiliárias de Luxo BR', entity: 'Revista Exame' },
                { year: '2022', award: 'Excelência em Atendimento', entity: 'CRECI-SP' },
                { year: '2020', award: '20 anos de Mercado', entity: 'Prêmio IAB' },
              ].map((award) => (
                <div key={award.award} className="bg-white rounded-2xl p-4 text-center border border-cream-border">
                  <div className="text-gold font-bold text-lg">{award.year}</div>
                  <div className="text-charcoal text-sm font-semibold mt-1 leading-tight">{award.award}</div>
                  <div className="text-warm-gray text-xs mt-1">{award.entity}</div>
                </div>
              ))}
            </div>
          </div>
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
