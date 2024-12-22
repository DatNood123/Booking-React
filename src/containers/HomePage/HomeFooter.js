import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className='home-footer'>
                    <p>&copy; 2024 DatEkko ChauSaDec Floriculture. <a href='https://github.com/DatNood123' target="_blank" ><FormattedMessage id="footer.more" /></a></p>
                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
