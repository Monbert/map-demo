<!-- MapView.vue -->
<template>
    <GmapMap 
            :center="center" 
            :zoom="zoom"
            style="width: 100%; height: 500px;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :icon="{url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}"
        @click="center=m.position"
      />
    </GmapMap>
  </template>
  
  <script>
  export default {
    props: ['places'],
    // props:{
    //   places: {
    //     type: Object,
    //     required: true
    //   }
    // },

    data() {
      return {
        center: { lat: 43.748, lng: -79.289 },
        zoom: 11,
        markers: []
      }
    },
    watch: {
      places(place) {
        if (place) {
          // console.log(place.formatted_address);
          const position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          this.markers.push({ position });
          this.center = position;
        }
      }
    }
  };
  </script>
  