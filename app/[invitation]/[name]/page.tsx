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
      }
    };

    findTemplateDesain();
  }, [currentUser]);

  // Fetch image data based on weddingId after currentUser is set
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


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Guest: {name}</h2>
          <h2>Nickmale: {currentUser?.nicknameMale}</h2>
          <h2>Nickfemale: {currentUser?.nicknameFemale}</h2>
          <h2>cover: {cover}</h2>
          <h2>Album: {album[0]}</h2>
          {Template ? (
            
            <Template currentUser={currentUser} cover={cover} male={male} female={female} album={album} name={name} />
          ) : (
            <div>Loading template...</div>
          )}
        </div>
      )}
    </div>
  );
}
