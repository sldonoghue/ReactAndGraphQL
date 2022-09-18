import PropTypes from 'prop-types';

export default function Page({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

Page.propType = {
    children: PropTypes.any
};