import React from 'react';
import {withRouter } from "react-router-dom";
import { observer,inject } from 'mobx-react';

@inject("commonStore")
@observer
class LogoutPage extends React.Component {
    componentWillMount () {
        this.props.commonStore.logout();
        this.props.history.push("/");
    }

    render () {
        return null;
    }
};

export default withRouter(LogoutPage);