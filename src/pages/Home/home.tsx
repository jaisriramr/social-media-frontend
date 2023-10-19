import { Fragment, useEffect, useState } from "react";
import "./home.css";
import { container } from "tsyringe";
import { FeedService } from "../../services/feed.service";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Logo from "../../assets/logo.svg";
import CreateIcon from "../../assets/icons/create.svg";
import ExploreIcon from "../../assets/icons/explore.svg";
import HomeIcon from "../../assets/icons/home.svg";
import MessageIcon from "../../assets/icons/message.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import ReelIcon from "../../assets/icons/reels.svg";
import SearchIcon from "../../assets/icons/search.svg";
import MoreIcon from "../../assets/icons/more.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileDetails } from "../../store/atom";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import ReadPost from "../../components/ReadPost/read-post";

const Home = () => {
  const feedService = container.resolve(FeedService);
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState<any>(profileDetails);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["feed", "service"],
    queryFn: () => feedService.getFeedForUser(profile?._id),
    enabled: profile?._id !== undefined,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    } else {
      let userProfile: any = jwtDecode(localStorage.getItem("userToken") || "");
      setProfile(userProfile);
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Fragment>
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div className="feed-sidebar">
              <div className="feed-sidebar-top">
                <div
                  className="feed-logo-container"
                  onClick={() => navigate("/")}
                >
                  <img src={Logo} alt="logo" />
                  <h2>SocialMedia</h2>
                </div>
                <ul className="feed-sidebar-links">
                  <li
                    className="feed-sidebar-link"
                    onClick={() => navigate("/")}
                  >
                    <img src={HomeIcon} alt="home" />
                    Home
                  </li>
                  <li className="feed-sidebar-link">
                    <img src={SearchIcon} alt="home" />
                    Search
                  </li>
                  <li
                    className="feed-sidebar-link"
                    onClick={() => navigate("/explore")}
                  >
                    <img src={ExploreIcon} alt="home" />
                    Explore
                  </li>
                  <li
                    className="feed-sidebar-link"
                    onClick={() => navigate("/reels")}
                  >
                    <img src={ReelIcon} alt="home" />
                    Reels
                  </li>
                  <li
                    className="feed-sidebar-link"
                    onClick={() => navigate("/messages")}
                  >
                    <img src={MessageIcon} alt="home" />
                    Messages
                  </li>
                  <li className="feed-sidebar-link">
                    <img src={NotificationIcon} alt="home" />
                    Notifications
                  </li>
                  <li className="feed-sidebar-link">
                    <img src={CreateIcon} alt="home" />
                    Create
                  </li>
                  <li
                    className="feed-sidebar-link"
                    onClick={() => navigate(`/profile/${profile?.username}`)}
                  >
                    <img src={profile?.profile_picture_url} alt="profile" />
                    Profile
                  </li>
                </ul>
              </div>
              <div className="feed-sidebar-bottom">
                <div className="feed-sidebar-link">
                  <img src={MoreIcon} alt="more" />
                  More
                </div>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="feed-list-container">
              {data?.map((post: any, i: any) => (
                <ReadPost data={post} key={i} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Home;
