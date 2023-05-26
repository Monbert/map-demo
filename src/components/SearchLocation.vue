<template>
    <div>
        <!-- 获取当前位置的按钮 -->
        <button @click="getCurrentLocation">Get Current Location</button>

        <!-- 搜索栏 -->
        <div>
            <input type="text" v-model="searchTerm" @keyup.enter="searchLocation" placeholder="Enter location name" />
            <button @click="searchLocation">Search</button>
        </div>

        <!-- 显示结果 -->
        <p>{{ result }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchTerm: '',
            result: '',
        };
    },
    methods: {
        getCurrentLocation() {
            // 使用浏览器的Geolocation API获取当前位置
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.result = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                });
            } else {
                this.result = "Geolocation is not supported by this browser.";
            }
        },
        searchLocation() {
            // 这里我们暂时仅使用搜索词更新结果，你可以使用你喜欢的地理位置搜索API来实现真正的搜索功能
            this.result = `Search for: ${this.searchTerm}`;
        },
    },
};
</script>
  