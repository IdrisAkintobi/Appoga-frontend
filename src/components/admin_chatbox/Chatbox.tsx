import { CloseIcon, SendIcon } from "../../assets/svg/ChatboxIcons";
import chatboxStyle from "./Chatbox.module.css";

type propsType = {
  data: { name: string; message: string };
};

const Chatbox: React.FC<propsType> = ({ data: { name, message } }) => {
  return (
    <>
      <div className={chatboxStyle.chat_window} id="message_window">
        <div className="chat-box">
          <div className={chatboxStyle.chat_box_header}>
            <div className={chatboxStyle.message_name}>{name}</div>
            <div className={chatboxStyle.online_sign}></div>
            <div className={chatboxStyle.cancel_sign} id="cancel_sign">
              {CloseIcon}
            </div>
          </div>
          <div className="message">
            <div className="message_image">
              <img src="sample.png" alt="sample" />
            </div>
            <div className={chatboxStyle.message_body}>{message}</div>
          </div>
          <div className={chatboxStyle.chat_input}>
            <form>
              <input type="text" name="" id="" />
              {SendIcon}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
