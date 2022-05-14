var selectedSearchTool;
var selectedKeywordCommand;
$(document).ready(function () {
    $('#asoulDynamicBox').css('height', $(window).height()-280)
    $('#articlesBox').css('height', $(window).height()-540)
    $('#asoulMasterBox').css('height', $(window).height()-410)
    $('#scheduleMask').css('height', $(window).height())
    $('#select-mask').css('height', $(window).height())
    $('#search').css('left', $(window).width()/2 - $('#navList').width() - $('#titleIcon').width() - $('#search').width())
    $(window).resize(function () {
        $('#asoulDynamicBox').css('height', $(window).height()-280)
        $('#articlesBox').css('height', $(window).height()-540)
        $('#asoulMasterBox').css('height', $(window).height()-410)
        $('#scheduleMask').css('height', $(window).height())
        $('#select-mask').css('height', $(window).height())
        $('#search').css('left', $(window).width()/2 - $('#navList').width() - $('#titleIcon').width() - $('#search').width())
    })
})
$(document).ready(function () {
    chrome.storage.local.get(['searchTool'], function (res) {
        if ($.isEmptyObject(res)) {
            selectedSearchTool = 'baidu'
        } else {
            selectedSearchTool = res['searchTool']
        }
        switch (selectedSearchTool) {
            case ("baidu"):
                $('#searchToolImage').attr('src', 'images/baidu_icon.png')
                break
            case ("bing"):
                $('#searchToolImage').attr('src', 'images/Bing_icon.png')
                break
            case ("google"):
                $('#searchToolImage').attr('src', 'images/google_icon.png')
                break
            case ("toutiao"):
                $('#searchToolImage').attr('src', 'images/toutiao_icon.png')
                break
        }
    })
    $('#searchToolSelectedBtn').on('click', function () {
        $('#select-mask').show()
        $('#select-form').show(500)
        var $selectedItem
        switch (selectedSearchTool) {
            case ("baidu"):
                initSearchToolForm()
                $selectedItem = $('#search-baidu')
                $('#search-baidu').addClass('itemSelected')
                $('#search-baidu > i').removeClass('hidden')
                break
            case ("bing"):
                initSearchToolForm()
                $selectedItem = $('#search-bing')
                $('#search-bing').addClass('itemSelected')
                $('#search-bing > i').removeClass('hidden')
                break
            case ("google"):
                initSearchToolForm()
                $selectedItem = $('#search-google')
                $('#search-google').addClass('itemSelected')
                $('#search-google > i').removeClass('hidden')
                break
            case ("toutiao"):
                initSearchToolForm()
                $selectedItem = $('#search-toutiao')
                $('#search-toutiao').addClass('itemSelected')
                $('#search-toutiao > i').removeClass('hidden')
                break
        }
    })
    $('#select-mask').click(function () {
        $('#select-mask').hide()
        $('#select-form').hide()
    })
    $('.searchToolItem').click(function () {
        switch (this.id) {
            case ("search-baidu"):
                selectedSearchTool = 'baidu'
                break
            case ("search-bing"):
                selectedSearchTool = 'bing'
                break
            case ("search-google"):
                selectedSearchTool = 'google'
                break
            case ("search-toutiao"):
                selectedSearchTool = 'toutiao'
                break
        }
        chrome.storage.local.set({'searchTool': selectedSearchTool}, function () {})
        switch (selectedSearchTool) {
            case ("baidu"):
                $('#searchToolImage').attr('src', 'images/baidu_icon.png')
                break
            case ("bing"):
                $('#searchToolImage').attr('src', 'images/Bing_icon.png')
                break
            case ("google"):
                $('#searchToolImage').attr('src', 'images/google_icon.png')
                break
            case ("toutiao"):
                $('#searchToolImage').attr('src', 'images/toutiao_icon.png')
                break
        }
        $('#select-mask').hide()
        $('#select-form').hide()
    })
    $('#searchStartBtn').click(function () {
        startSearch()
    })
    $(document).keyup(function (e) {
        if (e.keyCode === 13) {
            startSearch()
        }
    })

});

function startSearch() {
    switch (selectedSearchTool) {
        case ("baidu"):
            window.open("https://www.baidu.com/s?wd="+$('#searchInput').val(), 'blank')
            break
        case ("bing"):
            window.open("https://www.bing.com/search?q="+$('#searchInput').val(), 'blank')
            break
        case ("google"):
            window.open("https://www.google.com/search?q="+$('#searchInput').val(), 'blank')
            break
        case ("toutiao"):
            window.open("https://so.toutiao.com/search?dvpf=pc&keyword="+$('#searchInput').val(), 'blank')
            break
    }
}

$(document).ready(function () {
    chrome.storage.local.get(['commandKeyword'], function (res) {
        if ($.isEmptyObject(res)) {
            selectedKeywordCommand = 'asoul'
        } else {
            selectedKeywordCommand = res['commandKeyword']
        }
        initCommandSelectForm();
        updateCommandList();
    })
    $('#keywordSelectBox').change(function () {
        selectedKeywordCommand = $(this).val();
        chrome.storage.local.set({'commandKeyword': selectedKeywordCommand}, function () {})
        updateCommandList();
    })

})

function updateCommandList() {
    $.ajax({
        url:"http://39.96.25.169:8080/video/searchedVideos/"+selectedKeywordCommand,
        type:'GET',
        dataType:'json',
        success: function (result) {
            $('#asoulMasterList').children().remove();
            for (var i = 0; i < result.length; i ++) {
                $('#asoulMasterList').append(
                    '<li></li>'
                );
                $('#asoulMasterList > li:eq(-1)').append(
                    '<a class="asoul-master-item" href="'+result[i].url+'" target="_blank">'
                )
                $('#asoulMasterList > li:eq(-1) > a').append(
                    '<img src="https:'+result[i].picUrl+'">'
                )
                $('#asoulMasterList > li:eq(-1) > a').append(
                    '<div class="asoul-master-item-content"></div>'
                )
                $('#asoulMasterList > li:eq(-1) > a > div').append(
                    $.format('<span>{0}</span>', result[i].title)
                )
                $('#asoulMasterList > li:eq(-1) > a > div').append(
                    '<div class="asoul-master-item-author">'+result[i].authorNickname+'</div>'
                )
                $('#asoulMasterList > li:eq(-1) > a > div').append(
                    '<div class="asoul-master-item-about">'+result[i].play+'播放 · '+result[i].pubDate.substring(0, 10) +'</div>'
                )
            }
        }
    })
}

$(document).ready(function () {
    $.ajax({
        url:"http://39.96.25.169:8080/dynamic/new_cards",
        type:'GET',
        dataType:'json',
        success: function (result) {
            $('#asoulDynamicList').children().remove();
            for (var i = 0; i < result.length; i ++) {
                $('#asoulDynamicList').append(
                    '<li></li>'
                );
                $('#asoulDynamicList > li:eq(-1)').append(
                    $.format('<a class="asoul-dynamic-item" target="_blank" href="https://t.bilibili.com/{0}"></a>', result[i].id)
                )
                $('#asoulDynamicList > li:eq(-1) > a').append(
                    '<div class="asoul-dynamic-item-content"></div>'
                )
                var descText;
                if (result[i].dynamicType === 'DYNAMIC_TYPE_ARTICLE') {
                    descText = $.parseJSON(result[i].articleJSON).desc
                } else {
                    descText = result[i].descText
                }
                $('#asoulDynamicList > li:eq(-1) > a > div').append(
                    $.format('<span title="{0}">{0}</span>', descText)
                )
                $('#asoulDynamicList > li:eq(-1) > a > div').append(
                    '<div class="asoul-dynamic-item-description"></div>'
                )
                var dynamicType
                var dynamicIcon
                switch (result[i].dynamicType) {
                    case ('DYNAMIC_TYPE_ARTICLE'):
                        dynamicType = '小作文'
                        dynamicIcon = 'layui-icon-read'
                        break
                    case ('DYNAMIC_TYPE_FORWARD'):
                        dynamicType = '转载'
                        dynamicIcon = 'layui-icon-release'
                        break
                    case ('DYNAMIC_TYPE_DRAW'):
                        dynamicType = '图文'
                        dynamicIcon = 'layui-icon-picture'
                        break
                    case ('DYNAMIC_TYPE_WORD'):
                        dynamicType = '闲聊'
                        dynamicIcon = 'layui-icon-dialogue'
                        break
                }
                $('#asoulDynamicList > li:eq(-1) > a > div > div').append(
                    $.format('<div style="display: flex">' + '<i class="layui-icon {0}" style="margin-right: 3px"></i>', dynamicIcon)
                    +$.format('<div class="asoul-dynamic-item-description-type">动态类型: {0}</div>', dynamicType)
                    +'</div>'
                )
                $('#asoulDynamicList > li:eq(-1) > a > div > div').append(
                    $.format('<div class="asoul-dynamic-item-description-pubdate"> {0}</div>', result[i].publishTime)
                )
            }
        }
    })
})

$(document).ready(function () {
    $('#scheduleBox').click(function () {
        $('#scheduleMask').show()
        $('#schedulePage').show(500)
    })
    $('#scheduleMask').click(function () {
        $('#scheduleMask').hide()
        $('#schedulePage').hide(500)
    })
})

$(document).ready(function () {
    $.ajax({
        url: "http://39.96.25.169:8080/live/status",
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            if (result.xiangwan === "0") {
                $('#xiangwanStatus > a > div > img').css('border-color', "#FFFFFF")
                $('#xiangwanStatus > div').text("未开播")
            } else if (result.xiangwan === "1") {
                $('#xiangwanStatus > a > div > img').css('border-color', "#00FF00")
                $('#xiangwanStatus > div').text("直播中")
            } else {
                $('#xiangwanStatus > a > div > img').css('border-color', "#FFCE00")
                $('#xiangwanStatus > div').text("轮播中")
            }

            if (result.beila === "0") {
                $('#beilaStatus > a > div > img').css('border-color', "#FFFFFF")
                $('#beilaStatus > div').text("未开播")
            } else if (result.beila === "1") {
                $('#beilaStatus > a > div > img').css('border-color', "#00FF00")
                $('#beilaStatus > div').text("直播中")
            } else {
                $('#beilaStatus > a > div > img').css('border-color', "#FFCE00")
                $('#beilaStatus > div').text("轮播中")
            }

            if (result.jiale === "0") {
                $('#jialeStatus > a > div > img').css('border-color', "#FFFFFF")
                $('#jialeStatus > div').text("未开播")
            } else if (result.jiale === "1") {
                $('#jialeStatus > a > div > img').css('border-color', "#00FF00")
                $('#jialeStatus > div').text("直播中")
            } else {
                $('#jialeStatus > a > div > img').css('border-color', "#FFCE00")
                $('#jialeStatus > div').text("轮播中")
            }

            if (result.jiaran === "0") {
                $('#jiaranStatus > a > div > img').css('border-color', "#FFFFFF")
                $('#jiaranStatus > div').text("未开播")
            } else if (result.jiaran === "1") {
                $('#jiaranStatus > a > div > img').css('border-color', "#00FF00")
                $('#jiaranStatus > div').text("直播中")
            } else {
                $('#jiaranStatus > a > div > img').css('border-color', "#FFCE00")
                $('#jiaranStatus > div').text("轮播中")
            }

            if (result.nailin === "0") {
                $('#nailinStatus > a > div > img').css('border-color', "#FFFFFF")
                $('#nailinStatus > div').text("未开播")
            } else if (result.nailin === "1") {
                $('#nailinStatus > a > div > img').css('border-color', "#00FF00")
                $('#nailinStatus > div').text("直播中")
            } else {
                $('#nailinStatus > a > div > img').css('border-color', "#FFCE00")
                $('#nailinStatus > div').text("轮播中")
            }
        }
    })
})

$(document).ready(function () {
    $.ajax({
        url:"http://39.96.25.169:8080/article/all",
        type:'GET',
        dataType:'json',
        success: function (result) {
            console.log(result)
            for (var i = 0; i < result.length; i ++) {
                $('#articleList').append(
                    '<li></li>'
                );
                var imgUrl
                imgUrl = "https:" + result[i].imgUrl.split('"')[1]
                $('#articleList > li:eq(-1)').append(
                    $.format('<a class="article-item" target="_blank" href="{0}"></a>', "https://www.bilibili.com/read/cv"+result[i].id)
                )
                $('#articleList > li:eq(-1) > a').append(
                    $.format('<img src="{0}">', imgUrl)
                )
                $('#articleList > li:eq(-1) > a').append(
                    $.format('<div class="article-item-content"></div>')
                )
                $('#articleList > li:eq(-1) > a > div').append(
                    $.format(
                        '<span class="article-item-content-title">{0}</span>' +
                        '<span class="article-item-content-status">{1} · {2}观看 · {3}点赞 · {4}条评论</span>' +
                        '<span class="article-item-content-text">{5}</span>' +
                        '<span class="article-item-content-up"><i class="layui-icon layui-icon-log" style="font-size: 12px"> {6}</span>',result[i].title, result[i].categoryName, result[i].view, result[i].like, result[i].reply, result[i].desc, result[i].publishTime
                    )
                )
            }
        }
    })
})

function initCommandSelectForm() {
    $('#keywordCommand_asoul').attr('selected', false)
    $('#keywordCommand_jiale').attr('selected', false)
    $('#keywordCommand_jiaran').attr('selected', false)
    $('#keywordCommand_xiangwan').attr('selected', false)
    $('#keywordCommand_beila').attr('selected', false)
    $('#keywordCommand_nailin').attr('selected', false)
    switch (selectedKeywordCommand) {
        case ("asoul"):
            $('#keywordCommand_asoul').attr('selected', true)
            break
        case ("珈乐"):
            $('#keywordCommand_jiale').attr('selected', true)
            break
        case ("嘉然"):
            $('#keywordCommand_jiaran').attr('selected', true)
            break
        case ("向晚"):
            $('#keywordCommand_xiangwan').attr('selected', true)
            break
        case ("贝拉"):
            $('#keywordCommand_beila').attr('selected', true)
            break
        case ("乃琳"):
            $('#keywordCommand_nailin').attr('selected', true)
            break
    }
}

function initSearchToolForm() {
    $('#search-baidu').removeClass('itemSelected')
    $('#search-baidu > i').addClass('hidden')

    $('#search-bing').removeClass('itemSelected')
    $('#search-bing > i').addClass('hidden')

    $('#search-google').removeClass('itemSelected')
    $('#search-google > i').addClass('hidden')

    $('#search-toutiao').removeClass('itemSelected')
    $('#search-toutiao > i').addClass('hidden')
}

$.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};


