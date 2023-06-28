import mariadb from 'mariadb';

const dbConfig = {
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  port: Number(process.env.NEXT_PUBLIC_DB_PORT),
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: 'management',
  connectionLimit: 5, // Adjust this value based on your requirements
};

export async function dbConnect() {
  try {
    const pool = mariadb.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('Connected to MariaDB database');
    return connection;
  } catch (error) {
    console.error('Failed to connect to MariaDB database:', error);
    throw error;
  }
}
