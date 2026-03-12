import StudiesLayout from "@/components/studies/StudiesLayout";

export default function StudiesShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudiesLayout>{children}</StudiesLayout>;
}
