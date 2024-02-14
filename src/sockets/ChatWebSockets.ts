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
        ) => void;

    public store;
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
                this.connection.invoke("Connect", this.store.user.userName)
                console.log("recon chat")
            })
    
        this.events = (onGetChatItems, onConnectChat, onGetSearchUsers,onRecieveMessages,onRecieveMessage) => {
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

    public connectSockets = () => {
        if (this.connection.state != signalR.HubConnectionState.Connected) {
            this.connection.start()
            .then(() => {
                this.connection.invoke("Connect", this.store.user.userName)
                console.log("CONNECTED")
            })
            .catch(err => console.log(err));

        }
    }
    public searchChatUsers = (searchParam : string) => {
        this.connection.invoke("SearchChatUsers", searchParam, this.store.user.userName)
        .catch((err) => console.error("Error invoking SearchChatUsers:", err));
    }
    public getChatMessages = (chatId: number,userName:string, skip : Int32Array) => {
        this.connection.invoke("SearchChatUsers", chatId, this.store.user.userName, skip)
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