export default function Loading() {
  return (
    <div className="mx-auto max-w-[1512px] px-6 py-8">
      <div className="mb-8 h-7 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-12 lg:grid-cols-[737px_1fr]">
        <div className="space-y-6">
          <div className="h-[531px] w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="space-y-4">
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}


