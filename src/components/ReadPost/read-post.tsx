import { Fragment, useEffect, useState } from "react";
import "./read-post.css";
import { readPost } from "./post.interface";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DotIcon from "../../assets/icons/dots.svg";
import BookMarkIcon from "../../assets/icons/bookmark.svg";
import LikeIcon from "../../assets/icons/notification.svg";
import ShareIcon from "../../assets/icons/share.svg";
import CommentIcon from "../../assets/icons/message.svg";
import Modal from "antd/lib/modal";
import { container } from "tsyringe";
import { FeedService } from "../../services/feed.service";
import Button from "antd/lib/button";
import Skeleton from "antd/lib/skeleton";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { postLikesUser, profileDetails } from "../../store/atom";
import { PostService } from "../../services/post.service";
import LikedIcon from "../../assets/icons/liked.svg";

const ReadPost = ({ data }: { data: readPost }) => {
  const [post, setPost] = useState(data);
  const feedService = container.resolve(FeedService);
  const postService = container.resolve(PostService);
  const [openLikes, setOpenLikes] = useState<boolean>(false);

  const [postLikes, setPostLikes] = useRecoilState<any>(postLikesUser);
  const resetPostLikes = useResetRecoilState(postLikesUser);
  const [getLikes, setGetLikes] = useState<boolean>(false);
  const userDetails: any = useRecoilValue(profileDetails);

  const {
    data: LikesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get", "user", "likes"],
    queryFn: () => feedService.getPostLikedUsers(post?.post_id),
    enabled: getLikes,
    onSuccess(data) {
      setPostLikes(data);
    },
  });

  function handleLikeOpen() {
    setGetLikes(true);
    setOpenLikes(true);
  }

  function handleCloseOpenLikes() {
    console.log("DDDDD");

    resetPostLikes();
    setGetLikes(false);
    setOpenLikes(false);
  }

  async function handleLike() {
    const query = {
      user_id: userDetails?._id,
      post_id: post.post_id,
    };

    await postService
      .createLike(query)
      .then((response: any) => {
        setPost({
          ...post,
          noOfLikes: post.noOfLikes + 1,
          user_liked: [response],
        });
      })
      .catch((err) => {
        console.log("Error while create like ", err);
      });
  }

  async function handleUnLike(id: any) {
    await postService
      .removeLike(id)
      .then((response) => {
        setPost({ ...post, noOfLikes: post.noOfLikes - 1, user_liked: [] });
      })
      .catch((err) => {
        console.log("Error while removing like ", err);
      });
  }

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
            {post?.user_liked[0]?.user_id == userDetails?._id ? (
              <img
                src={LikedIcon}
                alt="liked"
                onClick={() => handleUnLike(post?.user_liked[0]?._id)}
              />
            ) : (
              <img src={LikeIcon} alt="Like img" onClick={handleLike} />
            )}
            <img src={CommentIcon} alt="Comment Img" />
            <img src={ShareIcon} alt="Share Img" />
          </div>
          <div className="read-post-right-action">
            <img src={BookMarkIcon} alt="Saved Icon" />
          </div>
        </div>

        <p className="read-post-no-likes" onClick={handleLikeOpen}>
          {post.noOfLikes} Likes
        </p>

        <div className="read-post-footer-caption">
          <Link
            to={`/profile/${post?.post_user[0]?.username}`}
            className="read-post-username"
          >
            {post?.post_user[0]?.username}
          </Link>
          <label>{post?.caption}</label>
        </div>

        {post?.noOfComments > 0 && (
          <div className="read-post-footer-view-comment">
            View{" "}
            {post?.noOfComments == 1
              ? post?.noOfComments
              : "all " + post?.noOfComments}{" "}
            comments
          </div>
        )}
      </div>

      {/* Like Modal */}
      <Modal
        open={openLikes}
        title="Likes"
        onOk={handleCloseOpenLikes}
        footer
        onCancel={handleCloseOpenLikes}
        width={420}
      >
        <div className="like-container">
          {postLikes &&
            postLikes?.map((like: any, i: any) => (
              <div className="like-user-container" key={i}>
                <div className="like-user-box">
                  <Link to={`/profile/${like.like_users[0]?.username}`}>
                    <img
                      src={like.like_users[0]?.profile_picture_url}
                      alt="like-user"
                    />
                  </Link>
                  <div className="like-user-bio">
                    <Link to={`/profile/${like.like_users[0]?.username}`}>
                      {like.like_users[0]?.username}
                    </Link>
                    <label>{like.like_users[0]?.fullname}</label>
                  </div>
                </div>
                <Button type="primary">Follow</Button>
              </div>
            ))}
        </div>
      </Modal>
    </Fragment>
  );
};

export default ReadPost;
