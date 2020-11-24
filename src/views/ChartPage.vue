<template>
  <div id="test" style="width: 600px; height: 400px" />
</template>
<script lang="ts">
import echarts from "echarts";
import { defineComponent, h, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log("asf");
      const myChart = echarts.init(
        document.getElementById("test") as HTMLDivElement
      );
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    });
    return {};
  },
  data() {
    return {
      option: {
        /*...*/
      }
    };
  },
  methods: {
    doSomething() {
      //echarts.t.getWidth();   // 调用 ECharts 实例的方法
    }
  }
});
</script>
