import * as pg from "pg";

var json: any = require("./../../../env")(process.env.NODE_ENV);
Object.keys(json).forEach((k) => {
    process.env[k] = json[k];
});

export interface CatcherProps {
    success: false;
    message: string;
    original?: any;
    error: any;
}

const db = new pg.Pool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
});
const catcher = (err: any): CatcherProps => {
    var msg: string;

    switch (err.code) {
        case "42601":
            msg = `Syntax hatası. Sunucuda problem var.`;
            break;
        case "23505":
            msg = `Eklemeye çalıştığın veriden bir tane daha var. Detaylar : ${err.detail}`;
            break;
        case "22001":
            msg = `Eklemeye çalıştığın veri çok uzun.`;
            break;
        default:
            msg = err.message || err.detail || err.where;
            break;
    }
    return {
        success: false,
        message: msg,
        original: err.message || err.detail,
        error: err,
    };
};
const querier = async <T>(
    query: string,
    args?: any[]
): Promise<{ success: true; data: pg.QueryResult<T> } | CatcherProps> => {
    try {
        console.log(query);
        const results = await db.query<T>(query, args);

        return {
            success: true,
            data: results,
        };
    } catch (err) {
        console.log(`Querier Error`, err.message);
        return catcher({...err, query, args});
    }
};

export {catcher, querier};
export default db;
