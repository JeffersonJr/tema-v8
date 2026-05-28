import { Link, useParams } from '@tanstack/react-router'
import { BedDouble, Bath, Car, Maximize2, MapPin, Heart, ShieldAlert, PawPrint } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/data/properties'
import { getTenantBySlug } from '@/data/tenants'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'compact' | 'horizontal'
}

export function PropertyCard({ property, variant }: PropertyCardProps) {
  const { tenant: tenantSlug } = useParams({ strict: false }) as { tenant?: string }
  const tenant = getTenantBySlug(tenantSlug || '')
  
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

  if (cardVariant === 'horizontal') {
    return (
      <Link
        to="/$tenant/imovel/$id"
        params={{ tenant: tenantSlug || '', id: property.id }}
        className="property-card group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-cream-border relative"
      >
        <div className="w-full h-52 sm:w-56 sm:h-auto shrink-0 overflow-hidden relative">
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
            className={`absolute top-3 left-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer z-10 ${
              saved ? 'border-red-100 text-red-500' : 'border-cream-border text-warm-gray hover:text-red-500'
            }`}
            title={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </div>
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider tag-${property.purpose}`}>
                {property.purpose === 'venda' ? 'Venda' : property.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-cream text-charcoal-light capitalize">
                {property.type}
              </span>
              {showPetFriendly && property.petFriendly && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
                  <PawPrint size={10} /> Pet
                </span>
              )}
            </div>
            <h3 className="font-display text-base font-semibold text-charcoal leading-snug mb-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-warm-gray text-xs mb-3">
              <MapPin size={11} />
              {property.address.neighborhood}, {property.address.city}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 text-warm-gray text-xs mb-3">
              {showBedrooms && <span className="flex items-center gap-1"><BedDouble size={12} /> {property.bedrooms} qts</span>}
              {showBathrooms && <span className="flex items-center gap-1"><Bath size={12} /> {property.bathrooms} banhs</span>}
              {showArea && <span className="flex items-center gap-1"><Maximize2 size={12} /> {property.area}m²</span>}
              {showCondo && property.condoPrice && <span className="flex items-center gap-1">Cond: {formatPrice(property.condoPrice)}</span>}
            </div>
            <div className="text-lg font-bold text-charcoal font-display">
              {formatPrice(displayPrice)}
              {property.purpose === 'aluguel' && <span className="text-xs font-normal text-warm-gray">/mês</span>}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (cardVariant === 'compact') {
    return (
      <Link
        to="/$tenant/imovel/$id"
        params={{ tenant: tenantSlug || '', id: property.id }}
        className="property-card group block bg-white rounded-xl overflow-hidden border border-cream-border relative"
      >
        <div className="relative overflow-hidden h-44">
          <img
            src={property.images[0]}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.png'
            }}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-80px)] flex flex-wrap gap-1">
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider shadow-sm tag-${property.purpose}`}>
              {property.purpose === 'venda' ? 'Venda' : property.purpose === 'aluguel' ? 'Aluguel' : 'Lançamento'}
            </span>
          </div>
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer z-10 ${
              saved ? 'border-red-100 text-red-500' : 'border-cream-border text-warm-gray hover:text-red-500'
            }`}
            title={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </div>
        <div className="p-4">
          <div className="text-[10px] text-warm-gray uppercase tracking-widest mb-1">
            {property.address.neighborhood}, {property.address.city}
          </div>
          <h3 className="font-display text-sm font-semibold text-charcoal mb-2 leading-snug line-clamp-2">
            {property.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 text-warm-gray text-xs mb-3">
            {showBedrooms && <span className="flex items-center gap-0.5"><BedDouble size={11} /> {property.bedrooms}</span>}
            {showBedrooms && (showBathrooms || showArea) && <span className="text-cream-border">·</span>}
            {showBathrooms && <span className="flex items-center gap-0.5"><Bath size={11} /> {property.bathrooms}</span>}
            {showBathrooms && showArea && <span className="text-cream-border">·</span>}
            {showArea && <span className="flex items-center gap-0.5"><Maximize2 size={11} /> {property.area}m²</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-base font-bold text-charcoal font-display">
              {formatPrice(displayPrice)}
              {property.purpose === 'aluguel' && <span className="text-xs font-normal text-warm-gray ml-1">/mês</span>}
            </div>
            {showCondo && property.condoPrice && (
              <div className="text-[10px] text-warm-gray">Cond: {formatPrice(property.condoPrice)}</div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to="/$tenant/imovel/$id"
      params={{ tenant: tenantSlug || '', id: property.id }}
      className="property-card group block bg-white rounded-2xl overflow-hidden border border-cream-border relative"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.png'
          }}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
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
      <div className="p-6">
        <div className="flex items-center gap-1 text-warm-gray text-xs uppercase tracking-widest mb-2">
          <MapPin size={11} />
          {property.address.neighborhood}, {property.address.city} — {property.address.state}
        </div>
        <h3 className="font-display text-lg font-semibold text-charcoal mb-3 leading-snug">
          {property.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-4 text-warm-gray text-sm mb-5">
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
        
        <div className="flex items-end justify-between border-t border-cream-border pt-4">
          <div>
            <div className="font-display text-2xl font-bold text-charcoal">
              {formatPrice(displayPrice)}
            </div>
            {property.purpose === 'aluguel' && (
              <div className="text-xs text-warm-gray">por mês</div>
            )}
            {showCondo && property.condoPrice && (
              <div className="text-[10px] text-warm-gray mt-1">Condomínio: {formatPrice(property.condoPrice)}</div>
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
