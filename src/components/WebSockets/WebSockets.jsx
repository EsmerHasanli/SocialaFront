import React, { useContext, useEffect } from 'react';
import { FollowContext } from '../../context';
import { observer } from 'mobx-react-lite';
import * as signalR from '@microsoft/signalr';
import { Context } from '../../main';

const WebSockets = () => {
    const {notifications, setNotifications} = useContext(FollowContext);
    const {onlineUsers, setOnlineUsers} = useContext(FollowContext);
    const {store} = useContext(Context)
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7023/notificationHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

            connection.start().then(() => {
                connection.invoke("Connect", store.user.userName)
                .then(() => {
                    console.log("Connected successfully and user connected.");
                })
                .catch((error) => {
                    console.error(`Error connecting to hub: ${error}`);
                });
                
            }).catch(err => console.error(err));
            connection.onreconnected(() => {
                console.log("reconnected")
                connection.invoke("Connect", store.user.userName)
            })
            // connection.onclose(() => {
            //   connection.invoke("Disconnect", store.user.userName)
            // })
            connection.on('NewNotification', (message) => {
                setNotifications( prev => [{...message}, ...prev]);
            });
            connection.on('LatestNotifications', (message) => {
                setNotifications(message);
            });
            connection.on('OnlineUsers', (message) => {
                console.log(message)
              setOnlineUsers([...message]);
          });
            function handleUserLogout() {
              connection.invoke("Disconnect", store.user.userName)
            }
            window.addEventListener("beforeunload", handleUserLogout);
            
        return () => {
            window.removeEventListener("beforeunload", handleUserLogout);
            connection.stop();
        };
    }, []);
}

export default observer(WebSockets);