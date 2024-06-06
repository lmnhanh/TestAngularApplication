export interface UseBreadCrum {
  level: number;
  text: string;
  link: string;
}

export function IsUseBreadCrum(obj: any): obj is UseBreadCrum {
  return 'level' in obj && 'link' in obj && 'text' in obj;
}
