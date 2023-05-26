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
      place: ''
    }
    },
    methods: {
      setPlace(place) {
        this.place = place;
        this.$emit('select-place', place);
        // console.log(place.formatted_address);
      },
      search() {
        this.$emit('search', this.place);
        // console.log(this.place.formatted_address);
      }
    }
  };
  </script>
