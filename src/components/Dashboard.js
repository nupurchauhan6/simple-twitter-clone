import { useSelector } from 'react-redux';
import Tweet from './Tweet';

const Dashboard = () => {

    const tweets = useSelector(state => state.tweets);

    return (
        <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list">
                {tweets && Object.keys(tweets).map((id) => (
                    <li key={id}>
                        <div><Tweet id={id} /></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;