import "./styles.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

interface CoreComponentGuidePageProps {
  title: string;
  description: string;
  readme: string;
  children: React.ReactNode;
}

export default function CoreComponentGuidePage({
  title,
  description,
  readme,
  children,
}: CoreComponentGuidePageProps) {
  return (
    <div className="core-guide-page">
      <header className="core-guide-page__header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <section className="core-guide-page__section">
        <h2>Code Preview</h2>
        <div className="core-guide-page__preview">{children}</div>
      </section>

      <section className="core-guide-page__section">
        <h2>README</h2>
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
        </article>
      </section>
    </div>
  );
}
