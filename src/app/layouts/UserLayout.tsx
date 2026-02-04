import { Layout } from "antd";
import UserNavbar from "./UserNavbar";
import { Props } from "@/types/auth";
import RouteProgress from "@/components/core/RouteProgress";

export default function UserLayout({ children }: Props) {
  return (
    <Layout className="user-layout">
      <RouteProgress />
      <UserNavbar />
      <Layout.Content className="user-layout__content">
        {children}
      </Layout.Content>
    </Layout>
  );
}
