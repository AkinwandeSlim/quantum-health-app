
import { useEffect, useState } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

interface LogoProcessorProps {
  originalSrc: string;
  alt: string;
  className?: string;
}

const LogoProcessor = ({ originalSrc, alt, className }: LogoProcessorProps) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resizeImageIfNeeded = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    let width = image.naturalWidth;
    let height = image.naturalHeight;

    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return { width, height };
  };

  const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
    try {
      console.log('Starting background removal process...');
      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512');
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');
      
      const { width, height } = resizeImageIfNeeded(canvas, ctx, imageElement);
      console.log(`Image processed. Dimensions: ${width}x${height}`);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      console.log('Image converted to base64');
      
      console.log('Processing with segmentation model...');
      const result = await segmenter(imageData);
      
      if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
        throw new Error('Invalid segmentation result');
      }
      
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = width;
      outputCanvas.height = height;
      const outputCtx = outputCanvas.getContext('2d');
      
      if (!outputCtx) throw new Error('Could not get output canvas context');
      
      // Draw original image with enhanced effects for bold appearance
      outputCtx.filter = 'contrast(180%) brightness(1.2) saturate(130%)';
      outputCtx.drawImage(canvas, 0, 0);
      outputCtx.filter = 'none';
      
      const outputImageData = outputCtx.getImageData(0, 0, width, height);
      const data = outputImageData.data;
      
      // Apply inverted mask to alpha channel
      for (let i = 0; i < result[0].mask.data.length; i++) {
        const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
        data[i * 4 + 3] = alpha;
      }
      
      outputCtx.putImageData(outputImageData, 0, 0);
      console.log('Background removed and logo enhanced with bold styling');
      
      return new Promise((resolve, reject) => {
        outputCanvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          'image/png',
          1.0
        );
      });
    } catch (error) {
      console.error('Error processing logo:', error);
      throw error;
    }
  };

  useEffect(() => {
    const processLogo = async () => {
      setIsProcessing(true);
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = async () => {
          try {
            const processedBlob = await removeBackground(img);
            const url = URL.createObjectURL(processedBlob);
            setProcessedImageUrl(url);
          } catch (error) {
            console.error('Failed to process logo:', error);
          } finally {
            setIsProcessing(false);
          }
        };
        
        img.onerror = () => {
          console.error('Failed to load image');
          setIsProcessing(false);
        };
        
        img.src = originalSrc;
      } catch (error) {
        console.error('Error in processLogo:', error);
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [originalSrc]);

  if (isProcessing) {
    return (
      <div className={`${className} flex items-center justify-center bg-green-400/20 rounded animate-pulse`}>
        <span className="text-green-400 text-sm font-bold">Processing...</span>
      </div>
    );
  }

  return (
    <img 
      src={processedImageUrl || originalSrc} 
      alt={alt} 
      className={`${className} drop-shadow-2xl`}
      style={{
        filter: processedImageUrl 
          ? 'contrast(140%) brightness(1.15) saturate(120%) drop-shadow(0 4px 8px rgba(0,0,0,0.3))' 
          : 'contrast(120%) brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
      }}
    />
  );
};

export default LogoProcessor;
