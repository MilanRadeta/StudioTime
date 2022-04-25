import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIREBASE_AUTH } from "../../firebase/firebase.client";
import { useAuth } from "../AuthContext";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigate = useNavigate();

    const goBack = useCallback(() => { navigate(-1); }, [navigate]);

    const { setToken } = useAuth();
    const signUp = useCallback(async () => {
        if (password !== confirmedPassword) {
            alert("Passwords are not the same");
            return;
        }

        const result = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        await sendEmailVerification(result.user);
        setToken(await result.user.getIdToken());
    }, [setToken, email, password, confirmedPassword]);


    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
            <label>Repeated Password</label>
            <input type="password" value={confirmedPassword} onChange={(event) => setConfirmedPassword(event.target.value)} />
        </div>
        <button onClick={goBack}>Back</button>
        <button onClick={signUp}>Sign Up</button>
    </div>;
}