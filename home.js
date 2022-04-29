window.onload = function () {
    new Vue({
        el: "#home",
        data: {
            search_form: {
                search_platform_name: [
                    {label: "百度", icon: "images/baidu_icon.png", value: 1},
                    {label: "Google", icon: "images/google_icon.png", value: 2},
                    {label: "今日头条", icon: "images/toutiao_icon.png", value: 3},
                    {label: "Bing", icon: "images/Bing_icon.png", value: 4},
                    {label: "稀土掘金", icon: "images/juejin_icon.svg", value: 5},
                ],
                select_content: 1,
                search_content: ""
            },
            weather_key: "7225c8b5119349b682a1e4c8f70be091"
        },
        methods: {
            searchSelectedChanged(val) {
                console.log(val)

            },
            onSearch(val) {
                if (this.search_form.select_content === 1) {
                    window.open("https://www.baidu.com/s?wd="+this.search_form.search_content, "_blank")
                }
                else if (this.search_form.select_content === 2) {
                    window.open("https://www.google.com.hk/search?q="+this.search_form.search_content, "_blank")
                }
                else if (this.search_form.select_content === 3) {
                    window.open("https://so.toutiao.com/search?dvpf=pc&keyword="+this.search_form.search_content, "_blank")
                }
                else if (this.search_form.select_content === 4) {
                    window.open("https://www.bing.com/search?q="+this.search_form.search_content, "_blank")
                }
                else if (this.search_form.select_content === 5) {
                    window.open("https://juejin.cn/search?utm_source=gold_browser_extension&query="+this.search_form.search_content, "_blank")
                }
            },
            onGetLocate(val) {
                axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key="+this.weather_key)
                    .then(function(result){
                        console.log(result.data)
                    })

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition);
                } else {
                    x.innerHTML = "该浏览器不支持获取地理位置。";
                }


            },
            showPosition(position) {
                x.innerHTML = "纬度: " + position.coords.latitude +
                    "<br>经度: " + position.coords.longitude;
            }
        },
    });
}