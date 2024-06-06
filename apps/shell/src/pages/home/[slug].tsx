import { NextPage } from "next";
import dynamic from "next/dynamic";


export const getServerSideProps = async (context) => {
    const { params } = context;
    const { slug } = params;
    console.log("🚀 ~ getServerSideProps ~ slug:", slug)
    return {
        props: {
            page: {
                title: 'Help home page'
            },
            layout: {
                title: 'Help home layout'
            }
        }
    }
}

//@ts-ignore
// eslint-disable-next-line no-undef
const HomeMicroFrontend: ComponentType<any> = dynamic(
    //@ts-ignore
    //Stryker disable next-line all
    () => import("home/homeComponent"),
    {
        ssr: true,
        loading: () => <p>Home mfe down</p>
    }
);
const HelpHome: NextPage<any> = ({ page, layout }) => {
    console.log('help home', page, layout);
    return (
        <div>
            <h1>Shell wrapper</h1>
            <HomeMicroFrontend title="Hello from AnotherComponent" {...page} />
        </div>
    );
};

export default HelpHome;
