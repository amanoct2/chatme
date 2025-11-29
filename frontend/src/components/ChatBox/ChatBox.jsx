import React from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
const chatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>
          Richard Sanford <img src={assets.green_dot} alt="" />{" "}
        </p>
        <img src={assets.help_icon} alt="" className="help" />
      </div>

      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            repellat quidem tenetur iste culpa doloremque perferendis debitis.
            Temporibus at, suscipit minus consectetur aut delectus, corporis
            ipsam, reiciendis ut tenetur incidunt?
          </p>
        </div>
        <img src={assets.profile_img} alt="" />
        <p>2:30 PM</p>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Send a message" />
        <input type="text" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default chatBox;
