// This layout overrides the admin shell for blog editor pages.
// It removes the p-6 padding and hides the sidebar by rendering
// children full-width within the existing flex container.
// The AdminTopBar and AdminUnsavedProvider are inherited from the
// parent admin layout — do not re-wrap them here.

export default function BlogEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
      {children}
    </div>
  );
}
