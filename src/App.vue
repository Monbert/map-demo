<template>
  <div id="app">
    <LocationButton/>
    <SearchBar @select-place="selectPlace" @search="search" />
    <MapView :places="selectedPlace" />
    <DataTable :places="selectedPlace" />
    <Test :places="selectedPlace"/>
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
      selectedPlace: null
    }
  },
  methods: {
    selectPlace(place) {
      this.selectedPlace = place;
    },
    search() {
      // do something when user clicks the search button
      console.log("hi")
      // console.log(this.selectedPlace.formatted_address);
    }
  }
};
</script>
