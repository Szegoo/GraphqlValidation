import Layout from '../components/Layout';
import Router from 'next/router';

export default () => {
    function gotoLoginPage() {
        Router.push("/get-started");
    }
    return (
        <div>
            <Layout />
            <main>
                <h1>HomeSolver</h1>
                <button onClick={gotoLoginPage}>get started</button>
                <h3>for only 14.99$ per month</h3>
            </main>
        </div>
    )
}