import "./globals.css";
import BlogLayout from "./BlogLayout";
import { getNavigation } from "./ghost-client";
import { use } from "react";
import type { Settings } from "@tryghost/content-api";

interface UpdateSettings extends Settings {
  accent_color?: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const settings: UpdateSettings | any = use(getNavigation());

  return (
    <html className="light" lang="en">
      <body className={` bg-[--bg-color] dark:bg-gray-900`}>
        <BlogLayout setting={settings}>{children}</BlogLayout>
      </body>
    </html>
  );
}
