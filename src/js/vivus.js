new Vivus(
	'my-svg',
	{
			type: "delayed",
			duration: 300,
			start: "autostart",
			animTimingFunction: Vivus.EASE
	},
	function () {
			const pathElement = document.querySelector("#my-svg path");
			if (pathElement) {
					pathElement.setAttribute("fill", "#F9FAFF");
			}
	}
);