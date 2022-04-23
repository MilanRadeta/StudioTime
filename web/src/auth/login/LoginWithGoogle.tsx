import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useMemo } from "react";
import { FIREBASE_AUTH } from "../../firebase/firebase.client";
import { useAuth } from "../AuthContext";

export const LoginWithGoogle = () => {

    const { setToken } = useAuth();
    const google = useMemo(() => new GoogleAuthProvider(), []);
    const signIn = useCallback(async () => {
        const result = await signInWithPopup(FIREBASE_AUTH, google);
        setToken(await result.user.getIdToken());
    }, [setToken, google]);


    return <button onClick={signIn}>Sign In With Google</button>
}