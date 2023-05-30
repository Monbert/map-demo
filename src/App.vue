<template>
  <div id="app" class="container">
    <h1 class="title">Map Demo</h1>
    <div class="border">
      <div class="flex-container">
        <div class="left-section">
          <LocationButton @cur-location="setCurLocation" />
          <SearchBar @select-place="selectPlace" :tableData="dataHistory" />
          <MapView :places="selectedPlace" :tableData="dataHistory" :currLocation="curLocation" class="map-view" />
        </div>
        <div class="right-section">
          <DataTable :places="selectedPlace" @addTableData="addTableData" :currLocation="curLocation" />
          <TimeZone :places="selectedPlace" :currLocation="curLocation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationButton from './components/LocationButton.vue';
import SearchBar from './components/SearchBar.vue';
import MapView from './components/MapView.vue';
import TimeZone from './components/TimeZone.vue';
import DataTable from './components/DataTable.vue';


export default {
  components: {
    LocationButton,
    SearchBar,
    MapView,
    TimeZone,
    DataTable
  },
  data() {
    return {
      selectedPlace: null,
      dataHistory: [],
      curLocation: ''
    }
  },

  methods: {
    selectPlace(place) {
      this.selectedPlace = place;
    },

    addTableData(data) {
      this.dataHistory = data;
    },

    setCurLocation(curlocation) {
      this.curLocation = curlocation;
    }
  }
};
</script>

<style>
@import './App.css';

html,
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
</style>

