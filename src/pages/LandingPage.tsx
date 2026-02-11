import { RootState } from "@/app/redux/store";
import { useAuthStore } from "@/app/store/auth.store";
import CSButton from "@/components/core/CSButton";
import { usePageTitle } from "@/hooks/userPageTitle";
import { redirectByRole } from "@/utils/redirectByRole";
import { ROLES } from "@/utils/role";
import { Button, Col, Row, Space, Tag, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./stylesLanding.scss";
import { useToast } from "@/components/core/CSToast";

const { Title, Paragraph } = Typography;

const highlights = [
  {
    title: "Trải nghiệm học tập liền mạch",
    description:
      "Trang chủ định hướng người dùng từ giới thiệu giá trị đến thao tác đăng nhập/đăng ký chỉ trong 1 màn hình.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Khung layout dài cho landing page",
    description:
      "Nội dung được chia tầng: hero, feature, luồng triển khai và phần role-based access cho Admin/Staff/User.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sẵn sàng mở rộng theo module",
    description:
      "Thiết kế card-based giúp bạn thêm section mới nhanh chóng khi mở rộng dashboard, user management, study.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

const roleCards = [
  {
    role: ROLES.ADMIN,
    label: "ADMIN",
    desc: "Quản trị hệ thống, users và dashboard tổng quan.",
    account: "admin / admin123",
  },
  {
    role: ROLES.STAFF,
    label: "STAFF",
    desc: "Vận hành nội dung học tập và theo dõi tiến độ người dùng.",
    account: "staff / staff123",
  },
  {
    role: ROLES.USER,
    label: "USER",
    desc: "Học tập, quản lý hồ sơ cá nhân và lịch sử hoạt động.",
    account: "user / user123",
  },
];

export default function LandingPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  usePageTitle("Trang chủ - My Education App");

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    toast("Đăng xuất thành công", "success");
  };

  return (
    <div className="landing">
      <section className="landing__hero">
        <div className="landing__hero-content">
          <Tag color="blue" className="landing__tag">
            Figma-style introduction
          </Tag>
          <Title className="landing__title" level={1}>
            Landing page dài hơn, đẹp hơn và rõ luồng truy cập theo vai trò
          </Title>
          <Paragraph className="landing__description">
            Đây là màn hình giới thiệu dành cho khách truy cập lần đầu: trình
            bày giá trị nền tảng, mô tả kiến trúc trang và hỗ trợ thao tác đăng
            nhập, đăng ký để đi vào khu vực Admin / Staff / User bên trong hệ
            thống.
          </Paragraph>

          <Space wrap size={12}>
            {!isAuthenticated ? (
              <>
                <CSButton size="md" onClick={() => navigate("/login")}>
                  Đăng nhập ngay
                </CSButton>
                <Button size="large" onClick={() => navigate("/register")}>
                  Đăng ký tài khoản
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    navigate(redirectByRole(user?.role ?? ROLES.USER))
                  }
                >
                  Vào khu vực của tôi ({user?.role})
                </Button>
                <Button danger size="large" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            )}
          </Space>
        </div>

        <div className="landing__hero-image-wrap">
          <img
            className="landing__hero-image"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
            alt="Team đang thiết kế giao diện landing page"
          />
        </div>
      </section>

      <section className="landing__grid-section">
        <Row gutter={[20, 20]}>
          {highlights.map((item) => (
            <Col xs={24} md={8} key={item.title}>
              <article className="landing__feature-card">
                <img src={item.image} alt={item.title} />
                <div className="landing__feature-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </section>

      <section className="landing__timeline">
        <Title level={3}>Luồng thao tác chính trên trang</Title>
        <div className="landing__timeline-list">
          <div className="landing__timeline-item">
            <span>01</span>
            <p>
              Khách truy cập xem phần giới thiệu và các điểm nổi bật của hệ
              thống.
            </p>
          </div>
          <div className="landing__timeline-item">
            <span>02</span>
            <p>
              Người dùng chọn đăng nhập hoặc đăng ký tài khoản theo vai trò.
            </p>
          </div>
          <div className="landing__timeline-item">
            <span>03</span>
            <p>
              Hệ thống điều hướng vào dashboard/profile tương ứng theo role.
            </p>
          </div>
        </div>
      </section>

      <section className="landing__roles">
        <Title level={3}>Truy cập theo vai trò</Title>
        <Paragraph>
          Bạn có thể dùng tài khoản mẫu hoặc đăng ký mới để kiểm tra luồng điều
          hướng theo quyền.
        </Paragraph>
        <div className="landing__role-grid">
          {roleCards.map((card) => (
            <article key={card.role} className="landing__role-card">
              <h4>{card.label}</h4>
              <p>{card.desc}</p>
              <small>Tài khoản demo: {card.account}</small>
              {isAuthenticated && user?.role === card.role && (
                <Button
                  type="primary"
                  className="landing__role-cta"
                  onClick={() => navigate(redirectByRole(card.role))}
                >
                  Vào ngay
                </Button>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
