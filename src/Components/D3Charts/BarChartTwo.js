import * as d3 from 'd3';

export default function D3Chart(element) {
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const height = 300 - margin.top - margin.bottom;
  const width = 500 - margin.left - margin.right;

  //prettier-ignore
  const svg = d3.select(element)
    .append('svg')
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxis = container
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

  const data = [5, 10, 14, 20, 25, 11, 24, 22, 18, 22, 9, 18, 6, 2];

  this.update = () => {
    const xScale = d3.scaleBand().domain(data).range([0, width]).padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    container
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(d))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth)
      .attr('height', (d) => height - yScale(d))
      .attr('fill', (d) => (d > 10 ? '#F44336' : 'gray'));
  };
}
