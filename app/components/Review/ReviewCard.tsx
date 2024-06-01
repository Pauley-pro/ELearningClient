import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react';

type Props = {
    item:any;
}

const ReviewCard = (props: Props) => {
    return (
        <div className="main">
            <div className="Client-Card" style={{ display: "flex" }}>
                <Image
                    alt=""
                    className="avatar"
                    src={props.item.avatar}
                    width={100}
                    height={100}
                />
                <p style={{ marginTop: 25 }}>
                    <span>&ldquo;</span>
                    {props.item.comment}
                </p>
                <p>
                    <span className="Name">
                        {props.item.name}
                    </span>
                </p>
                <p className="designation">
                    <span>{props.item.profession}</span>
                </p>
                <Ratings rating={5} />
            </div>
        </div>

    )
}

export default ReviewCard
