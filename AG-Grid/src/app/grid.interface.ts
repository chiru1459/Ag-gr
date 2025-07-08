export interface QuarterData {
  jan?: number;
  feb?: number;
  mar?: number;
  apr?: number;
  may?: number;
  june?: number;
  july?: number;
  aug?: number;
  sep?: number;
  oct?: number;
  nov?: number;
  dec?: number;
}

export interface GridRow {
  name: string;
  manger: string;
  q1: Partial<QuarterData>;
  q2: Partial<QuarterData>;
  q3: Partial<QuarterData>;
  q4: Partial<QuarterData>;
  total: number;
}
