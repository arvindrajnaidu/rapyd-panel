import firebase from "firebase/app";
import "firebase/database";

export const db = () => {
    return {
        getItem: async function (key) {
            let ref = firebase.database().ref(key)
            let snap = await ref.once('value')
            if (snap.exists()) {
                console.log(snap.val())
                return {
                    ...(snap.val() || {}),
                    addListener (fn) {
                        ref.on('value', fn)
                    }
                }
            } else {
                return null
            }
        },
        // getItem: async function (key) {
        //     let snap = await firebase.database().ref(key).once('value')
        //     if (snap.exists()) {
        //         console.log(snap.val())
        //         return snap.val()
        //     } else {
        //         return null
        //     }
        // },
        setItem: async function (key, val) {
            if (val) {
                await firebase.database().ref(key).set(val)
            }
        }
    }
}
