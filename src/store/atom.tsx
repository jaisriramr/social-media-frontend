import { atom } from "recoil";

const profileDetails = atom({
  key: "profile-details",
  default: {},
});

const postLikesUser = atom({
  key: "post-user-likes",
  default: [],
});

export { profileDetails, postLikesUser };
