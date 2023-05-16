// import React from 'react';

function SVG({ name, props }) {
    switch (name) {
        case 'loader_circle':
            return (
                <svg className="loader_circle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="70px"
                    height="70px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid">
                    <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                        fill={props?.color ?? "#f7f7f7"}
                        stroke="none">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="0.8s"
                            repeatCount="indefinite"
                            keyTimes="0;1"
                            values="0 50 51;360 50 51" />
                    </path>
                </svg>
            );

        case 'logout':
            return (
                <svg className='logout'
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
                        stroke={props?.color ?? "#f7f7f7"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2" />
                    <path d="M19 12L15 8M19 12L15 16M19 12H9"
                        stroke={props?.color ?? "#f7f7f7"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2" />
                </svg>
            );

        case 'new_message':
            return (
                <svg fill={props?.color ?? "#f7f7f7"}
                    height="20px"
                    width="20px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 489.6 489.6">
                    <path d="M438.5,445.9c7.8,0,15.6-0.5,23.3-1.6c7.7-1.1,13.8-6.7,15.5-14.3c1.7-7.7-1.4-15.4-8.1-19.8c-12.7-8.3-22.5-20-29.3-34.8
			c32.1-37.4,49.7-83.5,49.7-130.6c0-119.2-109.9-216.2-244.9-216.2S0,125.6,0,244.8S109.8,461,244.9,461c44.7,0,88.2-10.7,126.3-31
			C391.2,440.6,413.7,445.9,438.5,445.9z M443.7,421.3c-1.7,0.1-3.4,0.1-5.1,0.1c-22.9,0-43.4-5.3-60.9-15.9
			c-1.9-1.2-4.1-1.7-6.3-1.7c-2.1,0-4.2,0.5-6.1,1.6c-35.9,20.4-77.5,31.2-120.3,31.2c-121.5,0-220.4-86-220.4-191.7
			S123.5,53.2,245,53.2s220.4,86,220.4,191.7c0,44.1-16.8,85.5-48.5,119.9c-3.1,3.4-4.1,8.2-2.5,12.6
			C420.9,395,430.8,409.7,443.7,421.3z"/>
                    <path d="M315.9,257.1h-58.8v58.7c0,6.8-5.5,12.3-12.3,12.3s-12.3-5.5-12.3-12.3V257h-58.6c-6.8,0-12.3-5.5-12.3-12.3
			s5.5-12.3,12.3-12.3h58.8v-58.6c0-6.8,5.5-12.3,12.3-12.3c6.8,0,12.3,5.5,12.3,12.3v58.8h58.6c6.8,0,12.3,5.5,12.3,12.3
			C328.2,251.7,322.7,257.1,315.9,257.1z"/>
                </svg>
            );

        default:
            console.error('Компонент "SVG" был вызван с некорректным аргументом');
            return <div />;
    }
}

export default SVG;