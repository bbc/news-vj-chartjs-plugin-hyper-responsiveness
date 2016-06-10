# Hyper Responsive Charts
Enables chartjs config alterations at specified viewports. Used to visually optimise charts for mobile and tablet devices.

## Prerequisites
This plugin relies on v2.1.5 version of Charts.js which as of 10/6/2016 is pending release.  You can get the pre-release version of Chart.js from the [Chart.js repository](https://github.com/chartjs/Chart.js). A working version has been included in this repo.

Specifically the notify plugin event on resize [feature](https://github.com/chartjs/Chart.js/blob/d9c335c860483faac7dbbcd60aa84e74cfbd3e3b/src/core/core.controller.js#L100) is required.

## Configuration
Add the following objects to the chart config options.
- `responsive: true`
- `responsiveBreakPointConfig`

Use the following as an example, alternatively see it working on [codepen](http://codepen.io/PatrickAsare/pen/wWKROY):

```javascript
window.myBar = new Chart(ctx, {
	type: 'bar',
	data: barChartData,
	options: {
		elements: {
			rectangle: {
				borderWidth: 2,
				borderColor: 'rgb(0, 255, 0)',
				borderSkipped: 'bottom'
			}
		},
		responsive: true,
		responsiveBreakPointConfig: {
			defaultConfig: function(config) {
				config.data.labels = ["January", "February", "March", "April", "May", "June", "July"];
				config.data.datasets = [{
					label: 'Dataset 1',
					backgroundColor: "rgba(220,220,220,0.5)",
					data: [65, 56,  12, 67, 67, 62, 49]
				}];
				config.options.scales.yAxes[0].ticks.max = 100;
				config.options.scales.yAxes[0].ticks.min = 0;
				config.options.scales.yAxes[0].ticks.stepSize = 20;
				return config;
			},
			breakPoints: {
				976: function(config) {
					config.data.labels = ["January", "February", "March", "April", "May"];
					config.data.datasets = [{
						label: 'Dataset 1',
						backgroundColor: "yellow",
						data: [65, 56,  12, 67, 67]
					}];
					config.options.scales.yAxes[0].ticks.max = 100;
					config.options.scales.yAxes[0].ticks.min = 0;
					config.options.scales.yAxes[0].ticks.stepSize = 10;
					return config;
				},
				624: function(config) {
					config.data.labels = ["Jan", "Feb"];
					config.data.datasets = [{
						label: 'Dataset 1',
						backgroundColor: "red",
						data: [65, 66]
					}];
					config.options.scales.yAxes[0].ticks.max = 67;
					config.options.scales.yAxes[0].ticks.min = 64;
					config.options.scales.yAxes[0].ticks.stepSize = 1;
					return config;
				}
			}
		},
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart'
		}
	}
});
```

## Todo
- Load Chart.js vs 2.1.5 via npm
- Add tests
- Check for viewport on initial load
