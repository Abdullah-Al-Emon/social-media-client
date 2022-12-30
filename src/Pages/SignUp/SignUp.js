import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SignUp = () =>
{
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()
    console.log(imageHostKey)

    const handleSignUp = data =>
    {
        setSignUpError('')
        let file = data.image[0]
        console.log(file)
        const formData = new FormData();
        formData.append('image', file)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData.data.url)
            createUser(data.email, data.password)
                .then(result =>
                {
                    const user = result.user;
                    console.log(user)
                    navigate('/')
                    // toast.success('User Created Successfully')
                    const userInfo = {
                        displayName: data.name,
                        photoURL: imgData.data.url
                    }
                    updateUser(userInfo)
                        .then(() =>
                        {})
                        .catch(err => console.error(err))
    
                })
                .catch(error =>
                {
                    console.error(error)
                    setSignUpError(error.message)
                })
        })
    }

    return (
        <div>
            <div className='h-[750px] flex justify-center items-center'>
                <div className='w-96 p-7 shadow-2xl rounded-xl'>
                    <h2 className='text-xl text-center font-semibold'>Sign Up</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs my-2">
                            <label className="label">
                                <span className='label-text font-semibold'>Name</span>
                            </label>
                            <input type='text'
                                className='input input-bordered w-full max-w-xs'
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-700">{errors.name?.message}</p>}
                        </div>
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
                                className='input input-bordered w-full max-w-xs'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                })} />
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className='label-text font-semibold'>Photo</span>
                            </label>
                            <input type='file'
                                className='input input-bordered w-full '
                                {...register("image", { required: "Photo is required" })}
                            />
                            {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                        </div>
                        <input className='btn btn-primary w-full' value='Sign Up' type="submit" />
                    </form>
                    <p className='text-sm text-center my-4 font-semibold'>Already have an account? <Link className='text-secondary' to='/signIn'>Please Log In</Link></p>

                </div>

            </div>
        </div>
    );
};

export default SignUp;