import DefaultLayout from './default';
import AdminLayout from './admin';

const layouts = {
    default: DefaultLayout,
    admin: AdminLayout,
};

const LayoutWrapper = (props) => {
    const Layout = layouts[props.children.type.layout];

    if(Layout != null) {
        return <Layout {...props}>{props.children}</Layout>
    }

    return <DefaultLayout {...props}>{props.children}</DefaultLayout>
};

export default LayoutWrapper;