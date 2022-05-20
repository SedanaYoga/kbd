export const woFirebaseWord = (text) => {
    return text.toString().replace('Firebase: ', '')
}

export const woFirebaseWordGoogle = (text) => {
    return text.toString().replace('FirebaseError: Firebase: ', '')
}
