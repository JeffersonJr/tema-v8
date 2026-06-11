import { Link, useParams } from '@tanstack/react-router'
import { BedDouble, Bath, Car, Maximize2, MapPin, Heart, PawPrint } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/data/properties'
import { useTenant } from '@/routes/$tenant'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'compact' | 'horizontal'
}

export function PropertyCard({ property, variant }: PropertyCardProps) {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant?: string }
  const tenant = useTenant()
  
  // Dynamic variants
  const cardVariant = variant || tenant?.builderSettings?.cardVariant || 'default'
  
  // Custom display specifications from Builder
  const showBedrooms = tenant?.builderSettings?.showCardBedrooms !== false
  const showBathrooms = tenant?.builderSettings?.showCardBathrooms !== false
  const showArea = tenant?.builderSettings?.showCardArea !== false
  const showCondo = !!tenant?.builderSettings?.showCardCondo
  const showPetFriendly = !!tenant?.builderSettings?.showCardPetFriendly

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      setSaved(favs.includes(property.id))
    }

    const handleUpdate = () => {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      setSaved(favs.includes(property.id))
    }

    window.addEventListener('favorites-updated', handleUpdate)
    return () => window.removeEventListener('favorites-updated', handleUpdate)
  }, [property.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const favs = JSON.parse(localStorage.getItem('robles_favoritos') || '[]')
      let newFavs
      if (favs.includes(property.id)) {
        newFavs = favs.filter((id: string) => id !== property.id)
        setSaved(false)
      } else {
        newFavs = [...favs, property.id]
        setSaved(true)
      }
      localStorage.setItem('robles_favoritos', JSON.stringify(newFavs))
      window.dispatchEvent(new Event('favorites-updated'))
    }
  }

  const displayPrice =
    property.purpose === 'aluguel' ? property.rentPrice! : property.price

  // Render Horizontal Styles (6 versions)
  if (cardVariant === 'horizontal') {
    const styleName = tenant?.builderSettings?.cardHorizontalStyle || 'classic'
    let cardClass = "property-card group flex flex-col sm:flex-row overflow-hidden border relative transition-all duration-300 "
    let isDark = styleName === 'dark-elegance' || styleName === 'dashboard'

    if (styleName === 'classic' || styleName === 'cozy') {
      cardClass += "bg-white border-cream-border hover:shadow-md rounded-2xl"
    } else if (styleName === 'minimalist' || styleName === 'strip') {
      cardClass += "bg-white shadow-none border-b-2 hover:border-b-slate-400 rounded-none border-t-0 border-l-0 border-r-0 border-slate-200"
    } else if (styleName === 'glassmorphism' || styleName === 'overlay') {
      cardClass += "bg-white/40 backdrop-blur-md border-white/20 shadow-lg rounded-2xl"
    } else if (styleName === 'bold-border' || styleName === 'offset') {
      cardClass += "bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_var(--theme-gold)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--theme-gold)] rounded-xl"
    } else if (styleName === 'editorial' || styleName === 'asymmetric') {
      cardClass += "bg-white border-cream-border hover:shadow-lg rounded-tr-3xl rounded-bl-3xl"
    } else if (styleName === 'dark-elegance' || styleName === 'dashboard') {
      cardClass += "bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl rounded-2xl text-slate-100"
    }

    return (
      <Link
        to="/$tenant/imovel/$id"
        params={{ tenant: tenantSlug || '', id: property.id }}
        className={cardClass}
      >
        <div className={`w-full h-52 sm:w-56 sm:h-auto shrink-0 overflow-hidden relative ${
          styleName === 'editorial' || styleName === 'asymmetric' ? 'rounded-bl-3xl sm:rounded-tr-none sm:rounded-bl-3xl' : ''
        }`}>
          <img
            src={property.images[0]}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.png'
            }}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 left-3 w-8 h-8 rounded-full border border-cream-border flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer z-10 text-warm-gray hover:text-red-500"
            title={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </div>

        <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider tag-${property.purpose}`}>
                {property.purpose === 'venda' ? 'Venda' : property.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider capitalize border ${
                isDark ? 'bg-slate-850 text-slate-200 border-slate-700' : 'bg-cream text-charcoal-light border-cream-border'
              }`}>
                {property.type}
              </span>
              {showPetFriendly && property.petFriendly && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
                  <PawPrint size={10} /> Pet
                </span>
              )}
            </div>
            
            <h3 className={`font-display text-base font-semibold leading-snug mb-1 truncate ${
              isDark ? 'text-white' : 'text-charcoal'
            } ${styleName === 'editorial' || styleName === 'asymmetric' ? 'font-display italic' : ''}`}>
              {property.title}
            </h3>
            
            <div className={`flex items-center gap-1 text-xs mb-3 ${isDark ? 'text-amber-400/90' : 'text-warm-gray'}`}>
              <MapPin size={11} />
              {property.address.neighborhood}, {property.address.city}
            </div>
          </div>

          <div>
            <div className={`flex flex-wrap items-center gap-3 text-xs mb-3 border-t pt-3 ${
              isDark ? 'text-slate-400 border-slate-800' : 'text-warm-gray border-cream-border/50'
            }`}>
              {showBedrooms && <span className="flex items-center gap-1"><BedDouble size={12} /> {property.bedrooms} qts</span>}
              {showBathrooms && <span className="flex items-center gap-1"><Bath size={12} /> {property.bathrooms} banhs</span>}
              {showArea && <span className="flex items-center gap-1"><Maximize2 size={12} /> {property.area}m²</span>}
              {showCondo && property.condo && <span className="flex items-center gap-1">Cond: {formatPrice(property.condo)}</span>}
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-lg font-bold font-display ${isDark ? 'text-amber-400' : 'text-charcoal'}`}>
                {formatPrice(displayPrice)}
                {property.purpose === 'aluguel' && <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-warm-gray'}`}>/mês</span>}
              </div>
              <div className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-warm-gray/60'}`}>Cód. {property.code}</div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Render Vertical Styles (6 versions: classic, minimalist, glassmorphism, editorial, bold-border, dark-elegance)
  const styleName = tenant?.builderSettings?.cardVerticalStyle || 'classic'
  const isDark = styleName === 'dark-elegance'

  let cardClass = "property-card group block overflow-hidden border transition-all duration-300 relative "
  if (styleName === 'classic') {
    cardClass += "bg-white border-cream-border hover:shadow-md rounded-2xl"
  } else if (styleName === 'minimalist') {
    cardClass += "bg-white border-slate-200 shadow-none hover:border-slate-400 rounded-xl"
  } else if (styleName === 'glassmorphism') {
    cardClass += "bg-white/40 backdrop-blur-md border-white/20 shadow-lg rounded-2xl"
  } else if (styleName === 'editorial') {
    cardClass += "bg-white border-slate-100 hover:border-slate-250 hover:shadow-sm rounded-none"
  } else if (styleName === 'bold-border') {
    cardClass += "bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_var(--theme-gold)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--theme-gold)] rounded-xl"
  } else if (styleName === 'dark-elegance') {
    cardClass += "bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl rounded-2xl"
  }

  return (
    <Link
      to="/$tenant/imovel/$id"
      params={{ tenant: tenantSlug || '', id: property.id }}
      className={cardClass}
    >
      <div className={`relative overflow-hidden aspect-[4/3] ${styleName === 'editorial' ? 'p-2' : ''}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.png'
          }}
          className={`w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ${
            styleName === 'editorial' ? 'rounded-sm' : ''
          }`}
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 max-w-[calc(100%-80px)]">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider shadow-sm tag-${property.purpose}`}>
            {property.purpose === 'venda' ? 'Venda' : property.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-gold text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Destaque
            </span>
          )}
        </div>
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer z-10 ${
            saved ? 'border-red-100 text-red-500' : 'border-cream-border text-warm-gray hover:text-red-500'
          }`}
          title={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : ''} />
        </button>
        {property.isLaunch && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent px-4 py-3">
            <span className="text-white text-xs">Entrega: {property.deliveryDate}</span>
          </div>
        )}
      </div>

      <div className={`p-6 ${isDark ? 'text-slate-100' : 'text-charcoal'}`}>
        <div className={`flex items-center gap-1 text-xs uppercase tracking-widest mb-2 ${isDark ? 'text-amber-400' : 'text-warm-gray'}`}>
          <MapPin size={11} />
          {property.address.neighborhood}, {property.address.city}
        </div>
        
        <h3 className={`text-lg font-semibold mb-3 leading-snug ${
          isDark ? 'text-white' : 'text-charcoal'
        } ${styleName === 'editorial' || styleName === 'classic' ? 'font-display' : 'font-sans'}`}>
          {property.title}
        </h3>
        
        <div className={`flex flex-wrap items-center gap-4 text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-warm-gray'}`}>
          {showBedrooms && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {property.bedrooms}
            </span>
          )}
          {showBathrooms && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Car size={14} />
            {property.parkingSpaces}
          </span>
          {showArea && (
            <span className="flex items-center gap-1.5">
              <Maximize2 size={14} />
              {property.area}m²
            </span>
          )}
          {showPetFriendly && property.petFriendly && (
            <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              <PawPrint size={13} /> Pet
            </span>
          )}
        </div>
        
        <div className={`flex items-end justify-between border-t pt-4 ${isDark ? 'border-slate-800' : 'border-cream-border'}`}>
          <div>
            <div className={`text-2xl font-bold font-display ${isDark ? 'text-amber-400' : 'text-charcoal'}`}>
              {formatPrice(displayPrice)}
            </div>
            {property.purpose === 'aluguel' && (
              <div className="text-xs text-warm-gray">por mês</div>
            )}
            {showCondo && property.condo && (
              <div className="text-[10px] text-warm-gray mt-1">Condomínio: {formatPrice(property.condo)}</div>
            )}
          </div>
          <div className="text-xs text-warm-gray">
            Cód. {property.code}
          </div>
        </div>
      </div>
    </Link>
  )
}

