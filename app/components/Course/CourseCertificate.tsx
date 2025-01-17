import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


interface Props {
    id: string;
    user: any;
    data: any;
}

export default function Certificate({ id, user, data }: Props) {
  const certRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPDF = async () => {
    if (!certRef.current) {
      console.error("Certificate reference is not available.");
      return;
    }

    try {
      const content = certRef.current;
      const canvas = await html2canvas(content, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${user?.name}_certificate.pdf`);
      // link.download = `${user?.name}_Certificate.png`;
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  /*const handleDownloadPNG = async () => {
    if (!certRef.current) {
      console.error("Certificate reference is not available.");
      return;
    }

    try {
      const content = certRef.current;
      const canvas = await html2canvas(content, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${user?.name}_certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };*/

  return (
    <div>
      {/* Certificate Container */}
      <div className="cert-container">
        <div id="content2" className="cert" ref={certRef}>
          <img
            src="https://edgarsrepo.github.io/certificate.png"
            className="cert-bg"
            alt="Certificate Background"
          />
          <div className="cert-content">
            <h1 className="other-font">Certificate of Completion</h1>
            <span style={{ fontSize: "30px" }}>{user?.name}</span>
            <br />
            <br />
            <span className="other-font">
              <i>
                <b>has completed the</b>
              </i>
            </span>
            <br />
            <span style={{ fontSize: "40px" }}>
              <b>{data.name}</b>
            </span>
            {/*<br />
            <small>(For Soldiers)</small>*/}
            <br />
            <br />
            <small>
              Has successfully completed completed the course by demonstrating theoretical
              and practical understanding
            </small>
            <br />
            <br />
            <div className="bottom-txt">
              <span>G-1 DAPE-ARR-SF</span>
              <span>Completed on: April 3, 2020</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar no-print">
        <button className="btn" onClick={() => window.print()}>
          Print Certificate
        </button>
        <button className="btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
      <br />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        @media print {
          .no-print,
          .no-print * {
            display: none !important;
          }
          .print-m-0 {
            margin: 0 !important;
          }
        }

        .btn {
          padding: 10px 17px;
          border-radius: 3px;
          background: #f4b71a;
          border: none;
          font-size: 12px;
          margin: 10px 5px;
        }

        span{
         color: black;
        }

        .toolbar {
          width: 100vw;
          left: 0;
          top: 0;
          text-align: center;
        }

        .cert-container {
          margin: 65px 0 10px 0;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .cert {
          width: 800px;
          height: 600px;
          padding: 15px 20px;
          text-align: center;
          position: relative;
        }

        .cert-bg {
          position: absolute;
          left: 0px;
          top: 0;
          width: 100%;
        }

        .cert-content {
          width: 750px;
          height: 470px;
          padding: 70px 60px 0px 60px;
          text-align: center;
          font-family: Arial, Helvetica, sans-serif;
        }

        h1 {
          font-size: 44px;
          color: black
        }

        p {
          font-size: 25px;
          color: black
        }

        small {
          font-size: 14px;
          line-height: 12px;
          color: black
        }

        .bottom-txt {
          padding: 12px 5px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: black
        }

        .bottom-txt * {
          white-space: nowrap !important;
        }

        .other-font {
          font-family: Cambria, Georgia, serif;
          font-style: italic;
          color: black
        }
      `}</style>
    </div>
  );
}



/*import React, { useRef } from 'react';
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
            <div ref={certificateRef} className="absolute w-[800px] h-[600px] p-10 text-center border-4 border-gray-800 bg-gray-100 shadow-lg bg-[url('https://res.cloudinary.com/polad/image/upload/v1730826122/Black_Gold_and_White_Seminar_Participation_Certificate_rdddkg.jpg')] bg-cover bg-center">
                
                <h2 className="relative font-great-vibes text-[#e9b72e] mt-[200px] text-[50px]">{user?.name}</h2>
                
                <h3 className="relative text-[30px] mt-[40px] text-gray-700">{data.name}</h3>
                
            </div>
            

            <button
                onClick={downloadCertificate}
                className="absolute mt-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
                Download Certificate
            </button>
        </div>
    );
}

export default CourseCertificate;*/
