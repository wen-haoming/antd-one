import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '..';

const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

test('onClick return promise can button to loading', async () => {
  const Demo = () => {
    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    };

    return (
      <div>
        <Button role="button" type="primary" loadingText="加载中请稍后..." onClick={requestAsync}>
          异步请求
        </Button>
      </div>
    );
  };
  render(<Demo />);
  await act(async () => {
    // screen.getByRole('button')
    expect(screen.getByRole('button')).toHaveTextContent('异步请求');
    await fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('加载中请稍后...');
    expect(screen.getByRole('button')).not.toHaveTextContent('异步请求');
    await sleep(3000);
    expect(screen.getByRole('button')).toHaveTextContent('异步请求');
    expect(screen.getByRole('button')).not.toHaveTextContent('加载中请稍后...');
  });
});

test('beforeConfirm modal', async () => {
  const Demo = () => {
    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
      });
    };

    return (
      <div>
        <Button
          type="primary"
          beforeConfirm={{
            title: '请注意！',
            content: '请问是否提交该表单数据?',
            okText: '确定',
            cancelText: '取消',
          }}
          onClick={requestAsync}
          loadingText="提交中请稍后..."
          role="button"
        >
          异步请求
        </Button>
      </div>
    );
  };

  render(<Demo />);

  await act(async () => {
    await expect(screen.getByRole('button')).toHaveTextContent('异步请求');
    await fireEvent.click(screen.getByRole('button'));
    const confirmButton = await screen.findByText('确 定');
    await expect(confirmButton).toBeVisible();
  });

  await act(async () => {
    const modal = await waitFor(() => document.querySelector('.ant-modal-body'));
    expect(modal).toBeVisible();
    const okBtn = await waitFor(() => modal?.querySelector('.ant-btn.ant-btn-primary'));
    await expect(okBtn).toBeVisible();
    await fireEvent.click(okBtn);
    await sleep(100);
    const modal2 = await waitFor(() => document.querySelector('.ant-modal-body'));
    await expect(modal2).toBeNull();
    await expect(screen.getByRole('button')).toHaveTextContent('提交中请稍后...');
  });
});
