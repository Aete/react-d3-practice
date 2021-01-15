import { useState, useRef, Fragment, useEffect } from 'react';
import Scatter from './D3Charts/Scatter';

function ScatterWrapper({ data, onHover }) {
  const container = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new Scatter(container.current, onHover));
    } else {
      chart.update(data);
    }
  }, [chart, data, onHover]);

  return (
    <Fragment>
      <div ref={container}></div>
    </Fragment>
  );
}

export default ScatterWrapper;
