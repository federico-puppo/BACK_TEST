import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "notesdb",
};

export const connection = await mysql.createConnection(config);

async function createDatabaseAndTables() {
  try {
    // Crear la base de datos
    await connection.query("DROP DATABASE IF EXISTS notesdb");
    await connection.query("CREATE DATABASE notesdb");
    await connection.query("USE notesdb");

    // Crear la tabla notes
    await connection.query(`
      CREATE TABLE notes (
        id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
        title VARCHAR(255) NOT NULL,
        content VARCHAR(512) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        archived TINYINT(1)
      );
    `);

    // Crear la tabla categories
    await connection.query(`
      CREATE TABLE categories (
        id BINARY(16) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    // Crear la tabla note_categories
    await connection.query(`
      CREATE TABLE note_categories (
        note_id BINARY(16),
        category_id BINARY(16),
        FOREIGN KEY (note_id) REFERENCES notes(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        PRIMARY KEY (note_id, category_id)
      );
    `);

    // Insertar datos en categorías
    await connection.query(`
  INSERT INTO categories (id, name) VALUES
    (UUID_TO_BIN(UUID()), 'Deep Work'),
    (UUID_TO_BIN(UUID()), 'Shallow Work'),
    (UUID_TO_BIN(UUID()), 'Chores'),
    (UUID_TO_BIN(UUID()), 'Learning'),
    (UUID_TO_BIN(UUID()), 'Mind Care'),
    (UUID_TO_BIN(UUID()), 'Body Care'),
    (UUID_TO_BIN(UUID()), 'People'),
    (UUID_TO_BIN(UUID()), 'Next Week');
`);

    // Insertar datos en notas
    await connection.query(`
    INSERT INTO notes (id, title, content, created_at, updated_at, archived) VALUES
    (UUID_TO_BIN(UUID()), 'Compras', 'Carne, Leche, Huevos', NOW(), NULL, 0),
    (UUID_TO_BIN(UUID()), 'Curso', 'Realizar curso fullstack', NOW(), NULL, 0),
    (UUID_TO_BIN(UUID()), 'Gym', 'Ir al gym', NOW(), NULL, 0);
    `);

    // Insertar datos en note_categories usando declaraciones SELECT
    await connection.query(`
      INSERT INTO note_categories (note_id, category_id)
      SELECT n.id, c.id
      FROM notes n
      JOIN categories c ON n.title = 'Compras' AND c.name = 'Chores'
      UNION ALL
      SELECT n.id, c.id
      FROM notes n
      JOIN categories c ON n.title = 'Curso' AND c.name = 'Learning'
      UNION ALL
      SELECT n.id, c.id
      FROM notes n
      JOIN categories c ON n.title = 'Gym' AND c.name = 'Body Care';
    `);

    console.log("Base de datos y tablas creadas exitosamente.");
  } catch (error) {
    console.error("Error al crear la base de datos y las tablas:", error);
  } finally {
    // Cerrar la conexión
    //await connection.end();
  }
}

// Llamar a la función para crear la base de datos y las tablas
createDatabaseAndTables();
