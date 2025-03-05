import { useEffect } from 'react';
import ShimmerCardImg from '../../../../../assets/ShimmerUI/ShimmerUICardImg.gif';
import './ShimmerUICard.css';

export default function ShimmerUICard() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='shimmer-card-container'>
                <div className="loader"></div>
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
            <div className='shimmer-card-container'>
                <img src={ShimmerCardImg} alt="Loading" className='shimmer-image' />
            </div>
        </>
    )
}