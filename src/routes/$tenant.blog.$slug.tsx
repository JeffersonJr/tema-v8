import { useTenant } from '@/routes/$tenant'
import { createFileRoute, Link, notFound , useParams } from '@tanstack/react-router'
import { Clock, Tag, ArrowLeft, ArrowRight, Home, ChevronRight, Share2, BookOpen } from 'lucide-react'
import { getBlogPost, blogPosts } from '@/data/blog'
import type { BlogSection } from '@/data/blog'

export const Route = createFileRoute('/$tenant/blog/$slug')(({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPostPage,
}))

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-5 leading-snug"
        >
          {section.content}
        </h2>
      )
    case 'subheading':
      return (
        <h3
          key={index}
          className="font-display text-xl font-bold text-charcoal mt-8 mb-4"
        >
          {section.content}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={index} className="text-charcoal-light text-base md:text-lg leading-relaxed mb-6">
          {section.content}
        </p>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-gold bg-gold/5 rounded-r-2xl px-8 py-6 my-8"
        >
          <p className="font-display text-lg md:text-xl italic text-charcoal leading-relaxed">
            "{section.content}"
          </p>
        </blockquote>
      )
    case 'list':
      return (
        <div key={index} className="my-8 bg-cream-dark rounded-2xl p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-warm-gray mb-4">
            {section.content}
          </p>
          <ul className="space-y-3">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-charcoal-light text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    case 'tip':
      return (
        <div
          key={index}
          className="my-8 bg-charcoal rounded-2xl p-6 md:p-8 flex gap-4"
        >
          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen size={18} className="text-gold" />
          </div>
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-wider mb-2">Dica Robles</div>
            <p className="text-cream/80 text-base leading-relaxed">{section.content}</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

function BlogPostPage() {

  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant: string }
  const tenant = useTenant()

  const post = Route.useLoaderData()

  // Related posts (same category, excluding current)
  const related = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

  // Other posts if no related in same category
  const others = related.length > 0
    ? related
    : blogPosts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-warm-gray flex-wrap">
            <Link to="/$tenant" params={{ tenant: tenantSlug }} className="flex items-center gap-1 hover:text-gold transition-colors">
              <Home size={12} />
              Início
            </Link>
            <ChevronRight size={11} className="text-cream-border" />
            <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="hover:text-gold transition-colors">Blog</Link>
            <ChevronRight size={11} className="text-cream-border" />
            <span className="text-charcoal font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-cream/60 text-xs flex items-center gap-1.5">
                <Clock size={11} />
                {post.readTime}
              </span>
              <span className="text-cream/60 text-xs">{post.date}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-cream/75 text-base md:text-lg leading-relaxed max-w-2xl">
              {post.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Article Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <div>
            {/* Author Bar */}
            <div className="flex items-center justify-between border-b border-cream-border pb-6 mb-10 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={post.authorPhoto}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cream-border"
                />
                <div>
                  <div className="text-charcoal font-semibold">{post.author}</div>
                  <div className="text-warm-gray text-sm">{post.authorRole}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href })
                  }
                }}
                className="flex items-center gap-2 text-warm-gray text-sm hover:text-gold transition-colors border border-cream-border rounded-full px-4 py-2"
              >
                <Share2 size={14} />
                Compartilhar
              </button>
            </div>

            {/* Article Body */}
            <article className="prose-custom max-w-none">
              {post.content.map((section, i) => renderSection(section, i))}
            </article>

            {/* Tags */}
            <div className="border-t border-cream-border mt-12 pt-8">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-warm-gray" />
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-cream-dark border border-cream-border text-charcoal-light text-xs px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-cream-border">
              <Link
                to="/$tenant/blog" params={{ tenant: tenantSlug }}
                className="flex items-center gap-2 text-warm-gray text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar ao Blog
              </Link>
              <Link
                to="/$tenant/contato" params={{ tenant: tenantSlug }}
                className="btn-gold px-6 py-3 rounded-full text-sm font-semibold"
              >
                Fale com um consultor
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Article Summary */}
            <div className="bg-white border border-cream-border rounded-2xl p-6 sticky top-28">
              <div className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Neste artigo</div>
              <ul className="space-y-3">
                {post.content
                  .filter(s => s.type === 'heading')
                  .map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-warm-gray hover:text-charcoal transition-colors cursor-pointer">
                      <span className="text-gold font-bold text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {s.content}
                    </li>
                  ))}
              </ul>

              <div className="border-t border-cream-border mt-6 pt-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-warm-gray mb-3">Fale com nossa equipe</div>
                <p className="text-xs text-warm-gray leading-relaxed mb-4">
                  Tire suas dúvidas sobre o mercado imobiliário com nossos especialistas.
                </p>
                <Link
                  to="/$tenant/contato" params={{ tenant: tenantSlug }}
                  className="btn-gold w-full text-center py-3 rounded-xl text-xs font-semibold block"
                >
                  Consulta gratuita
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {others.length > 0 && (
          <div className="mt-16 border-t border-cream-border pt-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="section-title">
                  <h2 className="font-display text-2xl font-bold text-charcoal">Leia também</h2>
                </div>
              </div>
              <Link to="/$tenant/blog" params={{ tenant: tenantSlug }} className="text-gold text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ver todos <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map(p => (
                <Link
                  key={p.slug}
                  to="/$tenant/blog/$slug" params={{ tenant: tenantSlug, slug: p.slug }}
                  className="group flex gap-5 bg-white rounded-2xl border border-cream-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-32 shrink-0 overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="py-5 pr-5 flex flex-col justify-center">
                    <div className="text-[10px] font-semibold text-gold uppercase tracking-wider mb-2">{p.category}</div>
                    <h3 className="font-display text-sm font-bold text-charcoal leading-snug mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                      {p.title}
                    </h3>
                    <div className="text-warm-gray text-xs flex items-center gap-1.5">
                      <Clock size={10} />
                      {p.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
