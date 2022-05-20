export const demo1Api = ({ current, pageSize }: any) => {
  return new Promise((r) => {
    const records = Array(pageSize)
      .fill('')
      .map((item, id) => ({
        id,
        siteName: '丰网杭州分拨中心',
        zoneCode: '002',
        zoneName: 'kq002',
        creatorId: '014050xx',
        updatorId: '014050xx',
      }));
    setTimeout(() => {
      r({
        current: current,
        pages: pageSize,
        records,
        size: pageSize,
        total: 1000,
      });
    }, 300);
  });
};
