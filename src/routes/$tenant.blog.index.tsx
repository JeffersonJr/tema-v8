import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute, Link , useParams } from '@tanstack/react-router'
import { ArrowRight, Clock, Tag, BookOpen } from 'lucide-react'
import { blogPosts } from '@/data/blog'

export const Route = createFileRoute('/$tenant/blog/')(({
  component: BlogPage,
}))

const CATEGORIES = ['Todos', 'Mercado', 'Guia do Comprador', 'Investimento', 'Financiamento']

function BlogPage() {

  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <div className="min-h-screen bg-cream pt-28">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen size={12} />
          Blog & Conteúdo
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Blog Robles
        </h1>
        <p className="text-warm-gray text-base max-w-xl mx-auto">
          Inteligência de mercado, guias práticos e análises exclusivas do mercado imobiliário de alto padrão — direto dos especialistas Robles.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                cat === 'Todos'
                  ? 'bg-charcoal text-cream'
                  : 'bg-white border border-cream-border text-warm-gray hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured Article */}
        {featured && (
          <div className="mb-16">
            <div className="text-xs font-semibold text-gold uppercase tracking-widest mb-5 flex items-center gap-2">
              <BookOpen size={13} />
              Artigo em Destaque
            </div>
            <Link
              to="/$tenant/blog/$slug" params={{ tenant: tenantSlug, slug: featured.slug }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-cream-border hover:shadow-2xl hover:shadow-charcoal/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/10 lg:bg-gradient-to-l" />
                <div className="absolute top-5 left-5">
                  <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-warm-gray mb-5">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {featured.readTime}
                  </span>
                  <span className="text-cream-border">·</span>
                  <span>{featured.date}</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-charcoal leading-snug mb-4 group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="text-warm-gray text-base leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-cream-border pt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.authorPhoto}
                      alt={featured.author}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-charcoal text-sm font-semibold">{featured.author}</div>
                      <div className="text-warm-gray text-xs">{featured.authorRole}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                    Ler artigo <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <div className="mb-4">
          <h2 className="font-display text-2xl font-bold text-charcoal">Mais artigos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to="/$tenant/blog/$slug" params={{ tenant: tenantSlug, slug: post.slug }}
              className="group bg-white rounded-2xl overflow-hidden border border-cream-border hover:shadow-xl hover:shadow-charcoal/8 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-charcoal/80 backdrop-blur-sm text-cream text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-warm-gray mb-3">
                  <Clock size={11} />
                  {post.readTime}
                  <span className="text-cream-border">·</span>
                  {post.date}
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-cream-border pt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorPhoto}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-charcoal">{post.author}</span>
                  </div>
                  <div className="text-gold">
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tags Cloud */}
        <div className="mt-16 bg-cream-dark rounded-3xl p-10">
          <div className="flex items-center gap-2 text-charcoal font-semibold text-sm mb-5">
            <Tag size={16} className="text-gold" />
            Temas populares
          </div>
          <div className="flex flex-wrap gap-2">
            {['Mercado', 'São Paulo', 'Luxo', 'Investimento', 'Condomínio', 'Praia', 'Financiamento', 'Valorização', 'Lançamentos', 'Guia', 'Alto Padrão', 'Jardins', 'Litoral', 'Patrimônio'].map((tag) => (
              <span
                key={tag}
                className="bg-white border border-cream-border text-charcoal-light text-xs px-4 py-2 rounded-full cursor-pointer hover:border-gold hover:text-gold transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-10 bg-charcoal rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">Newsletter exclusiva</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2">
              Fique por dentro do mercado
            </h3>
            <p className="text-cream/60 text-sm max-w-md">
              Receba análises semanais, lançamentos em primeira mão e oportunidades exclusivas diretamente no seu e-mail.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto shrink-0">
            <input
              type="email"
              placeholder="seu@email.com"
              className="bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold transition-colors flex-1 md:w-64"
            />
            <button className="btn-gold px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
