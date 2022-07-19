import { useSelector, useDispatch } from 'react-redux';
import { formatTweet, formatDate } from "../utils/helpers";
import {
    TiArrowBackOutline,
    TiHeartOutline,
    TiHeartFullOutline,
} from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";
import { useNavigate, Link } from "react-router-dom";

const Tweet = (props) => {
    const navigate = useNavigate();
    const tweet = useSelector(state => state.tweets[props.id]);
    const authedUser = useSelector(state => state.authedUser);
    const parentTweet = useSelector(state => { if (tweet) { return state.tweets[tweet.replyingTo] } });
    const user = useSelector(state => { if (tweet) { return state.users[tweet.author] } });
    const formattedTweet = formatTweet(tweet, user, authedUser, parentTweet);
    const dispatch = useDispatch();

    const handleLike = (e) => {
        e.preventDefault();
        dispatch(
            handleToggleTweet({
                id: formattedTweet.id,
                hasLiked: formattedTweet.hasLiked,
                authedUser,
            })
        );
    };

    const toParent = (e, id) => {
        e.preventDefault();
        navigate(`/tweet/${id}`);
    };

    if (tweet === null) {
        return <p>This Tweet doesn't exist</p>;
    }

    const { name,
        avatar,
        timestamp,
        text,
        hasLiked,
        likes,
        replies,
        id,
        parent } =
        formattedTweet ? formattedTweet : "";

    return (
        <Link to={`/tweet/${id}`} className="tweet">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
            <div className="tweet-info">
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button
                            className="replying-to"
                            onClick={(e) => toParent(e, parent.id)}
                        >
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                </div>
                <div className="tweet-icons">
                    <TiArrowBackOutline className="tweet-icon" />
                    <span>{replies !== 0 && replies}</span>
                    <button className="heart-button" onClick={handleLike}>
                        {hasLiked === true ? (
                            <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                        ) : (
                            <TiHeartOutline className="tweet-icon" />
                        )}
                    </button>
                    <span>{likes !== 0 && likes}</span>
                </div>
            </div>
        </Link>
    );
};

export default Tweet;