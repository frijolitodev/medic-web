import React, { FC } from 'react';

import Layout from '@components/layout';
import { UserAppointments } from '@components/appointments';
import { UserInfo } from '@components/user';

const Home: FC = () => (
    <Layout hasMenu>
        <section className="space-y-10">
            <UserInfo />
            <UserAppointments />
        </section>
    </Layout>
);

export default Home;
