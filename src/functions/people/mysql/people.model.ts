import { DataTypes, Model, Sequelize } from "sequelize";
import { mySqlSequelize, connect } from "../../../config/mysql-sequelize";
import { People, PeopleCreate } from "../entity/people.entity";

class PeopleModel extends Model<People, PeopleCreate> {
  public readonly fecha_creacion!: Date;
  public readonly fecha_edicion!: Date;
}

PeopleModel.init({
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
  altura: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  masa: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  color_pelo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  color_piel: {
    allowNull: false,
    type: DataTypes.STRING
  },
  color_ojo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  periodo_nacimiento: {
    allowNull: false,
    type: DataTypes.STRING
  },
  genero: {
    allowNull: false,
    type: DataTypes.STRING
  },
  nacionalidad: {
    allowNull: false,
    type: DataTypes.STRING
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
  tableName: 'personas',
  timestamps: false
})

const getModel = async () => {
  await connect()

  await PeopleModel.sync()

  return PeopleModel
}

export {
  getModel
}