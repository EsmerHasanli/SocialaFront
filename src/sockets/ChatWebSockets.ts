import * as signalR from "@microsoft/signalr";
const URL ="https://localhost:7023/chatHub"; 
class Connector {
    private connection: signalR.HubConnection;
    public events: (
        onGetChatItems: (data : object[]) => void,
        onConnectChat: (data:object) => void,
        onGetSearchUsers: (data: object[]) => void,
        onRecieveChatMessages: (data: object[]) => void,
        onRecieveMessage: (data: object) => void,
        onGetTypingUser: (data: string) => void,
        onDeleteTypingUser:(data: string) => void,
        onGetMessagesAfterDelete : (data: object[]) => void
        ) => void;

    public store;
    public loading : boolean;
    static instance: Connector;
    constructor(store) {
        this.store = store;
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7023/chatHub', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
            .withAutomaticReconnect()
            .build();
        
            this.connection.onreconnected(()=> {
            this.loading = true;
            this.connection.invoke("Connect", this.store.user.userName)
            })
    
        this.events = (
            onGetChatItems,
            onConnectChat,
            onGetSearchUsers,
            onRecieveMessages,
            onRecieveMessage,
            onGetTypingUser,
            onDeleteTypingUser,
            onGetMessagesAfterDelete) => {
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
            this.connection.on("RecieveMessage", (message) => {
                onRecieveMessage(message)
            });
            this.connection.on("GetAddedTypingUser", (userName) => {
                onGetTypingUser(userName)
            });
            this.connection.on("GetDeletedTypingUser", (userName) => {
                onDeleteTypingUser(userName)
            });
            this.connection.on("GetMessagesAfterDelete", (messages) => {
                onGetMessagesAfterDelete(messages)
            });
            this.connection.on("SendMessageError", (err) => {
                console.log(err)
            });
            
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
    
    public deleteTypingUser = (reciever:string, sender:string) => {
        this.connection.invoke("DeleteTypingUser", reciever, sender)
        .catch(e => console.log(e));
    }

    public deleteMessage = (id : Int32Array) => {
        this.connection.invoke("DeleteMessage", id, this.store.user.userName)
        .then(() => console.log("succesfuully deleted"))
        .catch(e => console.log(e));
    }

    public connectSockets = (chatId) => {
        if (this.connection.state != signalR.HubConnectionState.Connected) {
            this.connection.start()
            .then(() => {
                this.connection.invoke("Connect", this.store.user.userName)
                    .then(() => {
                        if (chatId) {
                            this.connectToChat(chatId);
                        }
                    })
                    .catch(e => console.log(e));
                
            })
            .catch(err => console.log(err));

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


    public connectToChat = (chatId) => {
        this.connection.invoke("ConnectToChat", chatId, this.store.user.userName)
        .catch(err => console.log(err));
    }
    public disconnectFromChat = (chatId) => {
        this.connection.invoke("DisconnectChat", chatId, localStorage.getItem("userName"))
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