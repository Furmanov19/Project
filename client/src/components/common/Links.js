import React from "react";
import { Link } from 'react-router-dom';

export const RegLink = props => <Link to="/register" {...props} />
export const LogLink = props => <Link to="/login" {...props} />
export const Logo = props => <Link to="/" {...props} />

export const ProfileLink = props => <Link to="/profile" {...props} />
export const EditProfileLink = props => <Link to="/profile-edit" {...props} />
export const OrderLink = props => <Link to="/orders" {...props} />
export const HomeLink = props => <Link to="/" {...props} />

export const UsersLink = props => <Link to="/users" {...props} />
export const ExecutorsLink = props => <Link to="/executors" {...props} />

export const ExecutorBlockLink = props => <Link to="/executors-blocking"  {...props} />
export const UserBlockLink = props => <Link to="/users-blocking"  {...props} />
export const CommentsLink = props => <Link to="/comments"  {...props} />