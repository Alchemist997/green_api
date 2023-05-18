import { forwardRef } from 'react';

const Audio = forwardRef((props, ref) => (
    <audio ref={ref} src={`${process.env.PUBLIC_URL}/sounds/notify.mp3`} />
));

export default Audio;