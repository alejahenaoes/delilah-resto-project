# Delilah Resto

API para pedidos de comida deliciosa. Como cliente, podrás registrarte, ver el listado de nuestros productos y realizar una orden. Los administradores del restaurante tienen la posibilidad de recibir pedidos y actualizarlos.

### Dependencias

- **"dotenv"**: "^10.0.0",
- **"express"**: "^4.17.1",
- **"express-validator**": "^6.12.0",
- **"jsonwebtoken"**: "^8.5.1",
- **"mysql2"**: "^2.2.5",
- **"sequelize"**: "^6.6.5"

> Proyecto desarrollado en la formación con Protalento y Acámica 

_Antes de iniciar deberás revisar la documentación en: https://app.swaggerhub.com/apis/alejahenaoes/Delilah-resto/1.0.0_
<br>

##   Iniciemos:

**Clona el proyecto y ejecuta el siguiente código en la terminal:

```shell
npm i dotenv express express-validator jsonwebtoken mysql2 sequelize
``` 
Y la dependencia de **nodemon** en versión dev

```shell
npm i nodemon --save-dev
```


<br>

## Luego de eso deberás:
**Abrir phpMyAdmin y crear tu DB con nombre recomendado:** _delilah_ **e inicializa tu gestor de base de datos, en mi caso fue MAMP (macOS)**

<br>

## Con tu DB lista:

Crea un archivo **.env** fuera de la carpeta **src** y sigue este formato, con **tus** datos correspondientes

```shell
DB_CONNECTION_USER = xxxx
DB_CONNECTION_PASSWORD = xxxx
DB_CONNECTION_PORT = localhost:xxxx
DB_CONNECTION_DATABASENAME = delilah

PORT = xxxx

TOKEN_SECRET= xxxx
```

<br>

## Por último:

Ejecuta el comando **npm run start** para incializar el servidor y en la terminal deberás ver algo como esto:
```
Executing (default): CREATE TABLE IF NOT EXISTS `roles` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `roles`
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `nickname` VARCHAR(255) NOT NULL UNIQUE, `name` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `phonenumber` VARCHAR(255) NOT NULL, `adress` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `roleId` INTEGER DEFAULT 2, PRIMARY KEY (`id`), FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users`
Executing (default): CREATE TABLE IF NOT EXISTS `states` (`id` INTEGER NOT NULL auto_increment , `name` ENUM('Pending', 'Sent', 'Cancelled', 'Received') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `states`
Executing (default): CREATE TABLE IF NOT EXISTS `foodplates` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `price` INTEGER NOT NULL, `description` TEXT NOT NULL, `img` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `foodplates`
Executing (default): CREATE TABLE IF NOT EXISTS `orders` (`id` INTEGER NOT NULL auto_increment , `total` INTEGER NOT NULL, `payMethod` ENUM('Credit card', 'Debit card', 'Paypal') NOT NULL, `userId` INTEGER NOT NULL, `stateId` INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`), FOREIGN KEY (`stateId`) REFERENCES `states` (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `orders`
Executing (default): CREATE TABLE IF NOT EXISTS `orderplates` (`id` INTEGER NOT NULL auto_increment , `orderId` INTEGER, `plateId` INTEGER, `quantity` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`), FOREIGN KEY (`plateId`) REFERENCES `foodplates` (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `orderplates`
Executing (default): SELECT `id`, `name` FROM `roles` AS `role` WHERE `role`.`name` = 'User' LIMIT 1;
success
```

