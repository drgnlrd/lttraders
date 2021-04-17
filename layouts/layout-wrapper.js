import DefaultLayout from './default';
import AdminLayout from './admin';

const layouts = {
    default: DefaultLayout,
    admin: AdminLayout,
};

const LayoutWrapper = (props, {user,setUser}) => {
    const Layout = layouts[props.children.type.layout];

    if(Layout != null) {
        return <Layout user={user} setUser={setUser} {...props}>{props.children}</Layout>
    }

    return <DefaultLayout user={user} setUser={setUser} {...props}>{props.children}</DefaultLayout>
};

export default LayoutWrapper;