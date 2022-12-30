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

    return (
        <div className='grid md:mx-20 mx-6 lg:grid-cols-2'>
            {
                post.map(pos =>
                    <div className="card w- md:w-[600px] bg-base-100 border shadow-xl">
                        <figure><img src={pos.postPhoto} className='h-[250px] md:h-[300px] w-full' alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div>
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PostingCard;