
    // check for IndexedDB support
    if (!window.indexedDB) {
        console.log(`Your browser doesn't support IndexedDB`);
    }

    // open the CRM database with the version 1
    const request = indexedDB.open('CRM', 1);

    // create the Users object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Users object store 
        // with auto-increment id
        let store = db.createObjectStore('Users', {
            autoIncrement: true
        });

        // create an index on the email property
        let index = store.createIndex('email', 'email', {
            unique: true
        });
    };

    // handle the error event
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    // handle the success event
    request.onsuccess = (event) => {
        const db = event.target.result;
        
    /*    insertUser(db, {
   name: "Sehran",
   email: "try123@gmail.com",
   phone: "7631508916",
   password: "Sehran123@"
   });*/
// getAllUsers(db);
 //getUserById(db, 1);
 
 
       

        // insert Users
        // insertUser(db, {
        //     email: 'john.doe@outlook.com',
        //     firstName: 'John',
        //     lastName: 'Doe'
        // });

        // insertUser(db, {
        //     email: 'jane.doe@gmail.com',
        //     firstName: 'Jane',
        //     lastName: 'Doe'
        // });


        // get User by id 1
        // getUserById(db, 1);


        // get User by email
        // getUserByEmail(db, 'jane.doe@gmail.com');

        // get all Users
        // getAllUsers(db);

       // deleteUser(db, 1);

    };

    function insertUser(db, User) {
        // create a new transaction
        const txn = db.transaction('Users', 'readwrite');

        // get the Users object store
        const store = txn.objectStore('Users');
        //
        let query = store.put(User);

        // handle success case
        query.onsuccess = function (event) {
            console.log(event);
        };

        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }

        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            db.close();
        };
    }


    function getUserById(db, id) {
        const txn = db.transaction('Users', 'readonly');
        const store = txn.objectStore('Users');

        let query = store.get(id);

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`The User with ${id} not found`);
            } else {
                console.log(event.target.result);
            }
        };

        query.onerror = (event) => {
            console.log(event.target.errorCode);
        }

        txn.oncomplete = function () {
            db.close();
        };
    };

    function getUserByEmail(db, email) {
        const txn = db.transaction('Users', 'readonly');
        const store = txn.objectStore('Users');

        // get the index from the Object Store
        const index = store.index('email');
        // query by indexes
        let query = index.get(email);

        // return the result object on success
        query.onsuccess = (event) => {
            console.log(query.result); // result objects
        };

        query.onerror = (event) => {
            console.log(event.target.errorCode);
        }

        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }

    function getAllUsers(db) {
        const txn = db.transaction('Users', "readonly");
        const objectStore = txn.objectStore('Users');

        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                let User = cursor.value;
                console.log(User);
                // continue next record
                cursor.continue();
            }
        };
        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }


    function deleteUser(db, id) {
        // create a new transaction
        const txn = db.transaction('Users', 'readwrite');

        // get the Users object store
        const store = txn.objectStore('Users');
        //
        let query = store.delete(id);

        // handle the success case
        query.onsuccess = function (event) {
            console.log(event);
        };

        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }

        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            db.close();
        };

    }

