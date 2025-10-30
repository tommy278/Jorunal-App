export default function Loading() {
    return(
        <div className="flex flex-col items-center mt-10 animate-pulse gap-y-5 h-screen">
            <div className="bg-gray-400 py-2 px-1 rounded-lg">
                <p className="invisible text-[clamp(3rem,5vw,4rem)] font-bold">Untitled Entry</p>
            </div>
            <div className="w-[clamp(17rem,40%,50rem)] h-[5%] rounded-lg bg-gray-400"></div>
            <div className="bg-gray-400 w-[clamp(17rem,40%,50rem)] h-[40%] rounded-lg"></div>
            <div className="w-[20%] h-[5%] rounded-lg bg-gray-400 "></div>
            <div className="bg-gray-400 h-6 w-32 rounded-md mt-5"></div>
        </div>
    )
}