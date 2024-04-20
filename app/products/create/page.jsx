import PageClient from './page.client'
export const metadata = {
    title: `Create - ${process.env.APP_NAME}`,
    description:"Nuevos productos",

}; 
export default function Page() {
    return <PageClient />
}