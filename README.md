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