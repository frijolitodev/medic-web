import React, { FC } from 'react';

import Layout from '@components/layout';
import { UserAppointments } from '@components/appointments';
import { UserInfo } from '@components/user';

const Home: FC = () => (
    <Layout>
        <UserInfo />
        <UserAppointments />
    </Layout>
);

export default Home;
