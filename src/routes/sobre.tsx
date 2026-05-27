import { createFileRoute, Link } from '@tanstack/react-router'
import { Award, Heart, ArrowRight, Compass, Smile, ThumbsUp, Scale } from 'lucide-react'

export const Route = createFileRoute('/sobre')({
  component: SobrePage,
})

const team = [
  {
    name: 'Claudia Robles',
    role: 'Diretora Geral & Fundadora',
    bio: 'Mais de 25 anos no mercado imobiliário premium. Formada em Direito pela USP com MBA em Real Estate pela FGV.',
    photo: '/claudia.png',
    creci: 'CRECI-SP 82.341',
  },
  {
    name: 'Rafaela Monteiro',
    role: 'Diretora Comercial — São Paulo',
    bio: 'Especialista em imóveis de alto padrão em Jardins, Moema e Pinheiros. Referência no mercado paulistano há 14 anos.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SP 187.342',
  },
  {
    name: 'Thiago Cavalcante',
    role: 'Diretor Comercial — Rio de Janeiro',
    bio: 'Conhece cada detalhe do mercado carioca. Especialista em Ipanema, Leblon e Barra da Tijuca há 17 anos.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-RJ 23.814',
  },
  {
    name: 'Marcelo Duarte',
    role: 'Gerente — Florianópolis',
    bio: 'Referência em Jurerê Internacional e Campeche. Especialista em imóveis de alto padrão no litoral catarinense.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SC 18.234',
  },
  {
    name: 'Carolina Ferraz',
    role: 'Gerente — Curitiba & BH',
    bio: 'Atua no mercado de luxo de Curitiba e BH há 11 anos. Especialista em condomínios fechados e imóveis residenciais premium.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-PR 31.459',
  },
  {
    name: 'Bruno Nakamura',
    role: 'Gerente de Lançamentos',
    bio: 'Responsável pela área de empreendimentos e lançamentos. Experiência em incorporação imobiliária e projetos boutique.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&q=80&fit=crop',
    creci: 'CRECI-SP 204.871',
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
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&fit=crop"
          alt="Sobre a Robles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gold text-sm uppercase tracking-widest font-semibold mb-3">Nossa História</div>
            <h1 className="font-display text-5xl font-bold text-white">Sobre a Robles</h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-title">
              <h2 className="font-display text-4xl font-bold text-charcoal">
                23 anos encontrando o imóvel certo para cada pessoa.
              </h2>
            </div>
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
            
            <div className="mt-8 flex flex-col items-start border-t border-cream-border pt-6">
              <img
                src="/assinatura.png"
                alt="Assinatura Claudia Robles"
                className="h-14 w-auto object-contain brightness-95 filter"
              />
              <span className="text-lg font-semibold text-charcoal mt-2">Claudia Robles</span>
              <span className="text-sm text-warm-gray">Fundadora & Diretora Geral</span>
            </div>
          </div>
          <div className="relative">
            <img
              src="/claudia.png"
              alt="Claudia Robles"
              className="rounded-2xl w-full h-auto object-contain max-h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-gold text-white rounded-2xl p-6 w-40">
              <div className="font-display text-4xl font-bold">23</div>
              <div className="text-base mt-1 text-white/80">anos de mercado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'R$ 2,4 bi', label: 'Transacionados' },
              { value: '4.800+', label: 'Famílias atendidas' },
              { value: '1.240+', label: 'Imóveis disponíveis' },
              { value: '5', label: 'Cidades de atuação' },
            ].map((s) => (
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
                  <div className="text-sm text-warm-gray/60">{member.creci}</div>
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
            <Link to="/buscar" className="btn-gold px-8 py-4 rounded-full text-sm font-semibold">
              Ver imóveis
            </Link>
            <Link to="/contato" className="border border-cream/30 text-cream hover:border-gold hover:text-gold px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center gap-2 justify-center">
              Fale conosco <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
