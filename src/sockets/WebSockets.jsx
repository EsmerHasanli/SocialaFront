import React, { useContext, useEffect, useRef } from 'react';
import { FollowContext } from '../context';
import { observer } from 'mobx-react-lite';
import * as signalR from '@microsoft/signalr';
import { Context } from '../main';

const WebSockets = () => {
    const {notifications, setNotifications} = useContext(FollowContext);
    const {onlineUsers, setOnlineUsers} = useContext(FollowContext);
    const {store} = useContext(Context)
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://app-socialite-eastus-dev-001.azurewebsites.net/notificationHub', {
                // skipNegotiation: true,
                // transport: signalR.HttpTransportType.WebSockets
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
                var audio = new Audio("/src/assets/sounds/success_alert.wav");
                // audio.play();
                setNotifications( prev => [{...message}, ...prev]);
            });
            connection.on('LatestNotifications', (message) => {
                setNotifications(message);
            });
            // connection.on('GetNewMessagesCountRes', (count) => {
            //     console.log(count);
            // });
            connection.on('OnlineUsers', (message) => {
              setOnlineUsers([...message]);
          });
            function handleUserLogout() {
              connection.invoke("Disconnect", store.user.userName)
            }
            window.addEventListener("unload", handleUserLogout);
            
        return () => {
            window.removeEventListener("unload", handleUserLogout);
            connection.stop();
        };
    }, []);
}

export default observer(WebSockets);