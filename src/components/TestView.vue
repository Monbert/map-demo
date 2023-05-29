<template>
  <div>
    <p>Latest searched location: {{ latestSearchLocation }}</p>
    <p>Timezone: {{ timezone }}</p>
    <p>Local Time: {{ localTime }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['places'],

  data() {
    return {
      latestSearchLocation: '',
      timezone: '',
      localTime: ''
    };
  },

  watch: {
    places(place) {
      if (place && place.geometry) {
        this.latestSearchLocation = place.name;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        this.getLocalTime(lat, lng);
      } else {
        console.log('Cant find the place');
      }
    }
  },

  methods: {
    async getLocalTime(lat, lng) {
      const timestamp = Math.floor((new Date()).getTime() / 1000); 
      const GMAP_API_KEY = 'AIzaSyC4u2ztHcOHet-8iqRQ_9JC91LyaWY0m9Y';
      const response = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=${GMAP_API_KEY}`);
      
      if (response.data.status === 'OK') {
        const timeZoneId = response.data.timeZoneId;
        this.timezone = response.data.timeZoneName;
        // const offsets = response.data.dstOffset * 1000 + response.data.rawOffset * 1000;
        // const localTimestamp = timestamp * 1000 + offsets;
        const curTime= new Date(timestamp * 1000);
        this.localTime = curTime.toLocaleString('en-US',{timeZone: timeZoneId});
      } else {
        console.error('Error fetching timezone data:', response.data);
      }
    }
  }

}
</script>
