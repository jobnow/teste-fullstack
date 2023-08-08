import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading'

type Props = {
  defaultImage?: string
  removeDefaultImage?: () => void
  image: ImageType | null
  setImage: (img: ImageType) => void
}

export function ImageUpload({
  image,
  setImage,
  defaultImage,
  removeDefaultImage,
}: Props) {
  const onChange = (imageList: ImageListType) => {
    if (defaultImage) removeDefaultImage?.()
    setImage(imageList[0] || null)
  }

  return (
    <div className='App'>
      <ImageUploading
        value={image ? [image] : []}
        onChange={onChange}
        maxNumber={1}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
          <>
            <div className='w-full h-64 rounded-md border border-zinc-300 bg-zinc-100 dark:border-slate-700 dark:bg-slate-950'>
              {defaultImage || imageList.length ? (
                <img
                  src={defaultImage || imageList[0]['data_url']}
                  alt=''
                  className='w-full h-full object-contain'
                />
              ) : (
                <button
                  type='button'
                  className={`w-full h-full rounded-md p-2 grid place-items-center ${
                    isDragging
                      ? 'bg-zinc-200 dark:bg-slate-900'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-900'
                  } transition-colors`}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Clique ou arraste aqui
                </button>
              )}
            </div>
            {(defaultImage || imageList.length !== 0) && (
              <div className='mt-1'>
                <button
                  type='button'
                  onClick={() => onImageUpdate(0)}
                  className='mr-2 px-2 rounded-sm text-sm text-center transition-colors border text-white border-sky-800 bg-sky-800 hover:bg-sky-900'
                >
                  Alterar
                </button>
                <button
                  type='button'
                  onClick={() => {
                    if (defaultImage) removeDefaultImage?.()
                    onImageRemoveAll()
                  }}
                  className='px-2 rounded-sm text-sm text-center transition-colors border border-transparent dark:text-sky-500 text-sky-800 hover:border-sky-900'
                >
                  Remover
                </button>
              </div>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  )
}
