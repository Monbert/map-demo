<template>
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(place, index) in paginatedPlaces" :key="index">
            <td><input type="checkbox" v-model="selectedPlaces" :value="place" /></td>
            <td>{{ place.name }}</td>
            <td>{{ place.address }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="deleteSelectedPlaces">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    // props: {
    //   place: {
    //     type: Object,
    //     required: true
    // }
    // },
    props: ['places'],
    data() {
      return {
        selectedPlaces: [],
        currentPage: 1,
        pageSize: 10
      };
    },
    computed: {
      paginatedPlaces() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.places.slice(startIndex, endIndex);
      }
    },
    methods: {
      deleteSelectedPlaces() {
        this.selectedPlaces.forEach(place => {
          // 删除地点的相关操作，比如删除对应的标记等
          // ...
        });
        // 清空选中的地点列表
        this.selectedPlaces = [];
      }
    }
  };
  </script>
  