import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'giga-600',
    operator: 'giga',
    name: 'Giga+ 600 Mega',
    speed: '600 Mega',
    price: 109.99,
    advantages: [
      'Inclui Globoplay',
      '100% Fibra Ótica',
      'Preço fixo por 12 meses',
      'Instalação Grátis'
    ],
    flyerUrl: 'https://picsum.photos/seed/giga1/400/600',
    logoUrl: 'https://me-cdn.com/lp/internet/gigamais-internet.jpg'
  },
  {
    id: 'giga-800',
    operator: 'giga',
    name: 'Giga+ 800 Mega',
    speed: '800 Mega',
    price: 119.99,
    advantages: [
      'Inclui Globoplay',
      '100% Fibra Ótica',
      'Preço fixo por 12 meses',
      'Wi-Fi Premium'
    ],
    flyerUrl: 'https://picsum.photos/seed/giga2/400/600',
    logoUrl: 'https://me-cdn.com/lp/internet/gigamais-internet.jpg'
  },
  {
    id: 'giga-1000',
    operator: 'giga',
    name: 'Giga+ 1 Giga',
    speed: '1 Giga',
    price: 139.99,
    advantages: [
      'Inclui Globoplay',
      'Velocidade Máxima',
      'Preço fixo por 12 meses',
      'Suporte Prioritário'
    ],
    flyerUrl: 'https://picsum.photos/seed/giga3/400/600',
    logoUrl: 'https://me-cdn.com/lp/internet/gigamais-internet.jpg'
  },
  {
    id: 'nio-500',
    operator: 'nio',
    name: 'Nio Essencial',
    speed: '500 Mega',
    price: 99.90,
    advantages: [
      'Preço fixo até Jan/2028',
      'Globoplay por 12 meses',
      'Wi-Fi 6 de última geração',
      'Instalação Grátis'
    ],
    flyerUrl: 'https://picsum.photos/seed/nio1/400/600',
    logoUrl: 'https://telesintese.com.br/wp-content/uploads/2025/05/nio.jpg'
  },
  {
    id: 'nio-700',
    operator: 'nio',
    name: 'Nio Ultra',
    speed: '700 Mega',
    price: 119.90,
    advantages: [
      'Preço fixo até Jan/2028',
      'Globoplay por 12 meses',
      'Wi-Fi 6 + Ponto Adicional',
      'Suporte Premium'
    ],
    flyerUrl: 'https://picsum.photos/seed/nio2/400/600',
    logoUrl: 'https://telesintese.com.br/wp-content/uploads/2025/05/nio.jpg'
  },
  {
    id: 'tim-500',
    operator: 'tim',
    name: 'Tim Ultrafibra 500',
    speed: '500 Mega',
    price: 99.99,
    advantages: [
      'Paramount+ Incluso',
      'Babbel Incluso',
      'Wi-Fi de Alta Performance',
      'Sem taxa de adesão'
    ],
    flyerUrl: 'https://picsum.photos/seed/tim1/400/600',
    logoUrl: 'https://raichu-uploads.s3.amazonaws.com/logo_live-tim_PsDULb.png'
  },
  {
    id: 'tim-1000',
    operator: 'tim',
    name: 'Tim Ultrafibra 1G',
    speed: '1 Giga',
    price: 129.99,
    advantages: [
      'HBO Max + Paramount+',
      'Globoplay Incluso',
      'Wi-Fi 6 Gamer',
      'Prioridade de Rede'
    ],
    flyerUrl: 'https://picsum.photos/seed/tim2/400/600',
    logoUrl: 'https://raichu-uploads.s3.amazonaws.com/logo_live-tim_PsDULb.png'
  },
  {
    id: 'claro-500',
    operator: 'claro',
    name: 'Claro Fibra 500',
    speed: '500 Mega',
    price: 99.90,
    advantages: [
      'Globoplay Incluso',
      'Câmeras BBB 26 Exclusivas',
      'Wi-Fi Plus',
      'Claro Video'
    ],
    flyerUrl: 'https://picsum.photos/seed/claro1/400/600',
    logoUrl: 'https://me-cdn.com/lp/internet/claro-fibra.jpg'
  },
  {
    id: 'claro-750-tv',
    operator: 'claro',
    name: 'Claro Fibra + TV Box',
    speed: '750 Mega',
    price: 159.90,
    advantages: [
      'TV Box com +100 Canais',
      'Apps de Séries e Filmes',
      'Globoplay + Netflix (opcional)',
      'Wi-Fi 6 Mesh'
    ],
    hasTvBox: true,
    flyerUrl: 'https://picsum.photos/seed/claro2/400/600',
    logoUrl: 'https://me-cdn.com/lp/internet/claro-fibra.jpg'
  }
];
