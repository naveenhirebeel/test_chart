import { Component, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);

      // Need to fix Manually The New JSON then Use Live Data.
      const transformationJourneyData = {"Category1":{"value":[0],"principles":[["Sub Category 1",0,0]]},"Category2":{"value":[0],"principles":[["Sub Category 2",0,0],["Sub Category 9",0,0],["Sub Category 1",0,0]]},"Category3":{"value":[0],"principles":[["Sub Category 3",0,0],["Sub Category 8",0,0],["Sub Category 7",0,0]]},"Category4":{"value":[0],"principles":[["Sub Category 4",0,0],["Sub Category 5",0,0],["Sub Category 6",0,0],["Sub Category 7",0,0],["Sub Category 10",0,0],["Sub Category 9",0,0]]}};
      // const transformationJourneyData = chartDataTemplate;

      const first = 1;
      const last = 3;
      let current = 2;
      const colorSet = new am4core.ColorSet();

      const chart = am4core.create('chartdiv', am4charts.RadarChart);

      // chart.exporting.menu = new am4core.ExportMenu();

      chart.numberFormatter.numberFormat = '#';
      chart.hiddenState.properties.opacity = 0;

      chart.startAngle = 270;
      chart.endAngle = 270 + 360;

      chart.padding(40, 0, 50, 0);
      chart.radius = am4core.percent(100);
      chart.innerRadius = am4core.percent(18);

      // version label goes in the middle
      const versionLabel = chart.radarContainer.createChild(am4core.Label);
      versionLabel.horizontalCenter = 'middle';
      versionLabel.verticalCenter = 'middle';
      versionLabel.fill = am4core.color('#673AB7');
      versionLabel.fontSize = 15;
      versionLabel.text = 'Version 1';
      versionLabel.wrap = true;
      versionLabel.maxWidth = 58;

      // zoomout button
      const zoomOutButton = chart.zoomOutButton;
      zoomOutButton.dx = 0;
      zoomOutButton.dy = 0;
      zoomOutButton.marginBottom = 15;
      zoomOutButton.parent = chart.rightAxesContainer;

      // vertical orientation for zoom out button and scrollbar to be positioned properly
      chart.rightAxesContainer.layout = 'vertical';
      chart.rightAxesContainer.padding(60, 20, 40, 20);

      // category axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = 'principle';

      const categoryAxisRenderer = categoryAxis.renderer;
      categoryAxisRenderer.fontSize = 6;
      categoryAxisRenderer.minGridDistance = 10;
      categoryAxisRenderer.grid.template.radius = -0.001;
      categoryAxisRenderer.grid.template.strokeOpacity = 0.30;
      categoryAxisRenderer.grid.template.interactionsEnabled = false;

      categoryAxisRenderer.ticks.template.disabled = true;
      categoryAxisRenderer.axisFills.template.disabled = false;
      categoryAxisRenderer.line.disabled = false;
      categoryAxisRenderer.tooltipLocation = 0.5;
      categoryAxis.tooltip.defaultState.properties.opacity = 0;

      const categoryAxisLabel = categoryAxisRenderer.labels.template;
      categoryAxisLabel.location = 0.5;
      categoryAxisLabel.verticalCenter = 'right';
      categoryAxisLabel.horizontalCenter = 'right';
      categoryAxisLabel.rotation = 0;
      // categoryAxisLabel.relativeRotation = 0;
      categoryAxisLabel.reverseOrder = true;
      categoryAxisLabel.radius = -30;
      // categoryAxisLabel.bent = true;
      categoryAxisLabel.wrap = true;
      categoryAxisLabel.maxWidth = 38;

      // value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
      valueAxis.min = 0;
      valueAxis.max = 15;
      valueAxis.extraMax = 0.5;
      valueAxis.strictMinMax = true;
      valueAxis.tooltip.defaultState.properties.opacity = 0;
      valueAxis.tooltip.animationDuration = 0;
      valueAxis.cursorTooltipEnabled = true;
      valueAxis.zIndex = 10;

      const valueAxisRenderer = valueAxis.renderer;
      valueAxisRenderer.axisFills.template.disabled = true;
      valueAxisRenderer.ticks.template.disabled = true;
      valueAxisRenderer.minGridDistance = 30;
      valueAxisRenderer.grid.template.strokeOpacity = 0.05;
      valueAxisRenderer.fontSize = 12;
      valueAxisRenderer.axisAngle = chart.startAngle;

      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = '';

      // series
      const series = chart.series.push(new am4charts.RadarColumnSeries());
      series.columns.template.width = am4core.percent(97);
      series.columns.template.strokeOpacity = 0;
      series.name = 'Principles';
      series.dataFields.valueY = 'value' + current;
      series.dataFields.categoryX = 'principle';
      series.tooltipText = '[bold]{categoryX}[/]\nValue: {valueY.value}';
      series.tooltip.pointerOrientation = 'vertical';
      series.tooltip.label.fill = am4core.color('#ffffff');
      series.tooltip.label.fontSize = '0.8em';
      series.tooltip.autoTextColor = false;

      // this makes columns to be of a different color, depending on value
      series.heatRules.push({
        target: series.columns.template,
        property: 'fill',
        minValue: 0,
        maxValue: 10,
        min: am4core.color('#80ff80'),
        max: am4core.color('#009900'),
        dataField: 'valueY'
      });

      // cursor
      const cursor = new am4charts.RadarCursor();
      chart.cursor = cursor;
      cursor.behavior = 'zoomX';

      cursor.xAxis = categoryAxis;
      cursor.innerRadius = am4core.percent(18);
      cursor.lineY.disabled = true;

      cursor.lineX.fillOpacity = 0.2;
      cursor.lineX.fill = am4core.color('#000000');
      cursor.lineX.strokeOpacity = 0;
      cursor.fullWidthLineX = true;

      // version slider
      // const versionSliderContainer = chart.createChild(am4core.Container);
      // versionSliderContainer.layout = 'vertical';
      // versionSliderContainer.padding(0, 38, 0, 38);
      // versionSliderContainer.width = am4core.percent(100);

      // const versionSlider = versionSliderContainer.createChild(am4core.Slider);
      // versionSlider.events.on('rangechanged', () => {
      //   updateRadarData(first + Math.round(versionSlider.start * (last - first)));
      // });
      // versionSlider.orientation = 'horizontal';
      // versionSlider.start = 0.5;
      // versionSlider.exportable = false;

      chart.data = generateRadarData();

      function generateRadarData() {
        const data = [];
        let i = 0;
        for (const outcome in transformationJourneyData) {
          if (transformationJourneyData.hasOwnProperty(outcome)) {
            const outcomeData = transformationJourneyData[outcome];

            outcomeData.principles.forEach((principle, index) => {
              const rawDataItem = {
                principle: '[' + outcome + ']' + principle[0],
                outcome
              };
              for (let y = 1; y < principle.length; y++) {
                rawDataItem['value' + (first + y - 1)] = principle[y];
                if (index === Math.floor(outcomeData.principles.length / 2)) {
                  rawDataItem['outcomeValue' + (first + y - 1)] = outcomeData.value[y - 1];
                }
              }

              data.push(rawDataItem);
            });

            createRange(outcome, outcomeData.principles, i);
            i++;

          }
        }
        createValueRange();
        return data;
      }

      function updateRadarData(version) {
        if (current !== version) {
          current = version;
          versionLabel.text = 'V' + String(current);
          series.dataFields.valueY = 'value' + current;
          series.dataFields.valueY = 'outcomeValue' + current;
          chart.invalidateRawData();
        }
      }

      function createValueRange() {
        const axisRange = valueAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.value = 10;
        axisRange.contents.stroke = am4core.color('#000000');
        axisRange.grid.strokeOpacity = 1;
        axisRange.grid.strokeWidth = 2;

        const axisRange1 = valueAxis.axisRanges.create();
        axisRange1.axisFill.interactionsEnabled = true;
        axisRange1.value = 15;
        axisRange1.contents.stroke = am4core.color('#000000');
        axisRange1.grid.strokeOpacity = 1;
        axisRange1.grid.strokeWidth = 2;
      }

      function createRange(name, outcomeData, index) {
        const axisRange = categoryAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.text = name;

        axisRange.category = '[' + name + ']' + outcomeData[0][0];
        axisRange.endCategory = '[' + name + ']' + outcomeData[outcomeData.length - 1][0];

        axisRange.axisFill.fill = colorSet.getIndex(index * 4);
        axisRange.grid.disabled = true;
        axisRange.label.interactionsEnabled = false;
        axisRange.label.bent = true;

        // axisRange.label.rotation = 180;
        // axisRange.label.relativeRotation = 0;
        axisRange.label.fontSize = 15;
        axisRange.label.disabled = false;
        axisRange.label.hardInvalidate();
        // axisRange.label.inside = false;
        // axisRange.label.valign = 'right';
        axisRange.contents.stroke = am4core.color('#000000');
        axisRange.grid.strokeOpacity = 1;
        axisRange.grid.strokeWidth = 2;
        // axisRange.label.wrap = true;
        // axisRange.label.maxWidth = 250;

        const axisFill = axisRange.axisFill;
        axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
        axisFill.radius = -30; // negative radius means it is calculated from max radius
        axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
        axisFill.fillOpacity = 1;
        axisFill.togglable = true;
        // axisFill.tooltipText = 'Range:\n[bold]{category}[] to [bold]{endCategory}[/]';
        // axisFill.interactionsEnabled = true;
        // axisFill.isMeasured = true;

        axisFill.showSystemTooltip = true;
        axisFill.readerTitle = 'click to zoom';
        axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        axisFill.events.on('hit', (event) => {
          const dataItem = event.target.dataItem;
          if (!event.target.isActive) {
            categoryAxis.zoom({ start: 0, end: 1 });
          } else {
            categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
          }
        });

        // hover state
        const hoverState = axisFill.states.create('hover');
        hoverState.properties.innerRadius = -5;
        hoverState.properties.radius = -35;

        const axisLabel = axisRange.label;
        axisLabel.location = 0.5;
        axisLabel.fill = am4core.color('#ffffff');
        axisLabel.radius = 5;

        const axisRange1 = categoryAxis.axisRanges.create();
        axisRange1.category = '[' + name + ']' + outcomeData[0][0];
        axisRange1.endCategory = '[' + name + ']' + outcomeData[outcomeData.length - 1][0];

        // every 3rd color for a bigger contrast
        axisRange1.axisFill.fill = colorSet.getIndex(index * 4);
        // axisRange1.axisFill.fill = am4core.color('#ffffff');
        axisRange1.grid.disabled = false;
        axisRange1.label.disabled = true;
        axisRange1.label.interactionsEnabled = false;

        const axisFill1 = axisRange1.axisFill;
        axisFill1.innerRadius = am4core.percent(73);
        axisFill1.radius = -0.001;
        axisFill1.disabled = false;
        axisFill1.fillOpacity = 0.31;
        axisFill1.togglable = true;

        let total = 0;
        for (const o of (outcomeData)) {
          total += o[current + 1 - 1];
        }
      }
      // this.chart = chart;
      // this.chartEvent.emit(this.chart);
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
