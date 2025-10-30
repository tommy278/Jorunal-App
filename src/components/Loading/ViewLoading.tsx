export default function Loading() {
    return (
       <div className="flex flex-col items-center mt-10 animate-pulse">
            <div className="bg-gray-400 py-2 px-1 rounded-lg">
                <p className="invisible text-[clamp(3rem,5vw,4rem)] font-bold">Untitled Entry</p>
            </div>
            <div className="bg-gray-400 mt-5 p-5 w-[clamp(17rem,40%,50rem)] rounded-lg">
                <p className="invisible text-[clamp(1rem,5vw,1.5rem)]">
                    This is here to be a placeholder for the loading screen and it is going to be the best loading screen ever. Oh my gosh i figured out how to make the loading screen work perfectly.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center text-xs space-y-1 lg:space-y-0 lg:space-x-4 lg:w-[40%] mt-2 bg-gray-400">
                <p className="invisible">Created: Oct 28, 2025, 11:30 PM</p>
                <p className="invisible">Updated: Oct 28, 2025, 11:30 PM</p>
            </div>
            
            <div className="bg-gray-400 h-6 w-32 rounded-md mt-5"></div>
            <div className="bg-gray-400 h-6 w-32 rounded-md mt-5"></div>
        </div>
    )
}