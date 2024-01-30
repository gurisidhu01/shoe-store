TweenLite.defaultEase = Linear.easeNone;

var picker = document.querySelector(".product-carousel");
var cells = document.querySelectorAll(".card");
var proxy = document.createElement("div");

var cellWidth = 210;

var numCells = cells.length;
var cellStep = 1 / numCells;
var wrapWidth = cellWidth * numCells;

var baseTl = new TimelineMax({ paused: true });

TweenLite.set(picker, {
	width: wrapWidth - cellWidth
});

for (var i = 0; i < cells.length; i++) {
	initCell(cells[i], i);
}

var animation = new TimelineMax({ repeat: -1, paused: true }).add(
	baseTl.tweenFromTo(1, 2)
);

var draggable = new Draggable(proxy, {
	allowContextMenu: true,
	type: "x",
	trigger: picker,
	throwProps: true,
	onDrag: updateProgress,
	onThrowUpdate: updateProgress,
	snap: {
		x: snapX
	}
});

function snapX(x) {
	return Math.round(x / cellWidth) * cellWidth;
}

function updateProgress() {
	animation.progress(this.x / wrapWidth);
}

function initCell(element, index) {
	TweenLite.set(element, {
		width: cellWidth,
		scale: 0.6,
		x: -cellWidth
	});
	TweenLite.set($(element).find(".img img"), {
		rotation: 45
	});
	var tl = new TimelineMax({ repeat: 1 })
		.to(element, 1, { x: "+=" + wrapWidth }, 0)
		.to(
			$(element).find(".img img"),
			cellStep,
			{ rotation: 0, repeat: 1, yoyo: true },
			0.5 - cellStep
		)
		.to(element, cellStep, { scale: 1, repeat: 1, yoyo: true }, 0.5 - cellStep);

	baseTl.add(tl, i * -cellStep);
}

$(".category").on("click", function () {
	$(".category").removeClass("active");
	$(this).addClass("active");
});