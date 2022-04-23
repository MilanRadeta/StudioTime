import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useMemo } from "react";
import { FIREBASE_AUTH } from "../../firebase/firebase.client";
import { useAuth } from "../AuthContext";

export const LoginWithFacebook = () => {

    const { setToken } = useAuth();
    const facebook = useMemo(() => new FacebookAuthProvider(), []);
    const signIn = useCallback(async () => {
        const result = await signInWithPopup(FIREBASE_AUTH, facebook);
        setToken(await result.user.getIdToken());
    }, [setToken, facebook]);


    return <button onClick={signIn}>Sign In With Facebook</button>
}