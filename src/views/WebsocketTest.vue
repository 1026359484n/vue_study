<template>
  <div class="about">
    -
    <h1>This is an about page</h1>
    <h1>Stock Price</h1>
    <div>
      <button @click="senMessage">发送消息</button>
      <ul>
        <li v-for="m in list1" :key="m.name">{{ m.name }}: {{ m.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { defineComponent } from "vue";
export default defineComponent({
  name: "About",
  setup() {
    const stompClient: any = null;
    const list1: Array<any> = [];
    return {
      stompClient,
      list1
    };
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    senMessage() {
      this.stompClient.send("/app/hello", JSON.stringify({ name: "test" }));
    },
    initWebSocket() {
      this.connection();
      // 需要有一个失败重连得到问题
    },
    connection() {
      // 更换that指针
      const socket = new SockJS("http://localhost:19059/socket");
      this.stompClient = Stomp.over(socket);

      //建立连接，订阅主题
      this.stompClient.connect({}, (frame: any) => {
        //console.log(frame)
        const list = this.list1;
        this.stompClient.subscribe("/topic/greetings", (val: any) => {
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
