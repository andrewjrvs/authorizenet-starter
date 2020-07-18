# Authorizenet Starter

Make sure yo have an account setup at <https://sandbox.authorize.net/>

Update ./constants.js with your apiLoginKey, TransactionKey, and public key

## finding your keys

### Api Login Key

This is located `Account > Settings > API Credentials & Keys`

![location of API key](/readme_extras/apiKey.png)

### Transaction key

You will be unable to find your Transaction key, however you can generate a new one. It is located under your API key at `Account > Settings > API Credentials & Keys`

![location of Transaction key](/readme_extras/transactionKey.png)


### Public key

your public key can be located at `Account > Settings > Manage Public Client Key`

![location of public key](/readme_extras/publicKey.png)

## reading the application

the application is composed of two parts, and Angular application (as the core app) and a node endpoint (which is located un the ./endpoint_src folder);

If you want to see how your endpoint can submit a nonce to authorize.net check out ./endpoint_src/processPayments.js

If you would like to see how to create a nonce check out ./src/app/forms/cc.component.ts

## running the application

you can kick off both services (angular and endpoint) by running ```npm start```

## Items to note

If you want to see your transaction on authorize.net transaction log `Transaction search > Unsettled Transactions` you will need to enable 'live' mode `Account > Settings > Test Mode`

To test a failed transactions you must enable live move. 


## SUPER IMPORTANT NOTE

don't be like me, and publish your private / transaction key!!!