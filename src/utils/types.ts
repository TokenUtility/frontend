export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  id?: string;
}

export interface ArenaPoolDataBackend {
  id: string;
  symbol: string;
  name: string;
  decimals: 9;
  address?: string;
  createdAt: string;
  updatedAt: string;
  network?: string;
  price: number;
  overview?: any[];
  backersPartners?: any[];
  officialLinks?: Array<{url: string, id:string}>
  socials?:Array<{url: string, id:string, type: string}>;
}
