import { openDB } from 'idb';

//creates the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database　✅
export const putDb = async (content) =>{
  console.log('PUT to the database');
  //opens the database we made
  const jateDb = await openDB('jate', 1);
  //sets the permissions for what the user can do, iot the user can access jate and read and write
  const tx = jateDb.transaction('jate', 'readwrite');
  //this takes what is already in the database, it reads it, and gives it back as an object
  const store = tx.objectStore('jate');
  //now we can .put things into the database, and this "request" puts the "content" of "value"  into id:1 
  const request = store.put({ id: 1, value: content });
  //waits for request to finish (because it's a promise and then logs it to the console)
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database ✅
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
