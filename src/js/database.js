import * as firebase from 'firebase/app';
import 'firebase/database';

/**
 *
 * @type {firebase.app.App}
 */
let app = firebase.initializeApp({
    apiKey: "AIzaSyBMKN8aQIS7v37JtSk524WEkMtjBm7jcsU",
    authDomain: "orchidpaster.firebaseapp.com",
    databaseURL: "https://orchidpaster.firebaseio.com",
    projectId: "orchidpaster",
    storageBucket: "orchidpaster.appspot.com",
    messagingSenderId: "272967054896"
});

window.database = app.database();

/**
 *
 */
export default {

    /**
     *
     */
    prefix: '/gist/',

    /**
     *
     * @param id
     * @returns {!firebase.Promise|Promise<firebase.database.DataSnapshot>|*}
     */
    loadGist: (id) => {
        return window.database.ref(this.prefix + id).once('value');
    },

    /**
     *
     * @param id
     * @param code
     * @returns {Promise<any>}
     */
    saveGist: (id, code) => {
        return window.database.ref(this.prefix + id).set({
            code: code,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
    },
};