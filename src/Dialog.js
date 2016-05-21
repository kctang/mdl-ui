import React from 'react';
import * as Mdl from 'react-mdl';

export default ({
  title='Dialog title',
  content='Dialog content',
  actions=['Ok', 'Cancel'],
  doClick=onClick,
  doCancel=onCancel,
}) => {
  return (
    <div>
      <Mdl.Dialog open={true} onCancel={() => doCancel()}>
        <Mdl.DialogTitle>{title}</Mdl.DialogTitle>
        <Mdl.DialogContent>{content}</Mdl.DialogContent>
        <Mdl.DialogActions>
          {actions.map((action, index) => (
            <Mdl.Button key={index} type="button" onClick={() => doCancel(action)}>
              {action}
            </Mdl.Button>
          ))}
        </Mdl.DialogActions>
      </Mdl.Dialog>
    </div>
  );
};
