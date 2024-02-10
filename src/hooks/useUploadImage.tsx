import { uploadImage } from '@/firebase/utils';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, HTMLProps, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function useUploadImage(file?: File) {
  const uploadMT = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onError: (err) => {
      toast.error(`Lỗi khi tải ảnh: ${err.message}`);
    },
  });

  useEffect(() => {
    if (file) uploadMT.mutate(file);
  }, [file]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMT.mutate(file);
    }
    e.target.value = '';
  };

  return {
    ImportComponent: (props: HTMLProps<HTMLInputElement>) => (
      <input
        ref={inputRef}
        hidden
        type='file'
        accept='image/*'
        {...props}
        onChange={onChooseFile}
      />
    ),
    triggerImport: () => inputRef.current?.click(),
    ...uploadMT,
  };
}
