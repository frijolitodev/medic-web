import Layout from '@components/layout';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Landing: FC = () => (
    <Layout>
        <h1>Landing page</h1>
        <Link to="/login">Login</Link>
    </Layout>
);

export default Landing;
