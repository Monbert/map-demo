<template>
  <!-- <div id="app" class="container">
    <LocationButton/>
    <SearchBar @select-place="selectPlace" @search="search" :tableData="dataHistory" />
    <MapView :places="selectedPlace" :tableData="dataHistory"/>
    <TimeZone :places="selectedPlace" />
    <DataTable :places="selectedPlace" @addTableData="addTableData" />
    <Test :places="selectedPlace" />
  </div> -->


  <div id="app" class="container">
    <h1 class="title">Map Demo</h1> <!-- 添加标题元素 -->
    <div class="border">
      <div class="flex-container">
        <div class="left-section">
          <LocationButton/>
          <SearchBar @select-place="selectPlace" @search="search" :tableData="dataHistory" />
          <MapView :places="selectedPlace" :tableData="dataHistory" class="map-view"/>
        </div>
        <div class="right-section">
          <DataTable :places="selectedPlace" @addTableData="addTableData" />
          <TimeZone :places="selectedPlace" />
        </div>
      </div>
    </div>
    <!-- <Test :places="selectedPlace" /> -->
  </div>


</template>

<script>
// import Gmap from './components/GoogleMap.vue';
// import Location from './components/SearchLocation.vue';
import LocationButton from './components/LocationButton.vue';
import SearchBar from './components/SearchBar.vue';
import MapView from './components/MapView.vue';
import TimeZone from './components/TimeZone.vue';
import DataTable from './components/DataTable.vue';
// import Test from './components/TestView.vue';


export default {
  components: {
    LocationButton,
    SearchBar,
    MapView,
    TimeZone,
    DataTable
    // Test
},
  data() {
    return {
      selectedPlace: null,
      dataHistory: [],

    }
  },
  methods: {
    selectPlace(place) {
      this.selectedPlace = place;
    },
    search() {
      console.log("doing search")
      this.selectedPlace = this.place;
    },
    addTableData(data) {
      // 执行添加数据到表格的操作，使用传递的data参数
      this.dataHistory=data;
    }
  }
};
</script>

<style>
/* 引入组件样式文件 */
@import './App.css';

html, body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
</style>

