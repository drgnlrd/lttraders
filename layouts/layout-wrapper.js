import {useEffect, useState} from 'react'
import DefaultLayout from './default';
import AdminLayout from './admin';
import { commerce } from '../lib/commerce';


const layouts = {
    default: DefaultLayout,
    admin: AdminLayout,
};

const LayoutWrapper = (props, {user,setUser}) => {
    const Layout = layouts[props.children.type.layout];

    // useEffect(() => {
    //     commerce.categories.list().then((categories) => {
    //         setCategories(categories.data);
    //     })
    // },[categories])

    if(Layout != null) {
        return <Layout user={user} setUser={setUser} {...props}>{props.children}</Layout>
    }

    return <DefaultLayout user={user} setUser={setUser} {...props}>{props.children}</DefaultLayout>
};

export default LayoutWrapper;