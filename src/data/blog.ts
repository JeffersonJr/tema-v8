export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  category: string
  author: string
  authorRole: string
  authorPhoto: string
  date: string
  readTime: string
  coverImage: string
  excerpt: string
  content: BlogSection[]
  tags: string[]
  featured?: boolean
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'list' | 'tip'
  content: string
  items?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mercado-imoveis-luxo-sp-2025',
    title: 'Mercado de Imóveis de Luxo em São Paulo: O Que Esperar em 2025',
    subtitle: 'Análise exclusiva das tendências que vão definir o alto padrão paulistano nos próximos meses',
    category: 'Mercado',
    author: 'Claudia Robles',
    authorRole: 'Fundadora & Diretora Geral',
    authorPhoto: '/claudia.png',
    date: '20 de maio de 2025',
    readTime: '7 min de leitura',
    coverImage: '/blog_mercado_luxo.png',
    excerpt: 'O mercado imobiliário de alto padrão em São Paulo vive um momento singular. Com a taxa Selic em trajetória descendente e o dólar favorecendo investidores estrangeiros, os Jardins, Moema e Itaim Bibi nunca estiveram tão aquecidos.',
    featured: true,
    tags: ['Mercado', 'São Paulo', 'Luxo', 'Tendências'],
    content: [
      {
        type: 'paragraph',
        content: 'O mercado imobiliário de alto padrão em São Paulo vive um momento singular. Com a taxa Selic em trajetória descendente e o dólar favorecendo investidores estrangeiros, os Jardins, Moema e Itaim Bibi nunca estiveram tão aquecidos. Em 2024, o volume de transações acima de R$ 3 milhões cresceu 28% em relação ao ano anterior — e as perspectivas para 2025 são ainda mais promissoras.'
      },
      {
        type: 'heading',
        content: 'Os bairros que mais valorizaram'
      },
      {
        type: 'paragraph',
        content: 'Jardins e Vila Nova Conceição lideram o ranking de valorização com alta média de 18% ao ano. O movimento é puxado pela escassez de terrenos disponíveis e pela demanda consistente de executivos e famílias de alta renda que preferem a região pela infraestrutura e qualidade de vida incomparáveis.'
      },
      {
        type: 'paragraph',
        content: 'Moema, por sua vez, consolidou-se como a nova fronteira do luxo paulistano. Com bairros arborizados, acesso facilitado ao metrô e uma oferta gastronômica e cultural de primeira linha, o metro quadrado no miolo do bairro ultrapassou R$ 22.000 em empreendimentos novos.'
      },
      {
        type: 'quote',
        content: 'Quem comprou um apartamento nos Jardins há 5 anos e pagou R$ 2 milhões, hoje tem um patrimônio avaliado em mais de R$ 3,2 milhões — uma rentabilidade que supera com folga qualquer investimento financeiro no mesmo período.'
      },
      {
        type: 'heading',
        content: 'O que muda com a queda dos juros'
      },
      {
        type: 'paragraph',
        content: 'A redução da Selic tem efeito direto e imediato no mercado de alto padrão. Com o custo do dinheiro menor, a comparação com renda fixa fica ainda mais favorável ao imóvel — especialmente para quem busca proteção patrimonial aliada à valorização real.'
      },
      {
        type: 'paragraph',
        content: 'Além disso, as taxas de financiamento imobiliário tendem a cair nos próximos trimestres, o que deve trazer para o mercado um perfil de comprador que antes optava pelo aluguel. A transição aluguel → compra deve ser um dos fenômenos mais importantes de 2025.'
      },
      {
        type: 'subheading',
        content: 'Tipologias mais procuradas'
      },
      {
        type: 'list',
        content: 'O que os compradores de alto padrão mais buscam em 2025:',
        items: [
          'Coberturas duplex com terraço privativo e piscina — alta de 34% na procura',
          'Apartamentos com home office integrado ao layout principal',
          'Unidades em edifícios boutique (até 20 andares) com portaria exclusiva',
          'Imóveis com automação residencial completa e energia solar',
          'Plantas abertas acima de 200m² com varanda gourmet'
        ]
      },
      {
        type: 'tip',
        content: 'Dica Robles: Se você está pensando em investir, priorize empreendimentos em fase de lançamento em Moema e Pinheiros. O potencial de valorização até a entrega pode superar 25% em projetos bem localizados.'
      },
      {
        type: 'heading',
        content: 'Perspectivas para o segundo semestre'
      },
      {
        type: 'paragraph',
        content: 'A Robles Imobiliária monitora ativamente o pipeline de lançamentos para os próximos 18 meses. Identificamos pelo menos 12 novos empreendimentos de alto padrão com VGV acima de R$ 500 milhões previstos para São Paulo — um volume recorde que demonstra a confiança das incorporadoras no segmento.'
      },
      {
        type: 'paragraph',
        content: 'Nossa recomendação para investidores e compradores finais é clara: o melhor momento de entrar no mercado é agora, antes que a curva de preços se acelere com a retomada do ciclo de crédito imobiliário. Nossa equipe está à disposição para uma consultoria personalizada e gratuita.'
      }
    ]
  },
  {
    slug: 'guia-condominio-fechado',
    title: 'Condomínio Fechado: Tudo o Que Você Precisa Saber Antes de Comprar',
    subtitle: 'Da infraestrutura ao regulamento interno — o guia definitivo para fazer a escolha certa',
    category: 'Guia do Comprador',
    author: 'Rafaela Monteiro',
    authorRole: 'Diretora Comercial — São Paulo',
    authorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&q=80&fit=crop&crop=face',
    date: '15 de maio de 2025',
    readTime: '9 min de leitura',
    coverImage: '/blog_condominio.png',
    excerpt: 'Comprar uma casa em condomínio fechado é uma das decisões mais importantes da vida. Segurança, qualidade de vida e valorização patrimonial são os atrativos — mas há muito o que avaliar antes de assinar o contrato.',
    tags: ['Condomínio', 'Guia', 'Casa', 'Segurança'],
    content: [
      {
        type: 'paragraph',
        content: 'Comprar uma casa em condomínio fechado é uma das decisões mais importantes da vida. Segurança, qualidade de vida e valorização patrimonial são os principais atrativos — mas há muito o que avaliar antes de assinar o contrato. Este guia reúne tudo o que nossa equipe de especialistas aprendeu em mais de 23 anos de mercado.'
      },
      {
        type: 'heading',
        content: '1. Localização e Acesso'
      },
      {
        type: 'paragraph',
        content: 'A localização de um condomínio fechado vai muito além do endereço. Avalie o tempo de deslocamento até o trabalho, a escola dos filhos e os serviços essenciais. Condomínios excelentes podem perder valor rapidamente se a infraestrutura viária ao redor deteriorar.'
      },
      {
        type: 'paragraph',
        content: 'Visite o condomínio em diferentes horários — manhã, tarde e fim de semana. O trânsito no portão de entrada e o tempo de espera para passar pela guarita são indicadores importantes de qualidade de gestão.'
      },
      {
        type: 'heading',
        content: '2. A Convenção e o Regulamento Interno'
      },
      {
        type: 'paragraph',
        content: 'Antes de qualquer decisão, leia atentamente a convenção condominial e o regulamento interno. Esses documentos definem regras sobre obras, uso de áreas comuns, animais de estimação, aluguel para temporada e muito mais.'
      },
      {
        type: 'quote',
        content: 'Muitos compradores se arrependem de não terem lido o regulamento antes. Descobrem depois que não podem ter mais de um cachorro, ou que reformas são proibidas por 6 meses após a mudança. Sempre leia tudo.'
      },
      {
        type: 'heading',
        content: '3. Taxa de Condomínio e Saúde Financeira'
      },
      {
        type: 'paragraph',
        content: 'Solicite os últimos 12 meses de balancetes e atas de assembleia. Condomínios com fundo de reserva bem constituído e taxa de inadimplência abaixo de 5% são sinais de boa gestão. Condomínios com caixa negativo frequentemente têm obras atrasadas e cobranças extras surpresa.'
      },
      {
        type: 'list',
        content: 'Documentos essenciais para solicitar:',
        items: [
          'Balancetes dos últimos 12 meses',
          'Ata da última assembleia ordinária',
          'Certidão negativa de débitos do imóvel',
          'Laudo do Corpo de Bombeiros atualizado',
          'Contrato e avaliação da empresa de segurança',
          'Relatório de obras pendentes e prazo de execução'
        ]
      },
      {
        type: 'heading',
        content: '4. Segurança: O que realmente importa'
      },
      {
        type: 'paragraph',
        content: 'O sistema de segurança de um condomínio fechado vai muito além das câmeras e guarita. Avalie: ronda perimetral, controle biométrico, comunicação entre moradores e segurança, sistema de alarme perimetral e tempo médio de resposta a ocorrências.'
      },
      {
        type: 'tip',
        content: 'Dica Robles: Converse com moradores do condomínio antes de comprar. Eles vão te contar sobre a realidade do dia a dia que nenhum corretor ou incorporadora vai revelar — desde a qualidade da administração até os vizinhos problemáticos.'
      },
      {
        type: 'heading',
        content: '5. Potencial de Valorização'
      },
      {
        type: 'paragraph',
        content: 'Condomínios com gestão profissional, áreas de lazer bem mantidas e localização consolidada valorizam consistentemente. Em São Paulo e na região metropolitana, condomínios de alto padrão em Alphaville, Tamboré e Granja Viana apresentaram valorização média de 12% ao ano na última década.'
      },
      {
        type: 'paragraph',
        content: 'Nossa equipe especializada em condomínios fechados pode te auxiliar em toda a análise — desde a due diligence documental até a negociação do melhor preço. Agende uma conversa gratuita com nossos consultores.'
      }
    ]
  },
  {
    slug: 'imovel-praia-investimento',
    title: 'Imóvel na Praia: Investimento ou Sonho? Como Fazer as Duas Coisas',
    subtitle: 'São Sebastião, Ubatuba e o litoral paulista como destino de investimento de alto retorno',
    category: 'Investimento',
    author: 'Bruno Nakamura',
    authorRole: 'Gerente de Lançamentos',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&fit=crop&crop=face',
    date: '8 de maio de 2025',
    readTime: '6 min de leitura',
    coverImage: '/blog_praia.png',
    excerpt: 'O litoral norte de São Paulo — São Sebastião, Ubatuba e Ilhabela — vive uma transformação sem precedentes. A chegada de compradores de alto poder aquisitivo está redefinindo o mercado e criando oportunidades únicas de investimento.',
    tags: ['Praia', 'Investimento', 'São Sebastião', 'Ubatuba', 'Litoral'],
    content: [
      {
        type: 'paragraph',
        content: 'O litoral norte de São Paulo — São Sebastião, Ubatuba e Ilhabela — vive uma transformação sem precedentes. A chegada de compradores de alto poder aquisitivo, acelerada pela pandemia e pela valorização do trabalho remoto, está redefinindo o mercado e criando oportunidades únicas de investimento com retorno duplo: valorização patrimonial + renda com locação por temporada.'
      },
      {
        type: 'heading',
        content: 'Por que o litoral paulista está em alta'
      },
      {
        type: 'paragraph',
        content: 'Diferentemente de Florianópolis e do litoral carioca, o litoral norte paulista permaneceu relativamente acessível até 2020. Desde então, o preço médio por metro quadrado em São Sebastião saltou de R$ 8.500 para R$ 16.000 — uma valorização de 88% em apenas 4 anos. Quem comprou nessa janela dobrou o patrimônio.'
      },
      {
        type: 'quote',
        content: 'Uma casa frente ao mar em São Sebastião com 300m² que custava R$ 1,8 milhão em 2020 vale hoje entre R$ 3,2 e R$ 4 milhões. E gera em torno de R$ 15.000 a R$ 25.000 por mês em locação por temporada nas altas estações.'
      },
      {
        type: 'heading',
        content: 'A lógica do investimento duplo'
      },
      {
        type: 'paragraph',
        content: 'A grande vantagem do imóvel de praia de alto padrão é que ele pode ser simultaneamente residência de lazer para a família e fonte de renda quando não está em uso. Plataformas como Airbnb e VRBO democratizaram a locação por temporada, e imóveis bem equipados e bem localizados no litoral norte paulista apresentam taxa de ocupação acima de 70% nos meses de alta temporada.'
      },
      {
        type: 'list',
        content: 'Características que maximizam a renda com temporada:',
        items: [
          'Localização com vista para o mar ou acesso direto à praia',
          'Piscina privativa aquecida',
          'Churrasqueira e espaço gourmet completo',
          'Capacidade para pelo menos 8 hóspedes',
          'Wi-Fi de alta velocidade e TV streaming',
          'Ar condicionado em todos os quartos',
          'Estacionamento para 2 ou mais veículos'
        ]
      },
      {
        type: 'heading',
        content: 'Onde comprar: as melhores regiões'
      },
      {
        type: 'paragraph',
        content: 'Em São Sebastião, a Baleia, Juquehy e Maresias são os endereços mais valorizados. Imóveis com vista para o mar nessas praias raramente ficam disponíveis por mais de 30 dias — tamanha é a procura. Em Ubatuba, Lagoinha e Itamambuca reúnem natureza preservada e acesso facilitado pela Rodovia dos Tamoios.'
      },
      {
        type: 'subheading',
        content: 'Cuidados essenciais'
      },
      {
        type: 'paragraph',
        content: 'Imóveis na faixa de marinha exigem atenção especial à regularização fundiária. Certifique-se de que o imóvel tem escritura definitiva e que a taxa de ocupação da Marinha está regularizada. Nossa equipe jurídica faz esse checklist gratuitamente para clientes Robles.'
      },
      {
        type: 'tip',
        content: 'Dica Robles: A melhor época para comprar no litoral é entre maio e agosto, quando há menos compradores ativos e mais flexibilidade de negociação. Vendedores que precisam de liquidez aceitam descontos de até 15% nesse período.'
      }
    ]
  },
  {
    slug: 'guia-financiamento-imobiliario',
    title: 'Financiamento Imobiliário de Alto Padrão: O Guia Completo para 2025',
    subtitle: 'Entenda as modalidades, taxas e estratégias para financiar seu imóvel de luxo com as melhores condições',
    category: 'Financiamento',
    author: 'Thiago Cavalcante',
    authorRole: 'Diretor Comercial — Rio de Janeiro',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&fit=crop&crop=face',
    date: '1 de maio de 2025',
    readTime: '8 min de leitura',
    coverImage: '/blog_financiamento.png',
    excerpt: 'Mesmo compradores de alto patrimônio líquido frequentemente optam pelo financiamento imobiliário como estratégia de alavancagem. Entenda como fazer isso de forma inteligente.',
    tags: ['Financiamento', 'Crédito', 'Banco', 'Estratégia'],
    content: [
      {
        type: 'paragraph',
        content: 'Mesmo compradores de alto patrimônio líquido frequentemente optam pelo financiamento imobiliário como estratégia de alavancagem inteligente. A lógica é simples: se o seu capital aplicado rende 12% ao ano e a taxa do financiamento é de 10%, você ganha financiando. Este guia desmistifica o crédito imobiliário para imóveis de alto padrão.'
      },
      {
        type: 'heading',
        content: 'Modalidades disponíveis para alto padrão'
      },
      {
        type: 'paragraph',
        content: 'Para imóveis acima de R$ 1,5 milhão, o financiamento pelo SBPE (Sistema Brasileiro de Poupança e Empréstimo) é a principal via. As taxas variam entre 10,5% e 12% ao ano, dependendo do banco, do relacionamento do cliente e da composição da operação.'
      },
      {
        type: 'list',
        content: 'Principais modalidades de financiamento para alto padrão:',
        items: [
          'SBPE com tabela SAC — prestações decrescentes, recomendado para quem tem renda estável',
          'SBPE com tabela Price — prestações fixas, previsibilidade total',
          'Crédito com garantia em imóvel (CGI) — taxas mais baixas usando patrimônio existente como garantia',
          'Financiamento direto com a incorporadora — comum em lançamentos, com condições negociáveis',
          'Portabilidade de crédito — transferência do financiamento para banco com taxa menor'
        ]
      },
      {
        type: 'heading',
        content: 'Como conseguir as melhores taxas'
      },
      {
        type: 'paragraph',
        content: 'Os bancos diferenciam muito as taxas de acordo com o relacionamento. Clientes com conta salário, investimentos e seguros no mesmo banco geralmente obtêm reduções de 1 a 1,5 ponto percentual na taxa. Para operações acima de R$ 2 milhões, é possível negociar diretamente com o gerente de wealth management.'
      },
      {
        type: 'quote',
        content: 'Um ponto percentual a menos na taxa de juros de um financiamento de R$ 2 milhões em 20 anos representa uma economia de quase R$ 400.000 no total pago. Vale muito a pena negociar.'
      },
      {
        type: 'heading',
        content: 'Documentação necessária'
      },
      {
        type: 'paragraph',
        content: 'Para imóveis de alto padrão, os bancos costumam exigir documentação mais detalhada, especialmente para compradores que têm renda variável ou são sócios de empresas. Organize com antecedência para não atrasar o processo.'
      },
      {
        type: 'list',
        content: 'Documentação básica para pessoa física:',
        items: [
          'RG e CPF (ou CNH)',
          'Comprovante de renda dos últimos 3 meses (holerites ou pró-labore)',
          'Declaração de Imposto de Renda dos últimos 2 anos',
          'Extrato bancário dos últimos 3 meses',
          'Certidão de casamento ou nascimento (estado civil)',
          'Comprovante de residência atualizado'
        ]
      },
      {
        type: 'tip',
        content: 'Dica Robles: Simule o financiamento em pelo menos 3 bancos diferentes antes de decidir. Nossa equipe tem relacionamento com Bradesco, Itaú, Santander, Caixa e BTG e pode intermediar as simulações para você de forma gratuita, garantindo as melhores condições do mercado.'
      },
      {
        type: 'heading',
        content: 'Financiamento ou pagamento à vista?'
      },
      {
        type: 'paragraph',
        content: 'A resposta depende do seu contexto. Se você tem capital suficiente e não tem investimentos com rentabilidade superior à taxa do financiamento, pague à vista — e negocie um desconto agressivo, que pode chegar a 10%. Se seu capital rende mais do que a taxa de juros, financie e mantenha o dinheiro trabalhando.'
      },
      {
        type: 'paragraph',
        content: 'Nossa consultoria financeira é gratuita e personalizada para cada cliente Robles. Apresentamos cenários comparativos detalhados para que você tome a melhor decisão baseada em números reais.'
      }
    ]
  },
  {
    slug: 'imovel-como-investimento',
    title: 'Por Que Imóvel de Luxo Ainda é o Melhor Investimento do Brasil',
    subtitle: 'Dados e análises que mostram como o imóvel de alto padrão supera a renda fixa no longo prazo',
    category: 'Investimento',
    author: 'Claudia Robles',
    authorRole: 'Fundadora & Diretora Geral',
    authorPhoto: '/claudia.png',
    date: '22 de abril de 2025',
    readTime: '10 min de leitura',
    coverImage: '/blog_investimento.png',
    excerpt: 'Em 23 anos de mercado, vimos crises, pandemias e ciclos de juros extremos. E em todos esses cenários, o imóvel de alto padrão bem escolhido entregou retorno real consistente. Veja os números.',
    tags: ['Investimento', 'Patrimônio', 'Valorização', 'Renda'],
    content: [
      {
        type: 'paragraph',
        content: 'Em 23 anos de mercado, vimos crises financeiras, pandemias, ciclos de juros extremos e volatilidade cambial. E em todos esses cenários, o imóvel de alto padrão bem escolhido entregou retorno real consistente, preservando e ampliando o patrimônio de nossos clientes. Este artigo apresenta os dados concretos que fundamentam essa afirmação.'
      },
      {
        type: 'heading',
        content: 'Os números não mentem'
      },
      {
        type: 'paragraph',
        content: 'Um apartamento adquirido nos Jardins por R$ 800.000 em 2005 vale hoje entre R$ 4,5 e R$ 5,5 milhões — uma valorização nominal de mais de 550%. No mesmo período, o CDI acumulado foi de aproximadamente 430%. O imóvel ganhou, e ainda gerou renda com aluguel ao longo de todo esse período.'
      },
      {
        type: 'paragraph',
        content: 'Mas o mais importante não é a comparação com a renda fixa — é a combinação de valorização + renda + proteção contra inflação que torna o imóvel de luxo único como classe de ativo.'
      },
      {
        type: 'quote',
        content: 'Nenhum outro ativo financeiro combina valorização real, geração de renda passiva, proteção inflacionária, utilidade de uso e possibilidade de alavancagem com garantia sobre o próprio ativo. O imóvel é singular.'
      },
      {
        type: 'heading',
        content: 'Os 3 vetores de retorno do imóvel'
      },
      {
        type: 'list',
        content: 'Um imóvel de alto padrão bem escolhido gera retorno por três caminhos simultâneos:',
        items: [
          'Valorização patrimonial — apreciação do preço ao longo do tempo, historicamente acima da inflação em bairros premium',
          'Renda com aluguel — yield anual de 4% a 6% para imóveis residenciais de alto padrão em São Paulo',
          'Proteção cambial — imóveis em dólares ou cotados em moeda forte protegem contra depreciação do real'
        ]
      },
      {
        type: 'heading',
        content: 'Imóveis de luxo vs. FIIs'
      },
      {
        type: 'paragraph',
        content: 'Os Fundos de Investimento Imobiliário (FIIs) democratizaram o acesso ao mercado imobiliário, mas não substituem o imóvel físico em termos de retorno total. A propriedade direta oferece mais controle, possibilidade de uso, negociação direta e ausência de taxa de gestão. Para patrimônios acima de R$ 3 milhões, a combinação ideal geralmente inclui ambos.'
      },
      {
        type: 'subheading',
        content: 'O efeito da localização na performance'
      },
      {
        type: 'paragraph',
        content: 'A diferença de retorno entre um imóvel bem localizado e um mediano pode ser de 3 a 5 pontos percentuais ao ano — um abismo no longo prazo. Por isso, na Robles nunca recomendamos o imóvel mais barato: recomendamos o melhor imóvel para o perfil e objetivo de cada cliente.'
      },
      {
        type: 'heading',
        content: 'Como montar uma carteira imobiliária de alta performance'
      },
      {
        type: 'list',
        content: 'Estratégia que recomendamos para patrimônios acima de R$ 5 milhões:',
        items: [
          '60% em imóvel residencial principal de alto padrão em bairro consolidado',
          '20% em imóvel de lazer no litoral ou interior (renda + uso)',
          '20% em laje corporativa ou conjunto comercial em região de alta demanda'
        ]
      },
      {
        type: 'paragraph',
        content: 'Essa composição entrega um portfólio com liquidez escalonada, diversificação geográfica e de propósito, e capacidade de gerar renda passiva enquanto valoriza. Nossa equipe de consultoria patrimonial oferece análise personalizada gratuita para clientes que desejam estruturar ou otimizar sua carteira imobiliária.'
      },
      {
        type: 'tip',
        content: 'Dica Robles: O momento de comprar é sempre o presente. Quem esperou o "momento certo" nas últimas duas décadas perdeu as melhores oportunidades. O mercado imobiliário de alto padrão não para — e quem entra cedo colhe mais.'
      }
    ]
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(p => p.featured)
}
