import { Layout } from 'ui'

export default function Home() {
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/system");
  //   }
  // }, []);
  return (
    <Layout>
      {/* <Card>主应用</Card> */}
      <div id="app"></div>
    </Layout>
  )
}
