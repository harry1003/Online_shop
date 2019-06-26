import React, { Component } from 'react';

export default function withAuth(AuthComponent) {

    return class Auth extends Component {
        render() {
            return (
                <AuthComponent />
            )
        }
    }
}