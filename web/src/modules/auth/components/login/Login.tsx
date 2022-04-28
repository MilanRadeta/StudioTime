import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../Auth";
import { LoginWithEmail } from "./LoginWithEmail";
import { LoginWithFacebook } from "./LoginWithFacebook";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { LoginWithPhoneNumber } from "./LoginWithPhoneNumber";

export const Login = () => {
    const navigate = useNavigate();

    const signUp = useCallback(() => {
        navigate(`../${AUTH_ROUTES.REGISTER}`);
    }, [navigate]);

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <LoginWithEmail />
        <LoginWithPhoneNumber />
        <LoginWithGoogle />
        <LoginWithFacebook />
        <button onClick={signUp}>Sign Up</button>
    </div>
}