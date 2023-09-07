export type People = {
  id: string;
  nombre: string;
  altura: number;
  masa: number;
  color_pelo: string;
  color_piel: string;
  color_ojo: string;
  periodo_nacimiento: string;
  genero: string;
  nacionalidad: string;
  fecha_creacion: Date;
  fecha_edicion: Date;
  url: string;
}

export type PeopleCreate = Omit<People, 'id' | 'fecha_creacion' | 'fecha_edicion'>
