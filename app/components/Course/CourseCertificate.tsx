import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface Props {
    id: string;
    user: any;
    data: any;
}

const CourseCertificate = ({ id, user, data }: Props) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    const downloadCertificate = async () => {
        const certificateElement = certificateRef.current;
        if (!certificateElement) return;
        
        const canvas = await html2canvas(certificateElement, {
          useCORS: true,
          allowTaint: true,
          scale: window.devicePixelRatio,
          backgroundColor: null,
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${user?.name}_Certificate.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }, 'image/png');
      }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[800px] h-[600px] p-10 text-center border-4 border-gray-800 bg-gray-100 shadow-lg bg-[url('https://res.cloudinary.com/polad/image/upload/v1730826122/Black_Gold_and_White_Seminar_Participation_Certificate_rdddkg.jpg')] bg-cover bg-center">
                
                <h2 className="font-great-vibes text-[#e9b72e] mt-[230px] text-[50px]">{user?.name}</h2>
                
                <h1 className="text-[50px] mt-[20px] text-gray-700">{data.name}</h1>
                
            </div>
            <div ref={certificateRef}>

            </div>

            <button
                onClick={downloadCertificate}
                className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
                Download Certificate
            </button>
        </div>
    );
}

export default CourseCertificate;
