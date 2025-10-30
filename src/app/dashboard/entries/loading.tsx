export default function Loading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-10 animate-pulse">
            {Array.from({ length: 9}).map((_, i) => (
                <div key={i} className="h-40 bg-gray-300 rounded-lg" />
            ))}
        </div>
    )
}