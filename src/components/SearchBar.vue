<!-- SearchBar.vue -->
<template>
    <div id="app">
      <GmapAutocomplete @place_changed="setPlace" :options="{fields: ['geometry', 'formatted_address', 'address_components', 'name']}"/>
      <button @click="search">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      place: '',
      tableData: [],
    }
    },
    methods: {


      setPlace(place) {
        if(!this.tableData.includes(place.name)){
          this.place = place;
          this.$emit('select-place', place);
          this.tableData.push(place.name);
        }else{
          console.log('setPlace duplicate');
        }

      },
      search() {
        if(!this.tableData.includes(this.place.name)){
          this.$emit('search', this.place);
          this.tableData.push(this.place.name);
        }else{
          console.log('Search duplicate');
        }

      }
    }
  };
  </script>
