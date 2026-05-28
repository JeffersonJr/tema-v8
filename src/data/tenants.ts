export interface Tenant {
  id: string
  slug: string
  name: string
  tagline: string
  logo: string
  favicon: string
  creci: string
  description: string
  colors: {
    cream: string
    creamDark: string
    creamBorder: string
    charcoal: string
    charcoalLight: string
    warmGray: string
    gold: string
    goldLight: string
  }
  contacts: {
    phone: string
    phoneRaw: string
    whatsapp: string
    whatsappRaw: string
    email: string
    address: {
      street: string
      neighborhood: string
      city: string
      state: string
      fullAddress: string
    }
  }
  socials: {
    instagram: string
    facebook: string
    youtube: string
    linkedin?: string
  }
  aboutSignature?: {
    name: string
    role: string
    image: string
  }
  fonts?: {
    sans: string
    display: string
  }
}

export const tenants: Tenant[] = [
  {
    id: 'robles',
    slug: 'Robles',
    name: 'Robles Imobiliária',
    tagline: 'Imóveis que conquistam à primeiro vista.',
    logo: '/logo-robles.svg',
    favicon: '/favicon.ico',
    creci: 'CRECI-SP 28.741-J',
    description: 'Especialistas em imóveis de alto padrão há mais de 23 anos. Encontramos o imóvel ideal para cada momento da sua vida.',
    colors: {
      cream: '#F5F0E8',
      creamDark: '#EDE8DE',
      creamBorder: '#E0DAD0',
      charcoal: '#1C1916',
      charcoalLight: '#3D3731',
      warmGray: '#7C7269',
      gold: '#EDBF71',
      goldLight: '#F0D080',
    },
    contacts: {
      phone: '(11) 3568-2495',
      phoneRaw: '+551135682495',
      whatsapp: '(11) 95033-8488',
      whatsappRaw: '5511950338488',
      email: 'claudia@roblesimobiliariasp.com.br',
      address: {
        street: 'Avenida das Nações Unidas, nº 14171',
        neighborhood: 'Vila Gertrudes',
        city: 'São Paulo',
        state: 'SP',
        fullAddress: 'Marble Tower, Vila Gertrudes, São Paulo - SP',
      },
    },
    socials: {
      instagram: 'https://www.instagram.com/roblesimobiliaria/',
      facebook: 'https://www.facebook.com/roblesimobiliariasp/',
      youtube: 'https://www.youtube.com/channel/UCK65kTIZ4SxbnkskBPCfoEw',
    },
    aboutSignature: {
      name: 'Claudia Robles',
      role: 'Fundadora & Diretora Geral',
      image: '/assinatura.png',
    },
    fonts: {
      sans: 'DM Sans',
      display: 'Playfair Display',
    },
  },
  {
    id: 'lumina',
    slug: 'Lumina',
    name: 'Lumina Curadoria',
    tagline: 'Lançamentos imobiliários e design autoral em Curitiba.',
    logo: '/logo.png', // Lumina uses a minimalist dynamic logo mark
    favicon: '/favicon.ico',
    creci: 'CRECI-PR 45.892-F',
    description: 'Boutique imobiliária com foco exclusivo nos melhores lançamentos residenciais de Curitiba. Conectamos arquitetura de vanguarda, sustentabilidade e vivências urbanas exclusivas.',
    colors: {
      cream: '#FAFAFA',      // Minimalist pure off-white
      creamDark: '#F4F4F5',  // Zinc 100
      creamBorder: '#E4E4E7', // Zinc 200
      charcoal: '#09090B',   // Zinc 950
      charcoalLight: '#27272A', // Zinc 800
      warmGray: '#717178',   // Zinc 500
      gold: '#18181B',       // Deep Zinc 900 (ultra-minimal black instead of gold!)
      goldLight: '#3F3F46',  // Zinc 700
    },
    contacts: {
      phone: '(41) 3012-9876',
      phoneRaw: '+554130129876',
      whatsapp: '(41) 98877-6655',
      whatsappRaw: '5541988776655',
      email: 'curadoria@luminaimoveis.com.br',
      address: {
        street: 'Alameda Dom Pedro II, nº 321',
        neighborhood: 'Batel',
        city: 'Curitiba',
        state: 'PR',
        fullAddress: 'Edifício Batel Workspace, Batel, Curitiba - PR',
      },
    },
    socials: {
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
    },
    aboutSignature: {
      name: 'Mathias Ribas',
      role: 'Fundador & Curador Chefe',
      image: '/assinatura.png',
    },
    fonts: {
      sans: 'Inter',
      display: 'Outfit',
    },
  },
]

export function getTenantBySlug(slug: string): Tenant | undefined {
  return tenants.find((t) => t.slug.toLowerCase() === slug.toLowerCase())
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}
