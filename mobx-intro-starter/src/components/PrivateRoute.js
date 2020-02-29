import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('commonStore')
@observer
class PrivateRoute extends React.Component {
  render() {
    const { commonStore, ...restProps } = this.props;
    if (commonStore.islogined) return <Route {...restProps} />;
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;