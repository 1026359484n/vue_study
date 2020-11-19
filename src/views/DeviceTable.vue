<template>
  <a-form
    layout="inline"
    :model="params"
    @submit="onSearch(params)"
    @submit.prevent
  >
    <a-form-item>
      <a-input v-model:value="params.deviceName" placeholder="deviceName" />
    </a-form-item>
    <a-form-item label="设备类型">
      <a-checkbox-group v-model:value="params.type">
        <a-checkbox value="REAL_ALL" name="type"> 双模版 </a-checkbox>
        <a-checkbox value="REAL_BLUETOOTH_ONLY" name="type">
          蓝牙版
        </a-checkbox>
        <a-checkbox value="CODE_VIRTUAL" name="type"> 编码设备 </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="params.deviceName === ''"
      >
        Search
      </a-button>
    </a-form-item>
  </a-form>
  <a-input-search
    v-model:value="deviceName"
    placeholder="input search text"
    enter-button="Search"
    size="large"
    @search="onSearch({ deviceName: deviceName })"
  />
  <br /><br />
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :pagination="pagination"
    :loading="loading"
    @change="handleChange"
  >
  </a-table>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { deviceList, DeviceQo } from "@/api/device";
import { Pagination } from "@/model/pagination";
const columns = [
  {
    title: "deviceName",
    dataIndex: "deviceName",
    width: "25%",
    slots: { customRender: "deviceName" }
  },
  {
    title: "username",
    dataIndex: "username",
    width: "15%",
    slots: { customRender: "username" }
  },
  {
    title: "companyName",
    dataIndex: "companyName",
    width: "40%",
    slots: { customRender: "companyName" }
  },
  {
    title: "operation",
    dataIndex: "operation",
    slots: { customRender: "operation" }
  }
];
interface Device {
  deviceName: string;
  username: string;
  companyName: string;
}
export default defineComponent({
  setup() {
    const params: DeviceQo = reactive<DeviceQo>({
      paged: true,
      doseMsgNeeded: false,
      queryAll: true,
      orderCol: "deviceName",
      pageSize: 20,
      pageNum: 1,
      direction: "asc",
      deviceName: null,
      type: []
    });
    const pagination: Pagination = reactive({
      total: 20,
      pageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "40"],
      showTotal: (total: number) => `共 ${total} 条`,
      current: 1
    });
    const loading = ref<boolean>(false);
    const data: Array<any> = reactive([]);
    const onSearch = async (qo: DeviceQo | { deviceName: string|null }) => {
      params.deviceName = qo.deviceName;
      params.pageNum = 1;
      const resp = await deviceList(params);
      const devices: Array<any> = resp.data.body.devices;
      data.length = 0;
      for (let i = 0; i < devices.length; i++) {
        devices[i].key = i;
        data.push(devices[i]);
      }
      pagination.total = resp.data.body.total;
    };
    const handleChange = async (
      page: Pagination,
      sorter: any,
      filters: any
    ) => {
      loading.value = true;
      pagination.current = page.current;
      pagination.pageSize = page.pageSize;
      params.pageSize = page.pageSize;
      params.pageNum = page.current;
      const resp = await deviceList(params);
      const devices: Array<any> = resp.data.body.devices;
      data.length = 0;
      for (let i = 0; i < devices.length; i++) {
        devices[i].key = i;
        data.push(devices[i]);
      }
      pagination.total = resp.data.body.total;
      loading.value = false;
    };
    onMounted(async () => {
      onSearch({ deviceName: null });
    });
    const cacheData = data.map((item) => ({ ...item }));
    return {
      params,
      data,
      cacheData,
      pagination,
      loading,
      handleChange,
      onSearch
    };
  },
  components: {
    //pagination
  },
  data() {
    return {
      deviceName: "",
      columns,
      editingKey: ""
    };
  },
  methods: {}
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
