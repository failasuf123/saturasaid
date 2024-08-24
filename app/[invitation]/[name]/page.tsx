'use client';
import React, { useEffect, useState } from 'react';
import { BridalCoupleList } from '@/shared/BridalCoupleList';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { BridalCouple, Image } from '@/typings';
import { GiClick } from "react-icons/gi";
import Link from 'next/link';

export default function Links({ params }: { params: { invitation: string; name: string } }) {
  const { invitation, name:encodeName } = params;
  const name = decodeURIComponent(encodeName)
  const [currentUser, setCurrentUser] = useState<BridalCouple | null>(null);
  const [templateShow, setTemplateShow] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cover, setCover] = useState<string | null>(null);
  const [male, setMale] = useState< | null>(null);
  const [female, setFemale] = useState<string | null>(null);
  // const [album, setAlbum] = useState<Image[]>([]);
  const [album, setAlbum] = useState<string[]>([]);
  const [isWatermark, setIsWatermark] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        const res = await fetch(`/api/getInvitationData?id=${invitation}`);
        if (!res.ok) {
          throw new Error('Data not found');
        }
        const data = await res.json();
        setCurrentUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wedding data:', error);
        // router.push('/404');
      }
    };

    fetchWeddingData();
  }, [invitation, router]);

  useEffect(() => {
    const findTemplateDesain = () => {
      if (currentUser) {
        const templateName = currentUser.theme;
        console.log("theme",currentUser.theme)
        setTemplateShow(templateName);
        setIsWatermark(currentUser.watermark)
      }
    };

    findTemplateDesain();
  }, [currentUser]);

  useEffect(() => {
    const fetchImageData = async () => {
      if (currentUser) {
        try {
          const res = await fetch(`/api/getAllImageData?weddingId=${currentUser.id}`);
          if (!res.ok) {
            throw new Error('Image data not found');
          }
          const imageData = await res.json();

          // Process images based on their type
          let coverImage: string | null = null;
          let maleImage: string | null = null;
          let femaleImage: string | null = null;
          const albumImages: string[] = [];

          imageData.forEach((image: { url: string; type: string }) => {
            switch (image.type) {
              case 'cover':
                coverImage = image.url; // Override previous cover, keeping the last one
                break;
              case 'male':
                maleImage = image.url; // Override previous male, keeping the last one
                break;
              case 'female':
                femaleImage = image.url; // Override previous female, keeping the last one
                break;
              case 'album':
                albumImages.push(image.url);
                break;
              default:
                break;
            }
          });

          // Limit album images to the last 6
          const limitedAlbumImages = albumImages.slice(-6);

          // Set state for each image type
          setCover(coverImage);
          setMale(maleImage);
          setFemale(femaleImage);
          setAlbum(limitedAlbumImages);

        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      }
    };

    fetchImageData();
  }, [currentUser]);

  const Template = dynamic<{ currentUser: BridalCouple | null, cover: string | null, male: string | null, female: string | null, album: string[], name: string }>(() => import(`@/components/public/Invitation/${templateShow}`)
  .catch((error) => {
    console.error('Error importing template:', error);
    return { default: () => <div>Template not found</div> };
  }), {
  ssr: false,
});

const Watermark = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 opacity-50">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative bg-white rounded py-2 px-2">
            <h2 className="font-bold text-2xl bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text">
              WATERMARK
            </h2>
            <h2 className="font-bold text-xl bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text">
              saturasa.id
            </h2>
            <blockquote className="text-xs mt-2 text-gray-500">
              kesempatan anda membuat undangan pernikahan online secara gratis
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};


  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900  z-50">
          <div className="relative flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          </div>
          <div>
            <h2 className="font-bold text-xl bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text">
              saturasa.id
            </h2>
          </div>
          <div className="mt-20 text-xl text-center px-10 md:px-3">
            <h2  className="animate-pulse text-white">Loading...</h2>
          </div>
          <div className="mt-10 text-md text-center px-10 md:px-3">
            <h2  className="animate-pulse text-white">Matikan dark mode untuk mendapat tampilan maksimal</h2>
          </div>
        </div>
      ) : (
        <div>
          {Template ? (
            <div>
              <Template currentUser={currentUser} cover={cover} male={male} female={female} album={album} name={name} />
              <div className="fixed bottom-36 left-1/2  p-1 rounded-lg flex justify-center items-center h-15 w-72 z-50">
                  <Link href="/">
                    <div className="flex items-center justify-center bg-white-50 text-gray-500 py-2 px-4 rounded-md animate-blink w-full">
                        {/* <GiClick className="mr-2 text-md" />
                        <p>WaterMark</p> */}
                        {isWatermark && <Watermark />}
                    </div>
                  </Link>
              </div>
            </div>
            
          ) : (
            <div>Loading template...</div>

          )}

        </div>
      )}
    </div>
  );
}
