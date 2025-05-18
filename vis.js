const dscc = require('@google/dscc');
const d3 = require('d3');

function drawViz(data) {
  const values = data.tables.DEFAULT.map(row => row[1]);
  const steps = data.tables.DEFAULT.map(row => row[0]);

  const max = d3.max(values);
  const width = 600, height = 400;

  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const funnel = svg.append('g')
    .attr('transform', 'translate(100, 0)');

  const area = d3.area()
    .x0(d => width / 2 - d.width / 2)
    .x1(d => width / 2 + d.width / 2)
    .y(d => d.y)
    .curve(d3.curveBasis);

  const stepHeight = height / (values.length - 1);

  const pathData = values.map((v, i) => {
    return {
      y: i * stepHeight,
      width: (v / max) * width * 0.8
    };
  });

  funnel.append('path')
    .datum(pathData)
    .attr('d', area)
    .attr('fill', 'steelblue')
    .attr('opacity', 0.8);
}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
