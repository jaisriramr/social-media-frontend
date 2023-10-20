import { Fragment, useState } from "react";
import "./create-post.css";
import Modal from "antd/lib/modal";
import Input from "antd/lib/input";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileDetails } from "../../store/atom";
import { FileUploader } from "react-drag-drop-files";
import { container } from "tsyringe";
import { PostService } from "../../services/post.service";
import Button from "antd/lib/button";

const fileTypes = ["JPEG", "PNG", "GIF", "mp4"];

const { TextArea } = Input;

const CreatePost = ({
  open,
  handleCloseCreatePost,
}: {
  open?: boolean;
  handleCloseCreatePost?: any;
}) => {
  const userDetails: any = useRecoilValue(profileDetails);
  const postService = container.resolve(PostService);
  const [file, setFile] = useState<any>();
  const [metaData, setMetaData] = useState({
    user_id: userDetails?._id,
    caption: "",
    location: "",
  });

  const handleChange = (file: any) => {
    setFile(file[0]);
  };

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", metaData?.caption);
    formData.append("location", metaData?.location);
    formData.append("user_id", userDetails?._id);

    await postService
      .createPost(formData)
      .then((response: any) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("Error while trying to post", err);
      });
  }

  return (
    <Fragment>
      <Modal
        open={open}
        onOk={handleCloseCreatePost}
        onCancel={handleCloseCreatePost}
        title="Create Post"
        footer
        width={880}
      >
        <div className="create-post-container">
          <div className="create-post-upload-container">
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            ></FileUploader>
          </div>
          <div className="create-post-details-container">
            <div className="create-post-user-details">
              <img src={userDetails?.profile_picture_url} alt="user-profile" />
              <label>{userDetails?.username}</label>
            </div>
            <div className="create-post-details">
              <TextArea
                rows={4}
                placeholder="Write a caption"
                value={metaData?.caption}
                onChange={(e) =>
                  setMetaData({ ...metaData, caption: e.target.value })
                }
              />
              <Input
                placeholder="Add location"
                value={metaData?.location}
                onChange={(e) =>
                  setMetaData({ ...metaData, location: e.target.value })
                }
              />
            </div>
            <Button type="primary" onClick={handleSubmit}>
              Post
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreatePost;
