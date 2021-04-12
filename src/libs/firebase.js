import auth from '@react-native-firebase/auth';

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

export const onSignOut = () => {
	try {
		auth().signOut();
	} catch (err) {
		alert(err);
	}
};
