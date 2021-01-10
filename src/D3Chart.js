import * as d3 from 'd3';

export default function D3Chart(element, dataOne, dataTwo) {
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const height = 500 - margin.top - margin.bottom;
  const width = 500 - margin.left - margin.right;

  //prettier-ignore
  const svg = d3.select(element)
    .append('svg')
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  this.xAxis = container
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${height})`);

  container
    .append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#212121')
    .text('Example 1');

  container
    .append('text')
    .attr('class', 'xAxis-title')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 15)
    .attr('text-anchor', 'middle')
    .attr('fill', '#212121')
    .style('font-size', '12px')
    .text('name');

  this.yAxis = container.append('g').attr('id', 'yAxis');

  container
    .append('text')
    .attr('class', 'yAxis-title')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('fill', '#212121')
    .style('font-size', '12px')
    .text('height (cm)');

  this.update = (title) => {
    const data = title === 'men' ? dataOne : dataTwo;
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    const xAxis = d3.axisBottom(xScale);
    this.xAxis.transition().duration(500).call(xAxis);

    const yMax = d3.max(data.map((d) => +d.height));
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
    const yAxis = d3.axisLeft(yScale);
    this.yAxis.transition().duration(500).call(yAxis);

    //prettier-ignore
    const rects = container.selectAll('rect')
        .data(data);

    rects.exit().remove();

    rects
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth)
      .attr('x', (d) => xScale(d.name))
      .attr('y', yScale(0))
      .merge(rects)
      .transition()
      .duration(500)
      .attr('width', xScale.bandwidth)
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(+d.height))
      .attr('height', (d) => height - yScale(+d.height))
      .attr('fill', (d) => (+d.height > 260 ? '#F44336' : 'gray'));
  };
}
