<template>
  <div id="app">
    <LocationButton/>
    <SearchBar @select-place="selectPlace" @search="search" :tableData="dataHistory" />
    <MapView :places="selectedPlace" :tableData="dataHistory"/>
    <DataTable :places="selectedPlace" />
    <Test :places="selectedPlace" @addTableData="addTableData"/>
  </div>
</template>

<script>
// import Gmap from './components/GoogleMap.vue';
// import Location from './components/SearchLocation.vue';
import LocationButton from './components/LocationButton.vue';
import SearchBar from './components/SearchBar.vue';
import MapView from './components/MapView.vue';
import DataTable from './components/DataTable.vue';
import Test from './components/TestView.vue';


export default {
  components: {
    LocationButton,
    SearchBar,
    MapView,
    DataTable,
    Test
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
