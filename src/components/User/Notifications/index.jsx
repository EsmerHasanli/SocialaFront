import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Context } from "../../../main";


const Notifications = () => {

    const {store} = useContext(Context)
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7023/notificationHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

            connection.start().then(() => {
                const userName = store.user.userName
                connection.invoke("Connect", userName)
                .then(() => {
                    console.log("Connected successfully and user connected.");
                })
                .catch((error) => {
                    console.error(`Error connecting to hub: ${error}`);
                });
                
            }).catch(err => console.error(err));
            connection.on('NewNotification', (message) => {
                console.log(message)
                setNotifications([...notifications, message]);
            });
            connection.on('LatestNotifications', (message) => {
                console.log(message)
            });
            
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );

}
export default observer(Notifications)