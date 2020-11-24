<template>
  <a-input-search
    v-model:value="deviceName"
    placeholder="input search text"
    enter-button="Search"
    size="large"
    @search="onSearch(deviceName)"
  />
  <br />
  <a-range-picker
    :show-time="{ format: 'HH:mm' }"
    format="YYYY-MM-DD HH:mm"
    :placeholder="['Start Time', 'End Time']"
    @change="timeChange"
    @ok="onTimeOk"
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

export default defineComponent({
  name: "DataTable",
  setup(props) {
    const data: Array<any> = reactive([]);
    const timeChange = function(value: Date, dateString: string) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };
    const onTimeOk = function(value: any) {
      console.log("onOk: ", value);
    };
    const onSearch = async function(value: string) {
      const resp = await getData("dose", value);
      const results: Array<any> = resp.data.body.result;
      if (results == null) {
        data.length = 0;
        return data;
      }
      const result = results[0];
      data.length = 0;
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
    };
    return {
      data,
      onSearch,
      onTimeOk,
      timeChange
    };
  },
  data() {
    return {
      deviceName: "",
      columns
    };
  }
});
</script>

<style scoped></style>
