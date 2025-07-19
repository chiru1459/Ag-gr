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
  year: number;
  name: string;
  manger: string;
  q1: QuarterData;
  q2: QuarterData;
  q3: QuarterData;
  q4: QuarterData;
  total: number;
}
