import * as React from 'react';
import styled from '@emotion/styled';
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import './App.css';

const Container = styled('div')({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Circle = styled(motion.div)({
  height: '20rem',
  width: '20rem',
  backgroundColor: 'green',
  borderRadius: '50%',
});

const Arrow = styled('div')({
  height: '10rem',
  width: '5px',
  backgroundColor: 'black',
  transform: 'translateX(10rem)',
});

function App() {
  const x = useMotionValue(0);
  const transform = useMotionTemplate`rotate(${x}deg)`;

  function spin(velocity) {
    animate(x, velocity * 0.5, {
      // TODO: Maybe try to get intertia working?
      // type: 'intertia',
      // velocity,
      ease: [0.17, 0.67, 0.24, 0.98],
      duration: 4,
    });
  }

  return (
    <Container>
      <motion.div
        style={{ height: '20rem', width: '20rem' }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.0}
        dragMomentum={false}
        onClick={() => {
          x.isAnimating() && x.stop();
        }}
        onDrag={(e, dragInfo) => {
          x.isAnimating() && x.stop();
          x.set(x.get() + dragInfo.delta.x + dragInfo.delta.y);
        }}
        onDragEnd={() => {
          spin(x.getVelocity());
        }}
      >
        <Circle style={{ transform }}>
          <Arrow />
        </Circle>
      </motion.div>
    </Container>
  );
}

export default App;
