import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button } from '.';
import DefaultTheme from '../../theme/DefaultTheme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    type: 'primary',
  },
  render: (args) => (
    <ThemeProvider theme={DefaultTheme}>
      <Button {...args}>Click Me</Button>
    </ThemeProvider>
  ),
};

export const Secondary = {
  args: {
    type: 'secondary',
  },
  render: (args) => (
    <ThemeProvider theme={DefaultTheme}>
      <Button {...args}>Click Me</Button>
    </ThemeProvider>
  ),
};

export const Large = {
  args: {
    type: 'primary',
    size: 'large',
  },
  render: (args) => (
    <ThemeProvider theme={DefaultTheme}>
      <Button {...args}>Click Me</Button>
    </ThemeProvider>
  ),
};

export const Small = {
  args: {
    type: 'primary',
    size: 'small',
  },
  render: (args) => (
    <ThemeProvider theme={DefaultTheme}>
      <Button {...args}>Click Me</Button>
    </ThemeProvider>
  ),
};
