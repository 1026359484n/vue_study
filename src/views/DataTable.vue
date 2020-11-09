<template>
  <a-input-search
          v-model:value="value"
          placeholder="input search text"
          enter-button="Search"
          size="large"
          @search="onSearch(value)"
  />
  <br /><br />
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    size="small"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { reactive, onBeforeMount } from "vue";
import { getData } from "@/api/data";

const columns = [
  {
    title: "设备时间",
    dataIndex: "time",
    width: 250
  },
  {
    title: "设备编号",
    dataIndex: "deviceName",
    width: 300
  },
  {
    title: "数据类型",
    dataIndex: "msgType",
    width: 200
  },
  {
    title: "说明",
    dataIndex: "address",
    width: 200
  }
];

/*const data: any = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    deviceName: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}*/

export default defineComponent({
  name: "DataTable",
  setup(props) {
    const data :Array<any> = reactive([])
    /*onBeforeMount(async () => {
      const resp = await getData("dose", "202801000058");
      const results :Array<any> = resp.data.body.result;
      const result = results[0];
      let i = 0
      result.values.forEach((v:any)=>{
        data.push({
          key: i++,
          deviceName: v[1],
          age: v[1],
          address: v[1]
        })
      });
    });*/

    const onSearch = async function (value :any) {
      const resp = await getData("dose", value);
      const results :Array<any> = resp.data.body.result;
      const result = results[0];
      //data = reactive([])
      data.length = 0
      for (let i = 0; i < result.values.length; i++) {
        const value = result.values[i];
        data.push({
          key: i,
          time: value[0],
          deviceName: value[1],
          msgType: value[3],
          address: `London, Park Lane no. ${i}`
        });
      }
      return data;
    }
    //beforeMount
    return {
      data,
      onSearch
    };
  },
  data() {
    return {
      value: '',
      columns
    };
  },
});
</script>

<style scoped>

</style>
