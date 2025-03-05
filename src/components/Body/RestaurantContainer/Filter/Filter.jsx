import { useState } from 'react';
import './Filter.css';

export default function Filter({ onTopRated, onFastestDelivery, onClearFilter, removeClearFilterStyles }) {

    const [selectedTab, setSelectedTab] = useState("");

    const handleTopRated = () => {
        console.log("clicked");
        onTopRated();
    }

    const handleFastestDelivery = () => {
        onFastestDelivery();
    }

    const onSelectTab = (tabName) => {
        setSelectedTab(tabName);
    }

    return (
        <div className="filter-container">
            <strong>Quick Filters</strong>
            <button className={`top-rated-btn ${selectedTab === 'toprated' && !removeClearFilterStyles ? 'selected' : ''}`}
                onClick={() => { handleTopRated(), onSelectTab('toprated') }}>
                Top Rated ⭐
            </button>
            <button className={`top-rated-btn ${selectedTab === 'fastestdelivery' && !removeClearFilterStyles ? 'selected' : ''}`}
                onClick={() => { handleFastestDelivery(), onSelectTab('fastestdelivery') }}>
                Fastest Delivery ⌚
            </button>
            <button
                className='clear-filter-btn'
                onClick={onClearFilter}>
                Clear Filter ❌
            </button>
        </div>
    )
}