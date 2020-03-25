import Sequelize from "sequelize";
import { config } from "dotenv";

config();
const sequelize = new Sequelize(process.env.DATABASE_URL)
sequelize.sync().then(()=> {
    console.log('sequelize succesfully connected');
});
export default sequelize;
