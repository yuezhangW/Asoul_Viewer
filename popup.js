$(document).ready(function () {
    $.ajax({
        url:"http://39.96.25.169:8080/dynamic/newest_scheduler",
        type:'GET',
        dataType:'json',
        success: function (result) {
            $('#dynamicText').text(result.descText)
            for (var i = 0; i < result.imageUrlList.length; i ++) {
                $('#dynamicImages').append(
                    '<img src="'+result.imageUrlList[i].url+'"class="dynamic-images" id="dynamicImage'+i+'"/>'
                );
                $('#dynamicImage'+i).click(function () {
                   console.log(this.src);
                   var newTab = window.open(this.src, '_blank');
                });
                $('#dynamicPublishTime').text('发布时间：'+result.publishTime);
                $('#dynamicHref').attr('href', 'https://t.bilibili.com/'+result.id+'?tab=2')
            }
        }
    })

})

