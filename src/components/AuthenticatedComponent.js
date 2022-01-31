import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuth);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuth);
        }

        checkAuth (isAuth) {
            if (!isAuth) {
                this.props.push('/login')
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuth === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = state => ({
      isAuth: state.auth.isAuth
    })

    const mapDispatchToProps = dispatch => ({
      push: bindActionCreators(push, dispatch)
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
