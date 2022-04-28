import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { FIREBASE_AUTH } from "../../../shared/firebase/firebase.client";
import { useAuth } from "../../contexts/AuthContext";

export const LoginWithEmail = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();
    const signIn = useCallback(async () => {
        const result = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        setToken(await result.user.getIdToken());
    }, [setToken, email, password]);


    return <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button onClick={signIn}>Sign In With Email</button>
    </div>;
}