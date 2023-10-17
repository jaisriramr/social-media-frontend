import { atom } from "recoil";

const profileDetails = atom({
  key: "profile-details",
  default: {},
});

export { profileDetails };
