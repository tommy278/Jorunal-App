export default function CenterContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center pt-6">
      {children}
    </div>
  )
}
