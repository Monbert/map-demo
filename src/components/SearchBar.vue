<!-- SearchBar.vue -->
<template>
    <div id="app">
      <div class="flex-container">
        <GmapAutocomplete @place_changed="setPlace" :options="{fields: ['geometry', 'formatted_address', 'address_components', 'name']}" class="autocomplete"/>
        <!-- <button @click="search">Search</button> -->
        <el-button type="primary" icon="el-icon-search" @click="search">Search</el-button>
      </div>
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


<style>
.autocomplete {
  width: 250px; /* 设置宽度 */
  height: 36px; /* 设置高度 */
  margin-right: 5px;
  border-radius: 4px;
  border-width: 1px;
}
</style>