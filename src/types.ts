export interface Plan {
  id: string;
  operator: 'nio' | 'tim' | 'claro' | 'giga';
  name: string;
  speed: string;
  price: number;
  advantages: string[];
  flyerUrl: string;
  logoUrl: string;
  hasTvBox?: boolean;
}

export interface UserData {
  // Address
  street: string;
  neighborhood: string;
  number: string;
  zipCode: string;
  city: string;
  // Personal
  fullName: string;
  birthDate: string;
  cpf: string;
  motherName: string;
}
