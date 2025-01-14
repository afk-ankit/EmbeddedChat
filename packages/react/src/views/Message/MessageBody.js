import React from 'react';
import useComponentOverrides from '../../hooks/useComponentOverrides';
import { Box } from '../../components/Box';
import { appendClassNames } from '../../lib/appendClassNames';
import { MessageBodyStyles as styles } from './Message.styles';

export const MessageBody = ({
  children,
  className = '',
  variantStyles = {},
  isText = true,
  sequential = false,
  lastSequential = false,
  style = {},
  ...props
}) => {
  const { styleOverrides, classNames } = useComponentOverrides(
    'MessageBody',
    className,
    style
  );

  const messageBodyStyles =
    (isText ? variantStyles.messageBody : variantStyles.attachmentBody) ||
    styles.messageBody;

  return (
    <Box
      css={[
        messageBodyStyles,
        sequential && variantStyles.sequential,
        lastSequential && variantStyles.lastSequential,
      ]}
      className={appendClassNames('ec-message-body', classNames)}
      style={styleOverrides}
      {...props}
    >
      {children}
    </Box>
  );
};
