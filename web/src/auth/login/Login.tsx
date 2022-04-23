import { LoginWithEmail } from "./LoginWithEmail";
import { LoginWithFacebook } from "./LoginWithFacebook";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { LoginWithPhoneNumber } from "./LoginWithPhoneNumber";

export const Login = () => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <LoginWithEmail />
        <LoginWithPhoneNumber />
        <LoginWithGoogle />
        <LoginWithFacebook />
    </div>
}