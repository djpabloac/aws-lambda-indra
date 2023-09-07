import { DataTypes, Model, Sequelize } from "sequelize";
import { mySqlSequelize, connect } from "../../../config/mysql-sequelize";
import { Planet, PlanetCreate } from "../entity/planet.entity";

class PlanetModel extends Model<Planet, PlanetCreate> {
  public readonly fecha_creacion!: Date;
  public readonly fecha_edicion!: Date;
}

PlanetModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  periodo_rotacion: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  periodo_orbital: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  diametro: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  clima: {
    allowNull: false,
    type: DataTypes.STRING
  },
  gravedad: {
    allowNull: false,
    type: DataTypes.STRING
  },
  terreno: {
    allowNull: false,
    type: DataTypes.STRING
  },
  agua_superficial: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  poblacion: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  fecha_creacion: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  fecha_edicion: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, {
  sequelize: mySqlSequelize,
  tableName: 'planetas',
  timestamps: false
})

const getModel = async () => {
  await connect()

  await PlanetModel.sync()

  return PlanetModel
}

export {
  getModel
}