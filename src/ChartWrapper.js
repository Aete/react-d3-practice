import { useState, useRef, Fragment, useEffect } from 'react';
import * as d3 from 'd3';
import D3Chart from './D3Chart';

function ChartWrapper() {
  const container = useRef();
  const [chart, setChart] = useState(null);
  const [title, setTitle] = useState('men');

  useEffect(() => {
    console.log('test');
    if (!chart) {
      Promise.all([
        d3.json('https://udemy-react-d3.firebaseio.com/tallest_men.json'),
        d3.json('https://udemy-react-d3.firebaseio.com/tallest_women.json'),
      ]).then(([menData, womenData]) => {
        setChart(new D3Chart(container.current, menData, womenData));
      });
    } else {
      chart.update(title);
    }
  }, [chart, title]);

  const changeChart = () => {
    const newTitle = title === 'men' ? 'women' : 'men';
    setTitle(newTitle);
  };

  return (
    <Fragment>
      <button onClick={changeChart}>Change gender</button>
      <div ref={container}></div>
    </Fragment>
  );
}

export default ChartWrapper;
