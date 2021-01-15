import { useState, useRef, Fragment, useEffect } from 'react';
import BarChartTwo from './D3Charts/BarChartTwo';

function BarChartWrapper() {
  const container = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new BarChartTwo(container.current));
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

export default BarChartWrapper;
