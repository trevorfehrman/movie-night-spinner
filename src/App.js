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
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
});

const Arrow = styled('div')({
  height: '10rem',
  width: '5px',
  backgroundColor: 'black',
  transform: 'translateX(10rem)',
});

const Wedge = styled('div')(props => ({
  height: '10rem',
  transform: `rotate(${props.degrees}deg)`,
  transformOrigin: 'bottom right',
  width: '50%',
  position: 'absolute',
  backgroundColor:
    props.index === 0 ? 'red' : props.index === 1 ? 'blue' : props.index === 2 ? 'green' : 'yellow',
}));

function App() {
  const degreesMotionValue = useMotionValue(0);
  const transform = useMotionTemplate`rotate(${degreesMotionValue}deg)`;

  function spin(velocity) {
    animate(degreesMotionValue, velocity * 0.5, {
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
        // onClick={() => {
        //   degreesMotionValue.isAnimating() && degreesMotionValue.stop();
        // }}
        onDrag={(e, dragInfo) => {
          // degreesMotionValue.isAnimating() && degreesMotionValue.stop();
          const { top, bottom, left, right } = e.target.getBoundingClientRect();
          console.log(window.innerWidth, left);
          // console.log(top, window.innerHeight);
          if (top > Math.floor(window.innerHeight / 2)) {
            // console.log(dragInfo.delta);
            // if (dragInfo.velocity.x < 0) {
            //   console.log('here');
            //   degreesMotionValue.set(degreesMotionValue.get() + dragInfo.delta.x * -1);
            // } else {
            //   console.log('der');
            //   degreesMotionValue.set(degreesMotionValue.get() + dragInfo.delta.x * -1);
            // }
          }
          if (left > Math.floor(window.innerWidth / 2)) {
            console.log('hi');
            // console.log(dragInfo.delta);
            // if (dragInfo.velocity.y < 0) {
            //   console.log('hereY');
            //   degreesMotionValue.set(degreesMotionValue.get() + dragInfo.delta.y * -1);
            // } else {
            //   console.log('derY');
            //   degreesMotionValue.set(degreesMotionValue.get() + dragInfo.delta.y * -1);
            // }
          }
          degreesMotionValue.set(degreesMotionValue.get() + dragInfo.delta.x + dragInfo.delta.y);
        }}
        // onDragEnd={() => {
        //   spin(degreesMotionValue.getVelocity());
        // }}
      >
        <Circle style={{ transform }}>
          {Array.from({ length: 4 }).map((wedge, i) => (
            <Wedge key={i} degrees={String((i + 1) * 90)} index={i} />
          ))}
        </Circle>
      </motion.div>
    </Container>
  );
}

export default App;
