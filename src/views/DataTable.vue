<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { reactive, onBeforeMount } from 'vue';
import {getData} from "@/api/data";

const columns = [
  {
    title: "DeviceName",
    dataIndex: "deviceName",
    width: 800
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 500
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data: any = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    deviceName: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
interface ReportMessage{
    deviceName :string,
    msgType :string,
    value :number,
}
export default defineComponent({
  name: "DataTable",
    setup(props){
      const data = getData('dose','202801000058');
        //beforeMount
        onBeforeMount(()=>{
            console.log()
        });
      return {
        data
      }
    },
  data() {
    return {
      //data,
      columns
    };
  }
});
</script>

<style scoped></style>
