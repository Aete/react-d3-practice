import { useState, useRef, Fragment, useEffect } from 'react';
import D3Chart from './D3Chart';

function ChartWrapper() {
  const container = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  return (
    <Fragment>
      <div ref={container}></div>
    </Fragment>
  );
}

export default ChartWrapper;
