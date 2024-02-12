import React from "react";
import "./index.scss";

import { Helmet } from "react-helmet";

import Navigation from "../../../components/User/Chat/Navigation";
import Users from "../../../components/User/Chat/Users";
import Chat from "../../../components/User/Chat/Chat";
import Form from "../../../components/User/Chat/Form";

const Messages = () => {
  return (
    <>
      <Helmet>
        <title>Socialite | Chat</title>
      </Helmet>
      <main id="messages-page">
        <Navigation />

        <section>
          <Users />
          <div id="chat-wrapper">
            <Chat />
            <Form />
          </div>
        </section>
      </main>
    </>
  );
};

export default Messages;
