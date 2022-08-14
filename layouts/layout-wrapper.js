import {useEffect, useState} from 'react'
import DefaultLayout from './default';
import AdminLayout from './admin';
import { commerce } from '../lib/commerce';

export async function getStaticProps(){
    const categories = await commerce.categories.list();
    return {
        props: {
            categories,
        },
    }
}

const layouts = {
    default: DefaultLayout,
    admin: AdminLayout,
};

const LayoutWrapper = (props, {user,setUser, categories}) => {
    const Layout = layouts[props.children.type.layout];

    // useEffect(() => {
    //     commerce.categories.list().then((categories) => {
    //         setCategories(categories.data);
    //     })
    // },[categories])

    if(Layout != null) {
        return <Layout user={user} setUser={setUser} categories={categories} {...props}>{props.children}</Layout>
    }

    return <DefaultLayout user={user} setUser={setUser} categories={categories} {...props}>{props.children}</DefaultLayout>
};

export default LayoutWrapper;