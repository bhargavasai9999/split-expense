import { Sequelize } from 'sequelize'

import dotenv from 'dotenv'
dotenv.config()
export const sequelize = new Sequelize(process.env.POSTGRESQL_CONN_URL)
export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate()

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}
