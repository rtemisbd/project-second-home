import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useRef } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const CommentTalking = () => {
  const MySwal = withReactContent(Swal);
  const formRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data2 = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      propertyId: formData.get("property"),
    };
    try {
      const product = {
        ...data2,
        userName,
      };
      await axios.post("https://api.psh.com.bd/api/review", product);
      MySwal.fire("Good job!", "successfully added", "success");
      formRef.current.reset();
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
    }
  };
  const handleReply = async (reviewId, replyBody) => {
    try {
      await axios.post(`https://api.psh.com.bd/api/review/${reviewId}`, {
        body: replyBody,
        userName: userName,
      });
      MySwal.fire("Good job!", "successfully added reply", "success");
      formRef.current.reset();
    } catch (err) {
      console.log("Error adding reply:", err);
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-2">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
            <div className="w-full">
              <div className="flex mt-6">
                <p>Amenities</p>
                <img
                  src="../images/icon/Rectangle 25.png"
                  alt=""
                  className="h-1 mt-3 ms-12"
                />
                <p className="ms-4">5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="facility_h1 p-2 flex mt-5">
          <h2 className="text-2xl font-bold text-gray-900 ">F&Q</h2>
        </div>
      </div>
      <div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div
            className="col-md-12 form_sub_stream "
            style={{ display: "none" }}
          >
            <label htmlFor="inputState" className="profile_label3">
              Property
            </label>
            <select name="property" id="inputState" className="main_form w-100">
              <option value={id}>{data.name}</option>
            </select>
          </div>

          <div className="mt-5">
            <Textarea variant="outlined" label="Comment" name="comment" />
          </div>

          <div className="d-flex justify-content-center my-5">
            <button
              type="submit"
              className="profile_btn"
              style={{ width: 175 }}
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="grid grid-cols-12 sm:px-5 gap-x-10 gap-y-16 mt-12">
          {main.map((item, i) => {
            const formatDate = new Date(item.createdAt).toLocaleString();
            return (
              <>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-6">
                  <List>
                    <ListItem>
                      <ListItemPrefix>
                        <img
                          alt="candice"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                          style={{
                            width: "80px",
                            height: "60px",
                            borderRadius: "50%",
                          }}
                        />
                      </ListItemPrefix>
                      <div className="flex justify-between w-full">
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            {item.userName}
                          </Typography>

                          <Typography variant="small" color="blue-gray">
                            {formatDate}
                          </Typography>
                        </div>
                      </div>
                    </ListItem>
                  </List>
                  <div style={{ marginTop: -12 }}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal ms-5"
                    >
                      {item.comment}
                    </Typography>
                  </div>
                  <div>
                    <div className="mt-3 ms-5">
                      {item.replies.map((reply, index) => (
                        <div key={index} className="mt-3 ms-5">
                          <>
                            <ListItem>
                              <ListItemPrefix>
                                <img
                                  alt="candice"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                  style={{
                                    width: "80px",
                                    height: "60px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </ListItemPrefix>
                              <div className="flex justify-between w-full">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {reply.replyUser}:
                                  </Typography>

                                  <Typography variant="small" color="blue-gray">
                                    {formatDate}
                                  </Typography>
                                </div>
                              </div>
                            </ListItem>
                            <div style={{ marginTop: -12 }}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal ms-5"
                              >
                                {reply.body}
                              </Typography>
                            </div>
                          </>
                        </div>
                      ))}
                      <div className="mt-3 ms-5">
                        <Textarea
                          variant="outlined"
                          label="Reply"
                          name={`reply_${i}`}
                          style={{ width: 400 }}
                        />
                        <input
                          type="text"
                          placeholder="Your Name"
                          name={`replyUser_${i}`}
                          style={{
                            width: 400,
                            marginTop: 10,
                            display: "none",
                          }}
                        />
                        <button
                          type="button"
                          className="profile_btn mt-2"
                          style={{ width: 175 }}
                          onClick={() => {
                            const replyBody = document.getElementsByName(
                              `reply_${i}`
                            )[0].value;
                            const replyUser = document.getElementsByName(
                              `replyUser_${i}`
                            )[0].value;
                            handleReply(item._id, replyBody, replyUser);
                          }}
                        >
                          Submit Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentTalking;
