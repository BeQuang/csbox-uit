import { Layout } from "antd";
import UserNavbar from "./UserNavbar";
import { Props } from "@/types/auth";
import RouteProgress from "@/components/core/RouteProgress";
import { usePageTitle } from "@/hooks/userPageTitle";

export default function UserLayout({ children }: Props) {
  usePageTitle("CS-Box");
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
