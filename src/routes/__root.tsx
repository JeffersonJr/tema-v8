import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle, ChevronDown as ChevDown } from 'lucide-react'

import '../styles.css'
import { NotFoundPage } from '../components/NotFoundPage'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Robles Imobiliária — Imóveis de Alto Padrão' },
      {
        name: 'description',
        content:
          'Robles Imobiliária: imóveis residenciais e comerciais de alto padrão em São Paulo, Rio de Janeiro, Florianópolis, Curitiba e Belo Horizonte.',
      },
      { name: 'generator', content: 'Microsistec CRM (https://microsistec.com.br) & Developed by Evolves Tecnologia (https://evolves.site)' },
      { name: 'author', content: 'Jefferson Campos Beira Junior (https://github.com/JeffersonJr)' },
      { name: 'template-author', content: 'Jefferson Campos Beira Junior' },
      { name: 'template-author-profile', content: 'https://github.com/JeffersonJr' },
      { name: 'template-model', content: 'Modelo V8' },
      { name: 'crm', content: 'Microsistec' },
      { name: 'crm-url', content: 'https://microsistec.com.br' },
      { name: 'developer', content: 'Evolves Tecnologia' },
      { name: 'developer-url', content: 'https://evolves.site' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        {/* 
          CRM: Microsistec (https://microsistec.com.br)
          Desenvolvido por: Evolves Tecnologia (https://evolves.site)
          Template: Modelo V8 desenvolvido por Jefferson Campos Beira Junior (https://github.com/JeffersonJr)
        */}
      </head>
      <body>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.microsistecCRM = { name: "Microsistec CRM", website: "https://microsistec.com.br", version: "V8" };
              window.developedBy = { name: "Evolves Tecnologia", website: "https://evolves.site" };
              window.templateSignature = { author: "Jefferson Campos Beira Junior", profile: "https://github.com/JeffersonJr", model: "V8" };
            `
          }}
        />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
