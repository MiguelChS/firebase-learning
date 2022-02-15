const { db } = require('./app');

const crearDoc = async () => {
  const users = db.collection('users');
  //agregamos datos sin espeficiar el documento se va generar un id unico
  const result = await users.add({
    name: 'miguel',
    lastName: 'chauca'
  });

  const idGenerate = (await result.get()).id;

  // agregamos otra colleccion al documento

  const refAddredd = users.doc(idGenerate).collection('address');

  await refAddredd.add({
    name: 'el condor',
    number: '6244'
  });

}

// crearDoc();


const leerDatos = async () => {
  const snapshot = await db.collection('users').get();
  snapshot.forEach(async (doc) => {
    console.log('id doc', doc.id);
    console.log('----- data person ---');
    const dataPerson = doc.data();
    console.log('name = ', dataPerson.name);
    console.log('lasName = ', dataPerson.lastName);
    console.log('--- data address -----');
    const snapshotAdress = await doc.ref.collection('address').get();
    snapshotAdress.forEach((addressDoc) => {
      const dataAddress = addressDoc.data();
      console.log('name = ', dataAddress.name);
      console.log('number = ', dataAddress.number);
    });
  })
}

leerDatos();