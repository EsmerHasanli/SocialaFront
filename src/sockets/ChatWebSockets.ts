import * as signalR from "@microsoft/signalr";
import { message } from "antd";
const URL ="https://localhost:7023/messagesHub"; 
class Connector {
    private connection: signalR.HubConnection;
    public events: (
        onGetChatItems: (data : object[]) => void,
        onConnectChat: (data:object) => void,
        onGetSearchUsers: (data: object[]) => void,
        onRecieveChatMessages: (data: object[]) => void,
        onRecieveGroupMessages: (data: object[]) => void,
        onRecieveMessage: (data: object) => void,
        onRecieveGroupMessage: (data: object) => void,
        onGetTypingUser: (data: string) => void,
        onGetGroupAddedTypingUser: (id:number, userName : string) => void,
        onDeleteTypingUser:(data: string) => void,
        onGetGroupDeletedTypingUser: (id:number, userName : string) => void,
        onGetDeletedMesssageId : (id: number) => void,
        onGetGroupMessagesAfterDelete : (data: object[]) => void,
        onGetGroupItems: (data : object[]) => void,
        onConnectGroup: (data:object) => void,
        onGetGroupsCount: (data:number) => void,
        onGetChatsCount: (data:number) => void,
        onGetRemovedGroupId: (data:number) => void,
        onGetGroupMembersAfterDelete: (data:number) => void,
        onGetNewGroup : (data: object) => void,
        onGetUnreadedMessagesCount:(data:Int32Array) => void,
        onGetChatAfterDelete:(data:object) => void,
        onRecieveChatMediaMessages:(data:object[]) => void,
        ) => void;
    public store;
    public state : boolean = false;
    static instance: Connector;
    constructor(store) {
        this.store = store;
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7023/messagesHub', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
            .withAutomaticReconnect()
            .build();
        
            this.connection.onreconnected(()=> {
            })
     
            this.events = (
                onGetChatItems,
                onConnectChat,
                onGetSearchUsers,
                onRecieveMessages,
                onRecieveGroupMessages,
                onRecieveMessage,
                onRecieveGroupMessage,
                onGetTypingUser,
                onGetGroupAddedTypingUser,
                onDeleteTypingUser,
                onGetGroupDeletedTypingUser,
                onGetDeletedMesssageId,
                onGetGroupMessagesAfterDelete,
                onGetGroupItems,
                onConnectGroup,
                onGetChatsCount,
                onGetGroupsCount,
                onGetRemovedGroupId,
                onGetGroupMembersAfterDelete,
                onGetNewGroup,
                onGetUnreadedMessagesCount,
                onGetChatAfterDelete,
                onRecieveChatMediaMessages) => {
                
                 
            this.connection.on("GetChatsCount", (data) => {
                onGetChatsCount(data);
            });
            this.connection.on("GetUnreadedMessagesCount", (data) => {
                onGetUnreadedMessagesCount(data);
            })
            this.connection.on("GetGroupsCount", (data) => {
                onGetGroupsCount(data);
            });
            this.connection.on("GetChatItems", (data) => {
                onGetChatItems(data);
            });
            this.connection.on("ChatConnectResponse", (chat) => {
                onConnectChat(chat)
            });
            this.connection.on("GetSearchedUsers", (users) => {
                onGetSearchUsers(users)
            });
            this.connection.on("RecieveChatMessages", (messages) => {
                onRecieveMessages(messages)
            });
            this.connection.on("RecieveGroupMessages", (messages) => {
                onRecieveGroupMessages(messages)
            });
            this.connection.on("RecieveMessage", (message) => {
                onRecieveMessage(message)
            });
            
            this.connection.on("RecieveGroupMessage", (message) => {
                onRecieveGroupMessage(message)
            });
            this.connection.on("GetChatAfterDelete", (chatDto) => {
                onGetChatAfterDelete(chatDto);
            })
            this.connection.on("GetAddedTypingUser", (userName) => {
                onGetTypingUser(userName)
            });
            this.connection.on("GetGroupAddedTypingUser", (id, userName) => {
                onGetGroupAddedTypingUser(id, userName)
            });
            this.connection.on("GetDeletedTypingUser", (userName) => {
                onDeleteTypingUser(userName)
            });
            this.connection.on("GetGroupDeletedTypingUser", (id,userName) => {
                onGetGroupDeletedTypingUser(id, userName)
            });
            this.connection.on("GetDeletedMesssageId", (id) => {
                onGetDeletedMesssageId(id)
            });

            this.connection.on("GetGroupMessagesAfterDelete", (messages) => {
                onGetGroupMessagesAfterDelete(messages)
            });
            this.connection.on("GetGroupItems", (data) => {
                onGetGroupItems(data);
            });
            this.connection.on("GetRemovedGroupId", (groupId) => {
                onGetRemovedGroupId(groupId);
            });
            this.connection.on("GetGroupMembersAfterDelete", (members) => {
                onGetGroupMembersAfterDelete(members);
            });
            this.connection.on("GroupConnectResponse", (chat) => {
                onConnectGroup(chat)
            });
            this.connection.on("GetNewGroup", (newGroup) => {
                onGetNewGroup(newGroup)
            });
            this.connection.on("SendMessageError", (err) => {
                console.log(err)
            });
            this.connection.on("CheckChatAfterSendMessage", (connId:string, sender:string,reciever:string, sendedMessage:object) => {
                this.connection.invoke("CheckChatAfterSendMessage", connId, sender,reciever, sendedMessage)
            })
            this.connection.on("CheckChatAfterUpload", (connId:string, sender:string,reciever:string, sendedMessages:Array<object>) => {
                this.connection.invoke("CheckChatAfterUpload", connId, sender,reciever, sendedMessages)
            })
            this.connection.on("GetChatNewMediaMessages", (messages: Array<object>) => {
                console.log(messages);
                onRecieveChatMediaMessages(messages);
            })
            
        };
        
    }
    
    public disconnectSockets = () => {
        if (this.connection.state == signalR.HubConnectionState.Connected) {
            this.connection.invoke("Disconnect", this.store.user.userName)
            .then(() => {
                    this.connection.stop();
                })
                .catch(err => console.error(err));
            }
    }

    public addTypingUser = (reciever:string, sender:string) => {
        this.connection.invoke("AddTypingUser", reciever, sender)
        .catch(e => console.log(e));
    }
    public addGroupTypingUser = (groupId:Int32Array, sender:string) => {
        this.connection.invoke("AddGroupTypingUser", groupId, sender)
        .catch(e => console.log(e));
    }
    public removeMemberFromGroup(groupId:Int32Array, removeableUserName : string) {
        this.connection.invoke("RemoveMemberFromGroup", groupId, removeableUserName, this.store.user.userName)
        .then(() => console.log("silindi"))
        .catch(e => console.log(e));
    }
    public addGroupAdmin(groupId:Int32Array, userName : string) {
        this.connection.invoke("AddGroupAdmin", groupId, userName, this.store.user.userName)
        .then(() => console.log("added to admins"))
        .catch(e => console.log(e));
    }
    public deleteTypingUser = (reciever:string, sender:string) => {
        this.connection.invoke("DeleteTypingUser", reciever, sender)
        .catch(e => console.log(e));
    }
    public deleteGroupTypingUser = (groupId:Int32Array, sender:string) => {
        this.connection.invoke("DeleteGroupTypingUser", groupId, sender)
        .catch(e => console.log(e));
    }
    public deleteMessage = (id : Int32Array) => {
        this.connection.invoke("DeleteMessage", id, this.store.user.userName)
        .then(() => console.log("succesfuully deleted"))
        .catch(e => console.log(e));
    }
    public deleteGroupMessage = (id : number) => {
        if (id > 0) {
            this.connection.invoke("DeleteGroupMessage", id, this.store.user.userName)
            .then(() => console.log("succesfuully deleted"))
            .catch(e => console.log(e));
        }
    }

    public isSignalRConnected(): boolean {
        return this.connection.state === signalR.HubConnectionState.Connected;
    }
   
    public connectMessagesSockets = (userName: string) => {
        
        if (this.connection.state != signalR.HubConnectionState.Connected) {
            this.connection.start()
            .then(() => {
                this.connection.invoke("ConnectToMessagesSockets", userName)
                .then(c => 
                    console.log("Connected to messages"))
                    
            })
            .catch(err => console.log(err));
        }
    }

    public getItems(isChat : boolean) {
        console.log(isChat)
        if (this.connection.state == signalR.HubConnectionState.Connected) {
        this.connection.invoke("GetItems", isChat, this.store.user.userName)
        .catch(e => console.log(e));
        }
    }
    
    public searchChatUsers = (searchParam : string) => {
        this.connection.invoke("SearchChatUsers", searchParam, this.store.user.userName)
        .catch((err) => console.error("Error invoking SearchChatUsers:", err));
    }
    public getChatMessages = (chatId: number, skip : Int32Array) => {
        this.connection.invoke("GetChatMessages", chatId, this.store.user.userName, skip)
        .then(() => console.log("Succeeed"))
        .catch((err) => console.error("Error invoking SearchChatUsers:", err));
    }
    public getGroupMessages = (groupId: number, skip : Int32Array) => {
        this.connection.invoke("GetGroupMessages", groupId, this.store.user.userName, skip)
        .then(() => console.log("Succeeed"))
        .catch((err) => console.error("Error invoking:", err));
    }
    public sendMessageByUserName(payload : object) {
        this.connection.invoke("SendMessageByUserName", payload)
        .then(() => {
            console.log("sended")
        })
        .catch(err => console.log(err));
    }
    public sendMessageById(payload : object) {
        this.connection.invoke("SendMessageByChatId", payload)
        .then(() => {
            console.log("sended by chat id")
        })
        .catch(err => console.log(err));
    }
    public sendAudioByChatId(payload : object) {
        this.connection.invoke("SendAudioByChatId", payload)
        .then(() => {
            console.log("sended by chat id")
        })
        .catch(err => console.log(err));
    }

    public sendMessageToGroup(payload:object) {
        this.connection.invoke("SendMessageToGroup", payload)
        .then(() => {
            console.log("sended by group id")
        })
        .catch(err => console.log(err));
    }


    public connectToChat = (chatId : number) => {
        if (this.connection.state == signalR.HubConnectionState.Connected) {
            if (chatId) {
                this.connection.invoke("ConnectToChat", chatId, this.store.user.userName)
                .catch(err => console.log(err));
            }
        }
    }
    public connectToGroup = (groupId : number) => {
        if (groupId) {
            this.connection.invoke("ConnectToGroup", groupId, this.store.user.userName)
            .catch(err => console.log(err));
        }
    }
    public disconnectFromChat = (chatId : number) => {
        if (this.connection.state == signalR.HubConnectionState.Connected) {
            this.connection.invoke("DisconnectChat", chatId, localStorage.getItem("userName"))
            .then(() => {
                console.log("(^ OK")
            })
            .catch(err => console.log(err));
        }
    }
    public disconnectFromGroup = (groupId : number) => {
        console.log(groupId)
        this.connection.invoke("DisconnectGroup", groupId, localStorage.getItem("userName"))
        .then(() => {
            console.log("(^ OK")
        })
        .catch(err => console.log(err));
    }

    public static getInstance(store): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector(store);
        return Connector.instance;
    }
}
export default Connector.getInstance;