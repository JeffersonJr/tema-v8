import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Heart, ArrowRight, Home, Trash2 } from 'lucide-react'
import properties from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'

export const Route = createFileRoute('/favoritos')({
  component: FavoritosPage,
})

function FavoritosPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  useEffect(() => {
    // Carregar favoritos do localStorage no client-side
    if (typeof window !== 'undefined') {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      setFavoriteIds(favs)
    }

    const handleUpdate = () => {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      setFavoriteIds(favs)
    }

    window.addEventListener('favorites-updated', handleUpdate)
    return () => window.removeEventListener('favorites-updated', handleUpdate)
  }, [])

  const clearAllFavorites = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('robles_favoritos', '[]')
      setFavoriteIds([])
      window.dispatchEvent(new Event('favorites-updated'))
    }
  }

  // Filtrar os imóveis que estão na lista de favoritos
  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id))

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-cream-border pb-8">
          <div>
            <div className="section-title">
              <h1 className="font-display text-4xl font-bold text-charcoal">Meus Favoritos</h1>
            </div>
            <p className="text-warm-gray mt-2 text-base">
              Seus imóveis residenciais e comerciais de luxo salvos para fácil acesso.
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer self-start md:self-end font-medium"
            >
              <Trash2 size={16} />
              Limpar todos os favoritos
            </button>
          )}
        </div>

        {/* Lista de Imóveis */}
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Empty State Premium */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-cream-border shadow-sm mt-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="animate-pulse" />
            </div>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-3">Sua lista está vazia</h2>
            <p className="text-warm-gray text-base leading-relaxed mb-8">
              Você ainda não favoritou nenhum imóvel. Explore nossa curadoria de alto padrão e salve seus preferidos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/buscar"
                search={{ finalidade: 'venda' }}
                className="btn-gold flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-102 cursor-pointer"
              >
                Comprar Imóveis <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="btn-outline flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-cream/30 transition-transform hover:scale-102 cursor-pointer"
              >
                <Home size={16} /> Voltar para o Início
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
