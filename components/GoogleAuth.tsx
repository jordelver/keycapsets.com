import React from 'react';
import GoogleLogin from 'react-google-login';
import { ApolloClient } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';

import { GOOGLE_LOGIN } from '../queries';

import withData from '../hooks/withData';
import Button from './Button';
import GoogleIcon from './GoogleIcon';
import { loginUser } from '../utils/userLogin';

const CLIENT_ID = '22533085590-p56b9iva0qoq0btq94q252uuv34rphec.apps.googleusercontent.com';

interface GoogleAuthProps {
    asLink: boolean;
}

function GoogleAuth(props: GoogleAuthProps): JSX.Element {
    const { asLink } = props;
    const client: ApolloClient<any> = useApolloClient();

    async function success(response) {
        try {
            const {
                data: { googleLogin },
            } = await client.mutate({
                mutation: GOOGLE_LOGIN,
                variables: {
                    token: response.tokenId,
                },
            });
            loginUser(googleLogin);
        } catch (err) {
            console.error(err);
        }
    }

    function error(res) {
        console.error('error', res);
    }

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={success}
            onFailure={error}
            responseType="id_token"
            render={(renderProps) =>
                asLink ? (
                    <a onClick={renderProps.onClick /* () => console.log('Coming soon')*/}>
                        <GoogleIcon variant="dark" />
                        Sign up with Google
                    </a>
                ) : (
                    <Button
                        onClick={renderProps.onClick /* () => console.log('Coming soon')*/}
                        variant="primary"
                        size="md"
                        className="google-button"
                        // isDisabled
                    >
                        <GoogleIcon variant="white" />
                        Sign up with Google
                    </Button>
                )
            }
        />
    );
}

export default GoogleAuth;
