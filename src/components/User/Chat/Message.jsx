import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

const Message = ({ message, chat }) => {
  const { store } = useContext(Context);
  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended">
          <div className="message">{message.text}</div>
          <div className="avatar">
            <Avatar src={store.user.userImageUrl} className="photo" />
          </div>
        </div>
      ) : (
        <div className="recieved">
          <div className="avatar">
            <Avatar className="photo" src={chat.partnerImageUrl} />
          </div>
          <div className="message">{message.text}</div>
        </div>
      )}
    </>
  );
};

export default observer(Message);
