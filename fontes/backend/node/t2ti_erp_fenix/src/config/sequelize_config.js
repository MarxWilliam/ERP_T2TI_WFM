module.exports = {
    username: 'root',
    password: 'Practicing999',
    database: 'fenix',
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false, // não cria os campos 'createAt' e 'updateAt' nas tabelas
        freezeTableName: true, // não espera o nome das tabelas no plural
        charset: 'utf8', 
        dialectOptions: {
            collate: 'uft8mb4_unicode_ci'
        }
    }
}