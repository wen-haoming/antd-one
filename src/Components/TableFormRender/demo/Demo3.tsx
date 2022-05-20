// import type { ProColumnsItems } from '../index';
// import { ProTable } from '../index';
// import {
//   ProFormText,
//   ProFormDateRangePicker,
//   ProFormDigit,
//   ProFormTextArea,
//   ProFormSelect,
// } from '@ant-design/pro-form';
// import { demo1Api } from './mock';
// import { message, Space } from 'antd';
// import Button from '../../Button';

// // 组件注册
// export const install = {
//   ProFormText,
//   ProFormDateRangePicker,
//   ProFormDigit,
//   ProFormTextArea,
//   ProFormSelect,
// };

// const demo2 = () => {
//   const columns: ProColumnsItems<typeof install> = [
//     {
//       title: '序号',
//       dataIndex: 'order',
//       width: 50,
//       fixed: 'left',
//       render(txt, col, idx) {
//         return idx + 1;
//       },
//     },
//     {
//       title: '分拨名称',
//       dataIndex: 'siteName',
//       fixed: 'left',
//       searchField(formData, opts, formInstance) {
//         return {
//           type: 'ProFormText',
//           props: {
//             onChange(e) {
//               formInstance.setFieldsValue({
//                 zoneName: e.target.value,
//               });
//             },
//           },
//         };
//       },
//     },
//     {
//       title: '库区编码',
//       dataIndex: 'zoneCode',
//     },
//     {
//       title: '库区名称',
//       dataIndex: 'zoneName',
//       searchField: {
//         type: 'ProFormText',
//         props: {
//           name: 'zoneName',
//         },
//       },
//     },
//     {
//       title: '类型',
//       dataIndex: 'type',
//       searchField: {
//         type: 'ProFormSelect',
//         props: {
//           name: 'type',
//           valueEnum: {
//             输入框: '输入框',
//             日期选择: '日期选择',
//           },
//         },
//       },
//     },
//     {
//       title: '类型控件',
//       dataIndex: 'creatorId',
//       searchField(formData) {
//         const type =
//           formData.type === '输入框'
//             ? 'ProFormText'
//             : formData.type === '日期选择'
//             ? 'ProFormDateRangePicker'
//             : '';
//         return {
//           dependencies: ['type'],
//           hideInSearch: formData.type === 1 || formData.type === 2,
//           type: type,
//           props: {
//             name: 'creatorId',
//           },
//         };
//       },
//     },
//     {
//       title: '更新人',
//       dataIndex: 'updatorId',
//     },
//   ];

//   return (
//     <ProTable
//       install={install}
//       columns={columns}
//       request={demo1Api}
//       tableOptions={{
//         isCheckbox: true,
//         rowKey: 'id',
//         toolbarRender(refresh, rowKeys, rows) {
//           const disabled = rowKeys.length !== 1;
//           return (
//             <Space>
//               <Button type="primary">添加</Button>
//               <Button disabled={disabled}>编辑</Button>
//               <Button
//                 danger
//                 disabled={disabled}
//                 beforeConfirm={{
//                   title: '请确认是否删除？',
//                 }}
//                 onClick={async () => {
//                   await refresh();
//                   message.success('删除成功');
//                 }}
//               >
//                 删除
//               </Button>
//             </Space>
//           );
//         },
//       }}
//     />
//   );
// };

// export default demo2;
