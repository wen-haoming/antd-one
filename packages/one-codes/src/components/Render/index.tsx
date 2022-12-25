import AddWidget from '@/components/AddWidget';
import Wrapper from '@/components/Widge/Wrapper';
import { idSchema, schemaMap } from '@/store';
import type { FC } from 'react';

import { ConfigProvider } from 'antd';
import { ref, useSnapshot } from 'valtio';

export const Render: FC = () => {
  const idSchemaSnap = useSnapshot(idSchema);
  const schemaMapSnap = useSnapshot(schemaMap);

  return (
    <ConfigProvider>
      {idSchemaSnap.map(({ id }) => {
        const UiComponent = ref(schemaMapSnap)[id].component;
        const props = ref(schemaMapSnap)[id].props;

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
