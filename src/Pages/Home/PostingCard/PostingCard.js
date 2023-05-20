import React, { useEffect, useState } from 'react';

const PostingCard = () =>
{
    const [post, setPost] = useState([]);
    useEffect(() =>
    {
        fetch('https://social-media-server-abdullah-al-emon.vercel.app/post')
            .then(res => res.json())
            .then(result =>
            {
                setPost(result)
            })
    }, [])
    console.log(post)

    const handleUpdate = (pos) => {

        fetch(`http://localhost:5000/post/${pos._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            // body: JSON.stringify(pos)
        })
        .then( res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <div className='text-center md:mx-10 mx-6'>
            <div className='grid w-full gap-3 lg:grid-cols-2'>
                {
                    post.map(pos =>
                        <div className="card w- md:w-[520px] mx-auto bg-base-100 border shadow-xl">
                            <figure><img src={pos.postPhoto} className='h-[250px] md:h-[300px] w-full' alt="Shoes" /></figure>
                            <div className="card-body">
                                <div>
                                    <h2 className="flex flex-row items-center">
                                        <div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img src={pos.PosterPhotoUrl} alt='' />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className='font-medium'>{pos.posterName}</h2>
                                            <div>{pos.postDate}</div>
                                        </div>
                                    </h2>
                                </div>
                                <p>{pos.postDescription}</p>
                                <div className="card-actions justify-end">
                                    <div className="btn btn-sm" onClick={handleUpdate(pos)}>Like <span className='ml-1'>{pos.like}</span></div>
                                    <div className="btn btn-sm">Comment <span className='ml-1'>{pos.comment}</span></div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PostingCard;