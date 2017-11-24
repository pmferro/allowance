# Allowance MVP
El proyecto es una aplicación de smart-contracts que consiste en permitir a un Padre administrar la mensualidad de su(s) hijo(s)


## Reglas:
- Topes de retiro por cantidad
- Topes de retiro por frecuencia
- El owner del contrato va a ser el padre. Puede crear tantos contratos como hijos posea.
- Se crea un smart-contract por hijo
- Se debe crear una address para que el hijo pueda interactuar con el contrato y hacer retiros.
- El retiro inicialmente es fijo de 0.1 eth y se cargará el contrato inicialmente con 5 eth (esto duraría aproximadamente un año, 50 semanas)

## Ideas:
- Incentivos por ahorro
- Incentivos puntuales (cumpleaños, regalos, sorpresa, ratón pérez)
- Notificaciones (suscripción a eventos. Notificar cuando haya novedades, sorpresa, nuevo saldo a retirar)
- A los 18 años podría retirar todo el dinero junto
- Leer la billetera del hijo con la cámara via QR o tipeándola


## Contrato allowance.sol
- Crear el contrato con: 5eth + address beneficiario
- Obtiene fecha "now" y persiste
- LLama a withdrawBeneficiary y le transfiere la primer transacción al hijo para que tenga saldo.

### Métodos
- addFunds(eth amount)
- withdrawOwner(eth amount) verificar que sea el owner (modifier)
- freeze() pausa el contrato
- kill() elimina y los fondos los devuelve al owner
- withdrawBeneficiary(eth contract.allowanceAmount)


(10.211.55.3:8545)

### Consultas
- Como llamar a un metodo deployado desde web3-repl
- Como enviar ether a un contrato deployado
- Como evitamos que pueda ejecutar más de una vez al método withdraw (hasta que sea minado?) esto es porque utilizamos la última fecha de withdrawal para hacer el control 
- Como transferir eth de un contrato a cualquier dirección? Que el owner le pued enviar al beneficiario. (el beneficiario comienza con una billetera con saldo 0, y para hacer un withdrawal necesitará saldo para poder pagar el gas de la transacción)

- Entender mejor el Fallback se ejecuta siempre cuando mandan ether sin data.
- Wait / Async para vaciar el contrato (selfdistruct)
- WithtdrawownerAll - Buenas prácticas (para el llamado al kill y estar seguros que quedó sin fondos)
- Eventos - Cómo se interactua
- Guardar en el storage del contrato / acceder. Hay formato específico? Podemos tener varias listas distintas?: ej: transacciones.

### Referencias:
- Deploy a Rinkeby: https://blog.abuiles.com/blog/2017/07/09/deploying-truffle-contracts-to-rinkeby/
- Tests: https://github.com/e11-io/crypto-wars-solidity/tree/master/test

### Notas:
- Al que manda por error eth no aceptarlo. función fallback
- modifier noreentrancy
- KOVAN
- Ver ENS
