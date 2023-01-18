import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { imgPreview } from '../../utils';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageCropper = React.memo(({ imgSrc, setCroppedImage }) => {
  const [crop, setCrop] = useState();

  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);

  const onImageLoad = useCallback(
    e => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, 500 / 100));
    },
    [setCrop]
  );

  const handleChange = useCallback(crop => {
    setCrop(crop);
  }, []);

  const handleComplete = useCallback(
    c => {
      setCompletedCrop(c);
    },
    [setCompletedCrop]
  );

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      const imgUrl = imgPreview(imgRef.current, completedCrop, 1, 0);
      setCroppedImage(imgUrl);
    }
  }, [completedCrop, setCroppedImage]);

  return (
    <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => handleChange(percentCrop)}
      onComplete={c => handleComplete(c)}
      aspect={500 / 100}
    >
      <img
        ref={imgRef}
        alt="Crop me"
        src={imgSrc}
        style={{ transform: `scale(${1}) rotate(${0}deg)` }}
        onLoad={onImageLoad}
      />
    </ReactCrop>
  );
});
