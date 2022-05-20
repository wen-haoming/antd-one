// import TableFormRender from '../index';
// import { demo1Api } from './mock';

// const demo1 = () => {
//   return (
//     <TableFormRender
//       columns={[
//         {
//           title: '序号',
//           dataIndex: 'order',
//           width: 50,
//           fixed: 'left',
//           render(txt, col, idx) {
//             return idx + 1;
//           },
//         },
//         {
//           title: '分拨名称',
//           dataIndex: 'siteName',
//           fixed: 'left',
//           searchField: {
//             type: 'FormInput',
//             props: {
//               label: '分拨名称',
//               name: 'siteName',
//             },
//           },
//         },
//         {
//           title: '库区编码',
//           dataIndex: 'zoneCode',
//         },
//         {
//           title: '库区名称',
//           dataIndex: 'zoneName',
//           searchField: {
//             type: 'FormInput',
//             props: {
//               label: '库区名称',
//               name: 'siteName2',
//             },
//           },
//         },
//         {
//           title: '创建人',
//           dataIndex: 'creatorId',
//           searchField: {
//             type: 'FormSelect',
//             props: {
//               label: '创建人',
//               name: 'siteName3',
//               fieldProps: {
//                 valueEnum: {
//                   1: '1',
//                   2: '2',
//                 },
//               },
//             },
//           },
//         },
//         {
//           title: '更新人',
//           dataIndex: 'updatorId',
//         },
//       ]}
//       request={demo1Api}
//     />
//   );
// };

// export default demo1;
