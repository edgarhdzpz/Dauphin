import PageClient from './page.client'
export const metadata = {
    title: `Productos - ${process.env.APP_NAME}`,
    description:"Mis productos",

}; 
export default function Page() {
    return <PageClient />
}