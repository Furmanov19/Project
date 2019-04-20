import { connect } from 'react-redux';
import { createOrder } from '../actions/usersActions';
import {goBackFanc} from "../actions/goBackActions";
import BookingPage from '../components/home/main/BookingPage/BookingPage';


const mapStateToProps = state => ({
    executor:state.users.selectedExecutorForBooking,
    services:state.users.selectedExecutorForBooking.services,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {createOrder,goBackFanc}
)(BookingPage);