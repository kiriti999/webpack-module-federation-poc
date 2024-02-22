import { NextPage } from "next";
import dynamic from "next/dynamic";

//@ts-ignore
// eslint-disable-next-line no-undef
const HomeMicroFrontend: ComponentType<any> = dynamic(
    //@ts-ignore
    //Stryker disable next-line all
    () => import("home/homeComponent"),
    {
        ssr: true,
        loading: () => <p>Home component down</p>
    }
);
const HelpHome: NextPage<any> = ({ page, layout }) => {
    return (
        <div>
            <h1>Shell wrapper</h1>
            <HomeMicroFrontend title="Hello from AnotherComponent" {...page} />
        </div>
    );
};

export default HelpHome;
