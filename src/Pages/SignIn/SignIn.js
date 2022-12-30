import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SignIn = () =>
{
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [logInError, setLogInError] = useState('')
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) =>
    {
        setLogInError('')
        signIn(data.email, data.password)
            .then(result =>
            {
                navigate(from, {replace: true})
                const user = result.user;
                console.log(user)
                // setLoginUserEmail(data.email)
                // toast.success('Sign In Complete')
            })
            .catch(error =>
            {
                console.error(error)
                setLogInError(error.message)
            })
    }
    const handleGoogleSignIn = () =>
    {
        googleSignIn()
                .then(result =>
                {
                    const user = result.user;
                    navigate(from, {replace: true})
                    // setLoginUserEmail(user?.email)
                    console.log(user)
                })
                .catch(err => {
                    setLogInError(err)
                    console.error(err)
                })
    }
    return (
        <div>
            <div className='md:h-[650px] h-[550px] flex justify-center items-center'

            >
                <div className='w-96 p-7 shadow-2xl rounded-xl opacity-100 bg-opacity-100 bg-white'>
                    <h2 className='text-xl text-center font-semibold'>Log In</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full max-w-xs my-2">
                            <label className="label">
                                <span className='label-text font-semibold'>Email</span>
                            </label>
                            <input type='text'
                                className='input input-bordered w-full max-w-xs'
                                {...register("email", { required: "Email Address is required" })}
                            />
                            {errors.email && <p className="text-red-700">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs my-2">
                            <label className="label">
                                <span className='label-text font-semibold'>Password</span>
                            </label>
                            <input type='password'
                                className='input input-bordered w-full mb-3 max-w-xs'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                })} />
                            {logInError && <p className='text-red-600'>{logInError}</p>}
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-primary w-full' value='Log In' type="submit" />
                    </form>
                    <p className='text-sm text-center my-4 font-semibold'>New to Mobile hut? <Link className='text-secondary' to='/signUp'>Create new account</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;