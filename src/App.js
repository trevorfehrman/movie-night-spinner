import * as React from 'react';
import styled from '@emotion/styled';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
  const [deg, setDeg] = React.useState(1000);

  React.useEffect(() => {
    console.log(deg);
  }, [deg]);
  return (
    <Container>
      <Circle
        animate={{ rotate: deg }}
        transition={{ duration: 2, ease: 'easeOut' }}
        onPan={(e, panInfo) => {
          // console.log(panInfo);
          setDeg(panInfo.velocity.x * 2);
        }}
      >
        <Arrow />
      </Circle>
    </Container>
  );
}

export default App;
