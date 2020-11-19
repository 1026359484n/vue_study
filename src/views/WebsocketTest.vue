<template>
  <div class="websocket-test">
    <h1>This is an websocket page</h1>
    <h1>Stock Price</h1>
    <div>
      <button @click="sendMessage">发送消息给所有人</button>
      <button @click="sendToMyself">发送消息给自己</button>
      <ul>
        <li v-for="m in list1" :key="m.name">{{ m.name }}: {{ m.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Stomp, { Client, Frame, Message } from "webstomp-client";
import SockJS from "sockjs-client";
import { defineComponent } from "vue";
export default defineComponent({
  name: "WebsocketTest",
  setup() {
    //const socket = new SockJS("http://localhost:19058/ws?access_token="+localStorage.token);
    const socket = new SockJS(
      "https://dev.yoo.la/auth/ws?access_token=" + localStorage.token
    );
    const stompClient: Client = Stomp.over(socket);
    const headers = {
      //withCredentials: true,
      "My-Auth": localStorage.token,
      Authorization: `Bearer ${localStorage.token}`
    };
    return {
      socket,
      stompClient,
      headers
    };
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    sendMessage() {
      this.stompClient.send(
        "/app/hello/all",
        JSON.stringify({ name: "test" }),
        {}
      );
    },
    sendToMyself() {
      this.stompClient.send("/app/hello", JSON.stringify({ name: "test" }), {});
    },
    initWebSocket() {
      this.connection();
      // 需要有一个失败重连得到问题
    },
    connection() {
      // 更换that指针

      //建立连接，订阅主题
      this.stompClient.connect(this.headers, (frame?: Frame) => {
        //console.log(frame)
        this.stompClient.subscribe("/user/topic/message", (val: Message) => {
          console.log("send to user");
          console.log(val.body);
        });
        this.stompClient.subscribe("/topic/greetings", (val: Message) => {
          // this.list1 = JSON.parse(val.body)
          console.log("-------------------");
          //下面会报错，应该是json的问题，但是数据可以接收到
          //list.push(val.body)
          console.log(val.body);
        });
      });
      // 回调函数 3 end
    }
  }
});
</script>
