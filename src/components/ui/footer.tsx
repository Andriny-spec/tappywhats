"use client"

import { Button } from "./button"
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Shield, 
  CreditCard, 
  Award, 
  Gift,
  Apple,
  PlayCircle,
  ShieldCheck,
  BadgeCheck
} from "lucide-react"
import Image from "next/image"

export function Footer() {
  const footerSections = [
    {
      title: "Empresa",
      links: [
        { label: "Sobre nós", href: "#" },
        { label: "Nossa História", href: "#" },
        { label: "Carreiras", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Sala de Imprensa", href: "#" },
        { label: "Parceiros", href: "#" },
      ],
    },
    {
      title: "Produto",
      links: [
        { label: "Recursos", href: "#recursos" },
        { label: "Planos e Preços", href: "#planos" },
        { label: "Cases de Sucesso", href: "#" },
        { label: "API WhatsApp", href: "#" },
        { label: "Integrações", href: "#" },
        { label: "Automações", href: "#" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "#" },
        { label: "Documentação", href: "#" },
        { label: "Status do Sistema", href: "#" },
        { label: "Contato", href: "#" },
        { label: "Comunidade", href: "#" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacidade", href: "#" },
        { label: "Termos de Uso", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "LGPD", href: "#" },
        { label: "Segurança", href: "#" },
        { label: "Compliance", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  const features = [
    { icon: Shield, text: "Segurança Garantida" },
    { icon: CreditCard, text: "Pagamento Seguro" },
    { icon: Award, text: "Líder em Automação" },
    { icon: Gift, text: "Programa de Afiliados" },
  ]

  const contactInfo = [
    { icon: MapPin, text: "São Paulo, SP - Brasil" },
    { icon: Phone, text: "+55 (11) 4444-5555" },
    { icon: Mail, text: "contato@tappywhats.com" },
    { icon: Clock, text: "Seg-Sex: 9h às 18h" },
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top Features Section */}
        <div className="py-8 border-b border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#17d300]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#17d300]" />
                  </div>
                  <span className="text-gray-900 text-sm font-medium">{feature.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-b border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Fique por dentro das novidades
            </h3>
            <p className="text-gray-600 mb-6">
              Inscreva-se em nossa newsletter e receba conteúdo exclusivo sobre automação de WhatsApp,
              marketing digital e cases de sucesso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-[#17d300] w-full sm:w-80"
              />
              <Button className="bg-[#17d300] hover:bg-[#15bb00] text-white">
                Inscrever-se
              </Button>
            </div>
            <p className="text-gray-500 mt-3 text-sm">
              Ao se inscrever, você concorda com nossa Política de Privacidade
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/TAPPY - SOMENTE A LOGO - VERDE.svg"
                alt="Tappy WhatsApp"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-gray-900 font-semibold">Tappy WhatsApp</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Transforme seu WhatsApp em uma máquina de vendas com automação inteligente.
              Aumente suas conversões e escale seu atendimento.
            </p>
            <div className="space-y-2 mb-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Icon size={16} className="text-[#17d300]" />
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#17d300] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-gray-900 font-semibold mb-4 text-sm">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-[#17d300] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download Apps Section */}
        <div className="py-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <h4 className="text-gray-900 font-semibold mb-1 text-sm">
                Baixe nosso aplicativo
              </h4>
              <p className="text-gray-600 text-sm">
                Gerencie suas automações de qualquer lugar
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download na</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors">
                <PlayCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download no</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
            <div className="flex items-center justify-end gap-4">
              <select className="bg-white text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#17d300]">
                <option value="pt-BR">Português (BR)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-600">
              <span> 2024 Tappy WhatsApp. Todos os direitos reservados.</span>
              <a href="#" className="hover:text-[#17d300]">Termos de Uso</a>
              <a href="#" className="hover:text-[#17d300]">Política de Privacidade</a>
              <a href="#" className="hover:text-[#17d300]">Cookies</a>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-gray-600">
                <ShieldCheck className="w-5 h-5 text-[#17d300]" />
                <span className="text-sm">SSL Secure</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <BadgeCheck className="w-5 h-5 text-[#17d300]" />
                <span className="text-sm">PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
