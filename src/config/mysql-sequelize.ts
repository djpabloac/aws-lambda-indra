import mysql from "mysql2";
import { Sequelize } from "sequelize";
import { config } from ".";

const { db } = config

const mySqlSequelize = new Sequelize({
  dialectModule: mysql,
  dialect: 'mysql',
  logging: false,
  host: db.mysql.host,
  port: db.mysql.port,
  username: db.mysql.username,
  password: db.mysql.password,
  database: db.mysql.database,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    }
  }
})

const connect = async () => {
  try {
    await mySqlSequelize.authenticate()
  } catch (error) {
    console.error('MySql had an error connecting')
  }
}

export {
  connect,
  mySqlSequelize
}