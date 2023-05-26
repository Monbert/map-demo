<template>
    <div id="app">
        <input type="text" v-model="searchLocation" @keyup.enter="search">
        <button @click="search">Search</button>
        <button @click="getCurrentLocation">Get Current Location</button>

        <!-- Google map component -->
        <GmapMap 
            :center="{ lat: 45.323877317505506, lng:  -75.59093136042722 }" 
            :zoom="10"
            style="width: 100%; height: 500px;"
        >
            <!-- <GmapMarker v-for="(location, index) in locations" 
                :key="index" 
                :position="location.position"
                :clickable="true"
                :draggable="true"
                @click="center = location.position" 
            /> -->
        </GmapMap>


        <!-- locations table with pagination -->
        <!-- <v-data-table :headers="headers" :items="displayedLocations" :items-per-page="10" class="elevation-1">
            <template v-slot:item="{ item }">
                <v-checkbox v-model="selectedLocations" :value="item"></v-checkbox>
            </template>
        </v-data-table> -->

        <!-- delete button -->
        <!-- <v-btn @click="deleteSelectedLocations">Delete Selected Locations</v-btn> -->

        <!-- timezone and local time of the latest searched location -->
        <!-- <p>Timezone: {{ latestLocation.timezone }}</p>
        <p>Local Time: {{ latestLocation.localTime }}</p> -->


    </div>
</template>
  
<script>
export default {
    data() {
        return {
            // searchLocation: "",
            // locations: [],
            // mapCenter: { lat: 0, lng: 0 }
        };
    },
    methods: {
        async search() {
            // to be implemented
        },
        getCurrentLocation() {
            // Use the browser's Geolocation API to get the current location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.result = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                });
            } else {
                this.result = "Geolocation is not supported by this browser.";
            }
        }
    }
};
</script>
  