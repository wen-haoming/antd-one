// import { expect,test } from 'vitest'
// import { render, fireEvent, screen, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Button from '..';

// const sleep = (time: number) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });

// test('onClick return promise can button to loading', async () => {
//   const Demo = () => {
//     const requestAsync = () => {
//       return new Promise((resolve, reject) => {
//         setTimeout(resolve, 3000);
//       });
//     };

//     return (
//       <div>
//         <Button role="button" type="primary" loadingText="加载中请稍后..." onClick={requestAsync}>
//           异步请求
//         </Button>
//       </div>
//     );
//   };
//   render(<Demo />);
//   await act(async () => {
//     // screen.getByRole('button')
//     expect(screen.getByRole('button')).toHaveTextContent('异步请求');
//     await fireEvent.click(screen.getByRole('button'));
//     expect(screen.getByRole('button')).toHaveTextContent('加载中请稍后...');
//     expect(screen.getByRole('button')).not.toHaveTextContent('异步请求');
//     await sleep(3000);
//     expect(screen.getByRole('button')).toHaveTextContent('异步请求');
//     expect(screen.getByRole('button')).not.toHaveTextContent('加载中请稍后...');
//   });
// });

// // test('abc',()=>{
// //   expect(2).toBe(2)
// // })
