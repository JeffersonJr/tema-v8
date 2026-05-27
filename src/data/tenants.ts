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
  },
  {
    id: 'lumina',
    slug: 'Lumina',
    name: 'Lumina Imóveis',
    tagline: 'A arte de viver bem em endereços exclusivos.',
    logo: '/logo.png', // Lumina uses the same logo mark but we'll brand it with green accents!
    favicon: '/favicon.ico',
    creci: 'CRECI-SP 99.123-J',
    description: 'Boutique imobiliária focada em arquitetura de design, sustentabilidade e vivências únicas em áreas nobres.',
    colors: {
      cream: '#F2F6F4',      // Soft mint cream
      creamDark: '#E2ECE9',  // Dark mint cream
      creamBorder: '#C8DDD5', // Sage border
      charcoal: '#0D2018',   // Very dark green-charcoal
      charcoalLight: '#1C3A2E',
      warmGray: '#60796E',   // Greenish warm gray
      gold: '#3A8266',       // Emerald Green instead of Gold!
      goldLight: '#55AF8C',
    },
    contacts: {
      phone: '(11) 3999-1234',
      phoneRaw: '+551139991234',
      whatsapp: '(11) 99999-8888',
      whatsappRaw: '5511999998888',
      email: 'contato@luminaimoveis.com.br',
      address: {
        street: 'Rua Augusta, nº 2500',
        neighborhood: 'Cerqueira César',
        city: 'São Paulo',
        state: 'SP',
        fullAddress: 'Edifício Lumina, Cerqueira César, São Paulo - SP',
      },
    },
    socials: {
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
    },
    aboutSignature: {
      name: 'Arthur Lumina',
      role: 'Diretor Criativo',
      image: '/assinatura.png',
    },
  },
]

export function getTenantBySlug(slug: string): Tenant | undefined {
  return tenants.find((t) => t.slug.toLowerCase() === slug.toLowerCase())
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}
