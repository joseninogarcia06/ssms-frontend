import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import ssmsLogo from "../assets/ssms_logo.png"
import { VerifyAccount } from "../API/RenderAPI";

export default function Login(){
   const [result, setResult] = useState({ hasError: false, errorMessage: '' });
   const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = 'SSMS Admin Portal - Login';
        document.body.classList.add('body-login');
    }, [])

    const onLoginForm = async (data) => {
        if(data.userid.length > 18){
            setResult({ hasError: true, errorMessage: 'User ID exceeded to 18 characters.' });
            return;
        }

        if(data.password.length < 6){
            setResult({ hasError: true, errorMessage: 'Password length should have minimum of 6 characters.' });
        }

        const api = await VerifyAccount(data.userid, data.password);
        
        if(!api.isSuccess){
            setResult({ hasError: true, errorMessage: api.errorMessage });
            return;
        }

        setResult({ hasResult: true, errorMessage: "" });
    }

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    {result.hasError && (<div className="login-gen-error">{result.errorMessage}</div>)}
                    <img src={ssmsLogo} className="login-logo" />
                    <div className="logo-title">SSMS Admin Portal</div>
                    <form onSubmit={handleSubmit(onLoginForm)}>
                        <div className="login-form-group">
                            <label className="login-label">User ID</label>
                            <div className="login-input-container">
                                <input {...register('userid', { required: "User ID is required" })} maxLength={28} type="text" className="login-input" />
                            </div>
                            {errors.userid && <span className="login-form-error">{errors.userid.message}</span>}
                        </div>
                        <div className="login-form-group">
                            <label className="login-label">Password</label>
                            <div className="login-input-container">
                                <input {...register('password', { required: "Password is required" })} maxLength={20} type="password" className="login-input" />
                            </div>
                            {errors.password && <span className="login-form-error">{errors.password.message}</span>}
                        </div>
                        <div className="login-form-group">
                            <button className="login-submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}