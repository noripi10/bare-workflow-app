import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
			webClientId:
				'1091147541523-kr2qgu8406a5987srahapa8elsl7plgq.apps.googleusercontent.com',
			scopes: ['profile', 'email'],
		});

		const { idToken } = await GoogleSignin.signIn();
		console.log({ idToken });
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
