DATABASE = SQLite3::Database.new("./database/main.db")

DATABASE.results_as_hash = true

DATABASE.execute("CREATE TABLE IF NOT EXISTS mondrians (id INTEGER PRIMARY KEY, title TEXT UNIQUE, colors TEXT)")

set :database, {adapter: 'sqlite3', database: "./database/main.db"}
