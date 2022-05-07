const yargs = require('yargs')
// Paso 1
const child = require('child_process')
// Paso 2
const key = '123'

// 1. El servidor debe ser levantado por instrucción de una aplicación Node que use el
// paquete Yargs para capturar los argumentos en la línea de comando. Se deberá
// ejecutar el comando para levantar el servidor solo si el valor de la propiedad “key” es
// la correcta (123).

const argv = yargs
    .command(
        'login',
        'Comando para acceder al cambio de imagen',
        {
            key: {
                describe: 'Contraseña',
                demand: true,
                alias: 'p',
            }
        },
        (args) => {
            args.key == key
                ? // Paso 8
                child.exec('node index.js', (err, stdout) => {
                    err ? console.log(err) : console.log(stdout)
                })
                : // Paso 9
                console.log('Credenciales incorrectas')
        }
    )
    .help().argv
    // IMPORTANTE para iniciar el servidor: nodemon access.js login -p=123