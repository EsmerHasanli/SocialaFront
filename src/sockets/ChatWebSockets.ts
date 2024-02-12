import * as signalR from "@microsoft/signalr";
const URL ="https://localhost:7023/chatHub"; 
class Connector {
    private connection: signalR.HubConnection;
    public events: (
        onGetChatItems: (data : object[]) => void,
        onReceiveMessage: (data:object) => void,
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
        this.connection.start()
        .then(() => this.connection.invoke("Connect", store.user.userName ))
        .catch(err => document.write(err));

        this.events = (onGetChatItems, onReceiveMessage) => {
            this.connection.on("GetChatItems", (data) => {
                onGetChatItems(data);
            });
            this.connection.on("onReceiveMessage", (data) => {
                onReceiveMessage(data);
            });
        };
      
    }

    public newMessage = (messages: string) => {
        this.connection.invoke("newMessage", "foo", messages).then(x => console.log("sent"))
    }
    public static getInstance(store): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector(store);
        return Connector.instance;
    }
}
export default Connector.getInstance;