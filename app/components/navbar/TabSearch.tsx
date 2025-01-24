// 'use client';
// const TabSearch = () => {
//     return (
//         <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
//             <div className="flex flex-wrap sm:flex-nowrap items-center justify-between">
//                 <div className="text-sm font-semibold px-6 w-full sm:w-auto text-center sm:text-left">
//                     Financial Tracker
//                 </div>
//                 <div className="text-sm font-semibold p-2 px-6 border-x-[1px] flex-1 text-center w-full sm:w-auto">
//                     Language
//                 </div>
//                 <div className="text-sm font-semibold px-6 w-full sm:w-auto text-center sm:text-right">
//                     Itinerary
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TabSearch;


'use client';

import { useRouter } from 'next/navigation';

const TabSearch = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between">
                <button
                    className="text-sm font-semibold px-6 w-full sm:w-auto text-center sm:text-left"
                    onClick={() => handleNavigation('/financialTracker')}
                >
                    Financial Tracker
                </button>
                <button
                    className="text-sm font-semibold p-2 px-6 border-x-[1px] flex-1 text-center w-full sm:w-auto"
                    onClick={() => handleNavigation('/languageAssistance')}
                >
                    Language
                </button>
                <button
                    className="text-sm font-semibold px-6 w-full sm:w-auto text-center sm:text-right"
                    onClick={() => handleNavigation('/itinerary')}
                >
                    Itinerary
                </button>
            </div>
        </div>
    );
};

export default TabSearch;
