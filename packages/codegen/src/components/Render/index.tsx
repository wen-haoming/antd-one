import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { idSchema, schemaMap } from '@/store';
import type { FC } from 'react';

import { ConfigProvider } from 'antd';
import { useSnapshot } from 'valtio';

export const Render: FC = () => {
  const idSchemaSnp = useSnapshot(idSchema);
  const schemaMapSnp = useSnapshot(schemaMap);

  return (
    <ConfigProvider>
      {idSchemaSnp.map(({ id }) => {
        const UiComponent = schemaMapSnp[id].component;
        const props = schemaMapSnp[id].props;

        return (
          <Wrapper key={id} id={id}>
            <UiComponent {...props} />
          </Wrapper>
        );
      })}
      <AddWidget />
    </ConfigProvider>
  );
};

export default Render;
