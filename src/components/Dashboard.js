import { useSelector, useEffect } from 'react-redux';
import Tweet from './Tweet';

const Dashboard = () => {

    const tweets = useSelector(state => state.tweets);
    const tweetIds = tweets ? Object.keys(tweets).sort(
        (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ) : [];

    return (
        <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list">
                {tweetIds && tweetIds.map((id) => (
                    !tweets[id].replyingTo ?
                        <li key={id}>
                            <div><Tweet id={id} /></div>
                        </li> : null
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;