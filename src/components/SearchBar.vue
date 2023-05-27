<!-- SearchBar.vue -->
<template>
    <div id="app">
      <GmapAutocomplete @place_changed="setPlace" :options="{fields: ['geometry', 'formatted_address', 'address_components', 'name']}"/>
      <button @click="search">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['tableData'],


    data() {
    return {
      place: '',
      searchHistory: [],
    }
    },

    watch: {
      tableData(data) {
        this.searchHistory = data;
      }
    },

    methods: {

      setPlace(place) {
        // console.log("Add table dataaaaa:", this.searchHistory);
        if(!this.searchHistory.some(item => item.search === place.name)){
          this.place = place;
          this.$emit('select-place', place);
          // this.tableData.push(place.name);
        }else{
          console.log('setPlace duplicate');
        }

      },
      search() {
        if(!this.searchHistory.some(item => item.search === this.place.name)){
          this.$emit('search', this.place);
          // this.tableData.push(this.place.name);
        }else{
          console.log('Search duplicate');
        }

      }
    }
  };
  </script>
