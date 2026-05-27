import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute , useParams } from '@tanstack/react-router'
import { FileText, Shield, Eye, Database, Mail } from 'lucide-react'

export const Route = createFileRoute('/$tenant/politica-de-privacidade')({
  component: PoliticaPrivacidadePage,
})

function PoliticaPrivacidadePage() {

  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const sections = [
    {
      icon: Shield,
      title: '1. Definições',
      content: (
        <div className="space-y-3">
          <p>
            Designa o site, todas as informações acessíveis através do endereço eletrônico{' '}
            <strong className="text-charcoal font-semibold">https://roblesimobiliariasp.com.br</strong>
            , de responsabilidade da empresa <strong className="text-charcoal font-semibold">Robles Imobiliária</strong>
            , situada à <strong className="text-charcoal font-semibold">Avenida das Nações Unidas, nº 14171 - Marble Tower, Vila Gertrudes, São Paulo - SP</strong>.
          </p>
          <p>
            Para fins desta Política de Privacidade, aplicam-se as seguintes definições:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-warm-gray text-xs md:text-sm">
            <li><strong>Cookies:</strong> arquivos armazenados no dispositivo eletrônico do Usuário, com a finalidade de identificar e coletar dados de acesso, como versão do navegador, páginas navegadas, etc., permitindo personalizar a utilização do site de acordo com o perfil do usuário.</li>
            <li><strong>IP:</strong> abreviatura de Internet Protocol. É o conjunto de números que identificam o dispositivo utilizado para acessar a Internet.</li>
            <li><strong>Logs:</strong> registros de atividades do Usuário efetuadas no site.</li>
            <li><strong>Session ID:</strong> identificação da sessão do Usuário no processo de inscrição ou login.</li>
            <li><strong>Usuário:</strong> aquele que faz uso do site, seus recursos e funcionalidades.</li>
          </ul>
        </div>
      )
    },
    {
      icon: Eye,
      title: '2. Obtenção dos dados e informações',
      content: (
        <p>
          Os dados e informações serão obtidos quando o Usuário:
          <br />
          1. Passar a utilizar o site;
          <br />
          2. Interagir com as funcionalidades e recursos existentes no site, fornecendo as informações voluntariamente;
          <br />
          3. Entrar em contato através dos canais de comunicação disponíveis no site.
        </p>
      )
    },
    {
      icon: Database,
      title: '3. Armazenamento dos Dados e Informações',
      content: (
        <p>
          Todos os dados e informações coletadas dos Usuários serão incorporados ao banco de dados do site, sendo seu responsável a{' '}
          <strong className="text-charcoal font-semibold">Robles Imobiliária</strong>. Os dados e informações coletados estarão armazenados em ambiente seguro, observado o estado da técnica disponível, e somente poderão ser acessados por pessoas qualificadas e autorizadas pela Robles Imobiliária.
          <br /><br />
          A Robles Imobiliária afirma que não compartilhará, venderá ou apresentará os dados dos Usuários para terceiros que não sejam seus parceiros ou proprietários das informações. Considerando que nenhum sistema de segurança é absolutamente seguro, a Robles Imobiliária se exime de quaisquer responsabilidades por eventuais danos e/ou prejuízos decorrentes de falhas, vírus ou invasões do banco de dados do site, salvo nos casos de dolo ou culpa da mesma.
          <br /><br />
          O Usuário é o proprietário dos dados e está apto a solicitar a exclusão ou modificação de quaisquer informações que estiverem ligadas ao seu perfil de usuário na Robles Imobiliária. Por isso, o Usuário declara estar ciente e concorda com a coleta, armazenamento, tratamento, processamento e uso das Informações nos termos desta Política de Privacidade.
        </p>
      )
    },
    {
      icon: FileText,
      title: '4. Uso dos Dados e Informações',
      content: (
        <div className="space-y-3">
          <p>
            Os dados e informações coletados dos Usuários poderão ser utilizados para as seguintes finalidades:
          </p>
          <ul className="list-decimal pl-5 space-y-1.5 text-warm-gray text-xs md:text-sm">
            <li>Efetuar qualquer comunicação resultante de atividade do próprio site ou a identificação do respectivo destinatário;</li>
            <li>Responder a eventuais dúvidas e solicitações do Usuário;</li>
            <li>Cumprimento de ordem legal ou judicial;</li>
            <li>Constituir, defender ou exercer regularmente direitos em âmbito judicial ou administrativo;</li>
            <li>Elaborar estatísticas gerais, para identificação do perfil dos Usuários e desenvolvimento de campanhas;</li>
            <li>Garantir a segurança dos Usuários;</li>
            <li>Manter atualizados os cadastros dos Usuários para fins de contato autorizado a ser feito por telefone, correio eletrônico, SMS, mala-direta ou por outros meios de comunicação;</li>
            <li>Informar a respeito de novidades, promoções e eventos.</li>
          </ul>
        </div>
      )
    },
    {
      icon: Mail,
      title: '4.1 Sobre os e-mails',
      content: (
        <p>
          Serão enviados e-mails com ofertas ou informativos para os usuários cadastrados.
          Os e-mails enviados não contêm anexos para serem baixados e tampouco solicitam dados pessoais dos Usuários.
          Caso o Cliente não queira mais receber informações por e-mail, deve clicar no link de descadastramento presente em todos os e-mails enviados.
        </p>
      )
    },
    {
      icon: Database,
      title: '5. Do Registro de Atividades',
      content: (
        <p>
          As atividades realizadas pelo Usuário no site poderão ser registradas por meio de logs, incluindo informações como: endereço IP do Usuário, ações efetuadas, páginas acessadas, datas e horários de cada acesso e Session ID. Os registros mencionados poderão ser utilizados pela Robles Imobiliária em casos de investigação de fraudes ou de alterações indevidas em seus sistemas e cadastros.
        </p>
      )
    },
    {
      icon: Shield,
      title: '6. Cookies',
      content: (
        <p>
          O site poderá fazer o uso de cookies, cabendo ao Usuário configurar o seu navegador de Internet caso deseje bloqueá-los. Neste caso, algumas funcionalidades do site poderão ser limitadas.
        </p>
      )
    },
    {
      icon: Eye,
      title: '7. Recomendações',
      content: (
        <p>
          A partir do uso de um cookie que identifica a navegação do Usuário, o site faz a recomendação de produtos e ofertas. Essa recomendação varia conforme o Usuário e os recursos utilizados. Considerando que essa recomendação é gerada a partir de algoritmos, sua precisão pode não ser exata, recomendando produtos de interesse do Usuário sem qualquer obrigatoriedade de aquisição.
        </p>
      )
    },
    {
      icon: Database,
      title: '8. Tempo de retenção',
      content: (
        <p>
          As informações coletadas são armazenadas por tempo indefinido para garantir a continuidade dos serviços, atendimento e conformidade legal de acordo com as necessidades regulatórias do mercado imobiliário brasileiro.
        </p>
      )
    },
    {
      icon: Shield,
      title: '9. Disposições Gerais',
      content: (
        <p>
          As disposições constantes desta Política de Privacidade poderão ser atualizadas ou modificadas a qualquer momento, cabendo ao Usuário verificá-las sempre que efetuar o acesso ao site.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield size={12} />
            Privacidade & LGPD
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Política de Privacidade
          </h1>
          <p className="text-warm-gray text-base max-w-xl mx-auto">
            Este documento estabelece as regras sobre o uso, armazenamento e tratamento dos dados coletados dos usuários em nosso site.
          </p>
        </div>

        {/* Content list */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <div 
                key={index} 
                className="bg-white border border-cream-border rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30"
              >
                <div className="flex items-center gap-3.5 mb-4 border-b border-cream-border pb-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
                    <IconComponent size={18} />
                  </div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-charcoal">
                    {section.title}
                  </h2>
                </div>
                <div className="text-warm-gray text-xs md:text-sm leading-relaxed">
                  {section.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
