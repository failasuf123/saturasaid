import { Guests } from "./GetGuest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const copyToClipboard = (data:Guests) => {
  const encodedName = encodeURIComponent(data.name); // Encode the name

  const textToCopy = `
  Kepada Yth.
  Bapak/Ibu/Saudara/i
  ${data.name}
  _____________________

  Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

  Berikut link undangan kami, untuk info lengkap dari acara, bisa kunjungi :

  https://janjistory.com/${data.weddingId}/${encodedName}

  Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

  Terima Kasih

  Hormat kami,
  ${data.nickmale} dan ${data.nickfemale}
  ____________________
`;
navigator.clipboard.writeText(textToCopy)
  .then(() => toast.success('Text di copy ke clipboard!', {
    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
  }))
  .catch(err => toast.error('Failed to copy text.', {
    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
  }));
};