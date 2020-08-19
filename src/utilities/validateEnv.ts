import {cleanEnv, port, str} from "envalid";

export const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        OMDB_API_URL: str(),
        OMDB_API_KEY: str(),
        MONGO_ADDRESS: str()
    })
}