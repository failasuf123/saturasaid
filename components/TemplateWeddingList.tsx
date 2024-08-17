import React from 'react';
import { WeddingBannerList } from '@/shared/WeddingBannerList';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

function TemplateWeddingList() {
    const data = WeddingBannerList;

    return (
        <div className="w-full gap-3 py-8 md:gap-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {data.map((item) => (
                <Link key={item.id} href={`/preview/${item.theme}`}>
                <Card key={item.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-105 cursor-pointer group">
                    <img src={item.image} alt={item.theme} className="w-full h-42 md:h-52 lg:h-60 object-cover group-hover:object-contain transition-all duration-300" />
                    <div className="px-2 py-1 md:p-4">
                        <p className="text-green-600 text-[0.5rem] md:text-[0.65rem] dark:text-green-100">digunakan {item.used}x</p>
                        <h2 className="my-0.5 text-sm md:text-md font-semibold text-gray-800 dark:text-white">{item.theme}</h2>
                        <p className="text-gray-600 text-[0.55rem] md:text-xs dark:text-gray-50">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 px-2 pb-3 md:mb-2">
                        {item.badge.map((bdg, index) => (
                            <Badge className="light:bg-white cursor-none text-[0.45rem] md:text-[0.65rem] lg:text-sm light:text-gray-500 hover:text-white" key={index}>{bdg}</Badge>
                        ))}
                    </div>
                </Card>
                </Link>
            ))}
        </div>
    );
}

export default TemplateWeddingList;