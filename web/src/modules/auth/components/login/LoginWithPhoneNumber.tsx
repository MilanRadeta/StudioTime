import {
    RecaptchaVerifier, signInWithPhoneNumber
} from "firebase/auth";
import { useCallback, useState } from "react";
import { FIREBASE_AUTH } from "../../../shared/firebase/firebase.client";
import { useAuth } from "../../contexts/AuthContext";

export const LoginWithPhoneNumber = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const { setToken } = useAuth();

    const signIn = useCallback(async () => {
        const recaptchaVerifier = new RecaptchaVerifier('sign-in-with-phone', {
            'size': 'invisible',
        }, FIREBASE_AUTH);
        const confirmationResult = await signInWithPhoneNumber(FIREBASE_AUTH, phoneNumber, recaptchaVerifier);
        const verificationCode = prompt("Insert verification code");
        if (verificationCode) {
            const result = await confirmationResult.confirm(verificationCode)
            setToken(await result.user.getIdToken());
        }
    }, [phoneNumber, setToken])


    return <div>
        <label>Phone Number</label>
        <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        <button id="sign-in-with-phone" onClick={signIn}>Sign In With Phone Number</button>
    </div>
}