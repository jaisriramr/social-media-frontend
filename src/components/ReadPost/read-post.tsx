import { Fragment } from "react";
import "./read-post.css";
import { readPost } from "./post.interface";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DotIcon from "../../assets/icons/dots.svg";
import BookMarkIcon from "../../assets/icons/bookmark.svg";
import LikeIcon from "../../assets/icons/notification.svg";
import ShareIcon from "../../assets/icons/share.svg";
import CommentIcon from "../../assets/icons/message.svg";

const ReadPost = ({ post }: { post: readPost }) => {
  console.log("PPP ", post);
  return (
    <Fragment>
      <div className="read-post-container">
        <div className="read-post-user-container">
          <div className="read-post-user-header">
            <img
              src={post?.post_user[0]?.profile_picture_url}
              alt="user-profile"
              className="read-post-user-profile"
            />
            <Link
              to={`/profile/${post?.post_user[0]?.username}`}
              className="read-post-username"
            >
              {post?.post_user[0]?.username}
            </Link>
          </div>
          <img src={DotIcon} alt="dots" className="read-post-dots" />
        </div>
        <div className="read-post-image-container">
          <img
            src={post?.post_url}
            alt="profile-post"
            className="read-post-image"
          />
        </div>
        <div className="read-post-actions">
          <div className="read-post-left-action">
            <img src={LikeIcon} alt="Like img" />
            <img src={CommentIcon} alt="Comment Img" />
            <img src={ShareIcon} alt="Share Img" />
          </div>
          <div className="read-post-right-action">
            <img src={BookMarkIcon} alt="Saved Icon" />
          </div>
        </div>
        <p className="read-post-no-likes">{post.noOfLikes} Likes</p>
      </div>
    </Fragment>
  );
};

export default ReadPost;
