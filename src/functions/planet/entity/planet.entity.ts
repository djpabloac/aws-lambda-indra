export type Planet = {
  id: string;
  nombre: string;
  periodo_rotacion: number;
  periodo_orbital: number;
  diametro: number;
  clima: string;
  gravedad: string;
  terreno: string;
  agua_superficial: number;
  poblacion: number;
  fecha_creacion: Date;
  fecha_edicion: Date;
  url: string;
}

export type PlanetCreate = Omit<Planet, 'id' | 'fecha_creacion' | 'fecha_edicion'>