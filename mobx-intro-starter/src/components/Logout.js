import React from 'react';
import { Redirect } from "react-router-dom";

LogoutPage = class extends React.Component {
    componentWillMount () {
        this.props.history.push("/");
        //this.props.dispatch(authenticationActionCreator.logout());
        //this.props.dispatch(pushPath('/'));
    }

    render () {
        return null;
    }
};

export default connect()(LogoutPage);