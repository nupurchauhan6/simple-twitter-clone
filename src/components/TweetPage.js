import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { useParams } from "react-router-dom";

const TweetPage = () => {
    const { id } = useParams();
    const tweet = useSelector(state => state.tweets[id]);
    const replies = tweet ? tweet.replies.sort(
        (a, b) => a.timestamp - b.timestamp
    ) : [];
    return (
        <div>
            <Tweet id={id} />
            <NewTweet id={id} />
            {replies && replies.length !== 0 && <h3 className="center">Replies</h3>}
            <ul>
                {replies.map((replyId) => (
                    <li key={replyId}>
                        <Tweet id={replyId} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TweetPage;