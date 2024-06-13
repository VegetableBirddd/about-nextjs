import mysql from 'mysql2/promise'
 
export const pool = mysql.createPool({ //创建数据库连接池
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit:10, //最大连接数
    queueLimit:0, //排队等待连接的最大请求数，0表示无限制
    waitForConnections: true // 当连接池达到最大连接数时，是否等待可用连接
})

export async function getUser(){
    const connection = await pool.getConnection();
    const [res] = await connection.query('SELECT * FROM user');
    console.log(res);
    connection.release();
}

