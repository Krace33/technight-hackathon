import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession, getSession } from "next-auth/react";
import Layout from "../components/common/Layout";
import Landing from "../components/screens/Landing";
import Dashboard from "../components/screens/Dashboard";

const Home: NextPage = ({ loggedIn }: any) => {
    return (
        <div className="">
            <Head>
                <title>We will win!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout title="technight">
                {loggedIn ? <Dashboard /> : <Landing />}
            </Layout>
        </div>
    );
};

export default Home;

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;
        const session = await getSession({ req });
        if (session) {
            return {
                props: {
                    loggedIn: true,
                },
            };
        }
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            loggedIn: false,
        },
    };
}
