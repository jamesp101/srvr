
let FCM = require('fcm-notification')

let server = {
  "type": "service_account",
  "project_id": "security-3a215",
  "private_key_id": "02dbfcca3c713920dfb8b83ae237767623fd4e22",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDh5TV7Z62iJ0no\n/8sfNJH8u3sJaQGHkFo3tPvt2IMg1ybN5RjUHZvAc0IYRDFWwKtGGDbsow3jM/iP\n2ZJQ+VGPRdAyLQMxSYQW7iu2EmaoiYl5FpTcWlkoZOVMx9GqEtQFe54I2RSn27pV\n35SCa2EvRtQwzwHmOSyiKwaoFFAhs7olako2XOXVIJtV1JCIGTw8BzTV1lKGaMIx\nM+ovsTXMOHKdN5EjzOm9HgYKz8hTfSa6wJm3Eu2Zoz4muj7KAqLrulDF7TQCOLI/\nPlMlCxBklE3bzndGFv2EHySDNjKqHyD6M21qxNlC27KySfv/E+/umk8AngfCRhAt\njD9119OTAgMBAAECggEATXiaWvQ3rEDlLC9trgoNdyulCpkkmSV8i1ZagDuc3Qps\nmHhVh4mP/PSKWmAou6PgGW38iDNzc9RDDrKDZ5nZytUajdq6GZEo5+ROwWaWJn7k\n0s5XxyqFIUFZEngFA9rpM+gtTsOEPf0xbnn7KK9C6T/VTdfwwtAg6ozu/33X7XZd\nEDCmUthTqS2EVHnKLgwZ+8WhbS23o5Rk09/no7C0/bIqc6pl9mkBvbFHMHfsB+PA\n/JSVD7fFyVdBIr8/HvYR/QshhSoWq7f28By3TBCAKAZd7iEOVfRZggCC+wU3ZMXa\nJb5RHwJy+ub7Z28E4jdJSS6dedn4VNDltz8POlS9AQKBgQDy9jTISRwaqjt5EuNG\nSJMU/FUF4VOp+385VcF/W00+7aBlNgxPvm01ftBiLtGuEBQajt6qwp7paRhWIVmu\nS5GSF03aTa/YRvmQBarBf3uGNwKcF1XZp2oyPWZy1h/K7Mg8kjTb4Z5dqcE35zCW\nKYW+O4qsNGthpYH/OSi8dFBo4QKBgQDuBIutiH2KrvWQT6EqcwatSXNAdq8pMD+A\nSfdpYFiRD87b54BAVsLLcrVHQxq1WchZNYX5qHM5hwDJYdBBbDRHPPhwRSv01kdw\n3C7X2GhbG9z7ejhqsgHcMptL/f/TX+HckxauuXLRdnSpX5ikdvi36bvd7cga/KHe\nG75UYe8G8wKBgQDbuJTbXGKyKqlGQTKQaSm6nMg3XSNQYkUYENnA10zwT+3yGgLg\nSxJwgpLpd/XgOGI18makfwU/iO+dVOPJoEWxnKmndwJD0Uv4V2epPiTzp+QQTXoy\nMBj1/lkcGVD/L0uWm5J6F3wksFQwvj9OTZbKBwbN3UoPMKJzsbmJVJczgQKBgQCl\nP0qqRCTE8AtVEbPXAN0V2fTGQKADfJfZvYCkDFvw+oSnb+Y+xP2guhbZTuFwHtFV\n/i7x0d2Nhwkox1wKz9DL1Ky3ZY7LASnAVV3ARWLOPl4Byiz5BnT8J7Zh4AqI+fyZ\nYxVQYTgx7Ie6P8B+DotHRGNGBRv0gIjw51oQw51ruQKBgQCfR/lvDN1jkdbCquAL\naw+SlM/a+loNjaKMhffX+udI6qYiu2r8W+Fxx8RJNEt1pxbYFhBv5eH3dRQmUNsc\noUErJ5YV8PSOX6IkHtxT3znkHr4cwILeBFI8ER4J3Xcd/X2dbFK+c1ylEJ6A72bn\nBlK3PuFYW7VjHAwUh6mnGhu/Vw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-x0x2t@security-3a215.iam.gserviceaccount.com",
  "client_id": "109882150745214981828",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x0x2t%40security-3a215.iam.gserviceaccount.com"
}

let fcm = new FCM(server);

let message = {
    to: '',
    collapse_key: '',

    notification: {
        title: 'Title',
        body: 'body'
    },
    data:{
        key1: 'sadf',
        key2: 'asdf'
       
    }
}

export function sendNotification(){
  return fcm.send(message, (err: any, response: any)=>{
      if(err){
          console.log('Something has gone wrong')
          return err
      }
      else{
          console.log(`Successfuly sent with response: `, response)
          return response;
      }
  });
}
