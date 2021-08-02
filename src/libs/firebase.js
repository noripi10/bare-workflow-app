import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export { firestore };
export const db = firestore();

export const onAuthAnonymous = async () => {
	try {
		await auth().signInAnonymously();
	} catch (err) {
		alert(err);
	}
};

export const onRegisterMailPassword = async (email, password) => {
	try {
		await auth().createUserWithEmailAndPassword(email, password);
	} catch (err) {
		alert(err);
	}
};

export const onAuthMailPassword = async (email, password) => {
	try {
		await auth().signInWithEmailAndPassword(email, password);
	} catch (err) {
		alert(err);
	}
};

export const onAuthGoogle = async () => {
	try {
		GoogleSignin.configure({
			// firebaseのsign-in-methodにあるWebClientID
			webClientId:
				'57931604350-phjrp4rddjg6ju5j26nv9gookeka8hma.apps.googleusercontent.com',
			scopes: ['profile', 'email'],
		});

		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		await auth().signInWithCredential(googleCredential);
	} catch (err) {
		alert(err);
	}
};

export const onSignOut = () => {
	try {
		auth().signOut();
	} catch (err) {
		alert(err);
	}
};
