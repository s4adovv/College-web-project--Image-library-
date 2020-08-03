const dir = 'Photos/';
const JSONkeys = {
	idKey : 'ИД',
	nameKey : 'Название',
	dateKey : 'Дата создания',
	ratingKey : 'Рейтинг',
	authorKey : 'Автор',
	commentKey : 'Комментарий',
	imgKey : 'Файл'
};

data = jQuery.parseJSON(data);

for (var i = 0; i < 3; i++) {
	var index = Math.round(seedRandom(new Date(Date.now()).getDay() + i)  * (data.length - 1));
	$(".weekImages").append("<img src='" +
						dir + data[index][JSONkeys.imgKey] +
						"' title='Название: " + data[index][JSONkeys.nameKey] +
						" Автор: "  + data[index][JSONkeys.authorKey] +
						" Дата создания: "  + data[index][JSONkeys.dateKey] +
						" Рейтинг: " + data[index][JSONkeys.ratingKey] +
						"'>");
}

for (var index in data) {
	$("#images").append("<img class='image' src='" +
						dir + data[index][JSONkeys.imgKey] +
						"' ID='" + data[index][JSONkeys.idKey] +
						"' name='" + data[index][JSONkeys.nameKey] +
						"' date='" + data[index][JSONkeys.dateKey] +
						"' raiting='" + data[index][JSONkeys.ratingKey] +
						"' author='" + data[index][JSONkeys.authorKey] +
						"' comment='" + data[index][JSONkeys.commentKey] +
						"' title='Название: " + data[index][JSONkeys.nameKey] +
						" Автор: "  + data[index][JSONkeys.authorKey] +
						" Дата создания: "  + data[index][JSONkeys.dateKey] +
						" Рейтинг: " + data[index][JSONkeys.ratingKey] +
						"'>");
}

function seedRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function closeImage(closeSpeed) {
	$("#openImage").animate({
		height: "0"
	}, closeSpeed, function() {
		$("#openImage").css("display", "none");
		$("footer").removeAttr("style");
		$("#openImage").removeAttr("style");
	});
	$("#openImage>div:last").attr("imgID", "");
}

$(window).scroll(function() {
	if ($(this).scrollTop() > 200 && !$("html, body").is(":animated")) {
		$(".scrollTop").css({width: "5%", opacity: "1"});
	} else {
		$(".scrollTop").css({width: "0", opacity: "0"});
	}
});

$(".scrollTop").click(function() {
	if ($("html, body").is(":animated")) return;
	if	(top != 0) {
		closeImage(100);
		$("html, body").stop().animate({
			scrollTop: 0
		}, 300);
	}
});

$("#close").click(function() {
	closeImage(500);
});

$(".image").click(function() {
	if ($("#openImage>div:last").attr("imgID") === $(this).attr("ID")) {
		closeImage(500);
		return;
	}
	$("#openImage>div:last").attr("imgID", $(this).attr("ID"));
	$("#openImage").offset({top: $(this).offset().top + 160});
	$("#openImage>h1").html($(this).attr("name"));
	$("#openImage>h2").html("Автор: " + $(this).attr("author"));
	$("#dateText").html("Дата создания: " + $(this).attr("date"));
	$("#raitingText").html("Рейтинг: " + $(this).attr("raiting"));
	$("#openImage>p").html($(this).attr("comment"));
	$("#openImage>img").attr("src", $(this).attr("src"));
	$("#openImage>p").css("display", $(this).attr("comment") === "" ? "none" : "block");
	$("#openImage>img").css("margin-bottom", $(this).attr("comment") === "" ? "50px" : "0");
	
	$("#openImage").css("display", "block");
	$("#openImage").css("height", "0");
	$("#openImage").stop();
	var newHeight = $("#openImage>div:last").offset().top - $("#openImage").offset().top;
	$("#openImage").animate({
		height: newHeight + "px"
	}, 500);
	if ($("#openImage").offset().top + newHeight > $(".image:last").offset().top + 180) {
		$("footer").removeAttr("style");
		$("footer").offset({top: $("#openImage").offset().top + newHeight + 20});
	} else {
		$("footer").removeAttr("style");
	}
});

$(".menu>input").click(function() {
	$(".page.selected").removeClass("selected");
	$($(".container").children('.page')[parseInt($(this).attr('id').substr(3)) - 1]).addClass("selected");
	closeImage(0);
});

var howSort = 1;
var whatSort = 0;
var whatSortTxts = ["по умолчанию", "по названию", "по дате", "по рейтингу"];
$(".sortBtn").click(function () {
	closeImage(0);
	if ($(this).attr('id') === "howSortBtn") {
		howSort = -howSort;
		$(this).html(howSort === 1 ? "Сортировка по возрастанию" : "Сортировка по убыванию");
	} else {
		whatSort = (++whatSort) % 4;
		$(this).html("Сортировка " + whatSortTxts[whatSort]);
	}
	var images = $('#images').children('img').get();
	images.sort(function(f, s) {
		var fEl = whatSort === 0 ? parseInt($(f).attr('ID')) : (whatSort === 1 ? $(f).attr('name') : (whatSort === 2 ? Date.parse($(f).attr('date').split('.')[2], $(f).attr('date').split('.')[1], $(f).attr('date').split('.')[0]) : $(f).attr('raiting')));
		var sEl = whatSort === 0 ? parseInt($(s).attr('ID')) : (whatSort === 1 ? $(s).attr('name') : (whatSort === 2 ? Date.parse($(s).attr('date').split('.')[2], $(s).attr('date').split('.')[1], $(s).attr('date').split('.')[0]) : $(s).attr('raiting')));
		return (fEl < sEl) ? -howSort : (fEl > sEl) ? howSort : 0;
	});
	$.each(images, function(index, item) {$('#images').append(item);$(item).addClass('flipImage');});
});