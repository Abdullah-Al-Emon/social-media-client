import { format } from 'date-fns';
// import da from 'date-fns/esm/locale/da/index.js';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';

const Banner = () =>
{
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const todayDate = new Date()
    const date = format(todayDate, 'PP');
    // console.log(date)

    const handleAddProducts = (data) =>
    {
        
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            // console.log(imgData.data.url)
            const post = {
                posterName: user?.displayName,
                PosterPhotoUrl: user?.photoURL,
                postDate: date,
                postPhoto: imgData.data.url,
                postDescription: data.description,
                like: 0,
                comment: 0
            }
            fetch('https://social-media-server-abdullah-al-emon.vercel.app/post',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(post)
            })
            .then(res => res.json())
            .then( result => {
                console.log(result)

            })

        })
        
    }

    return (
        <div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
                    <div className="relative lg:w-1/2">
                        <img
                            src={user.photoURL}
                            alt=""
                            className=" w-full lg:absolute h-80 lg:h-full"
                        />
                        <svg
                            className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
                            viewBox="0 0 20 104"
                            fill="currentColor"
                        >
                            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center p-8 my-7 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
                        <div className="flex items-center">
                            <form onSubmit={handleSubmit(handleAddProducts)}>
                                <div className="form-control w-full my-2">
                                    <input type='file'
                                        className='input input-bordered w-full '
                                        {...register("image", { required: "Photo is required" })}
                                    />
                                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                                </div>
                                <div className="form-control w-full my-2">
                                    <textarea
                                        {...register("description", { required: "Description is required" })}
                                        className="textarea textarea-bordered"></textarea>
                                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                                </div>
                                <input className='btn btn-accent w-full text-white' value='Post' type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;