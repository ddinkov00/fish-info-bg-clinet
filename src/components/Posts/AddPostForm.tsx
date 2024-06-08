import { usePostPost } from '@/api/postController';
import { PostPostRequest } from '@/api/types/posts';
import { storage } from '@/config/firebase.config';
import { EMPTY_STRING } from '@/utils/constants';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type AddPostFormData = {
  description: string;
};

type AddPostFormProps = {
  submitAction: () => void;
};

export const AddPostForm = (props: AddPostFormProps) => {
  const { submitAction } = props;

  const createPostMutation = usePostPost();
  const { control, formState } = useForm<AddPostFormData>({ mode: 'onSubmit' });
  const [marker, setMarker] = useState<{ lat: number; lng: number } | undefined>();
  const [showMap, setShowMap] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFilesToUpload(files);

    console.log(files);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileRef = ref(storage, `posts/${uuidv4()}`);
    const uploadResult = await uploadBytes(fileRef, file);
    return await getDownloadURL(ref(storage, uploadResult.metadata.fullPath));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const promises: Promise<string>[] = [];

    for (const selectedFile of filesToUpload) {
      const urlPromise = uploadFile(selectedFile);

      promises.push(urlPromise);
    }

    return await Promise.all(promises);
  };

  const onSubmit = async (data: AddPostFormData) => {
    const imageUrls = await uploadFiles();

    const request: PostPostRequest = {
      description: data.description,
      imagesUrl: imageUrls,
      locationLatitude: marker?.lat,
      locationLongitude: marker?.lng,
    };

    await createPostMutation.mutateAsync(request);

    submitAction();
  };

  return (
    <Form control={control} onSubmit={async (data) => await onSubmit(data.data)}>
      <Box
        display={showMap ? 'flex' : 'none'}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="40px"
        width="100%"
        padding="20px"
      >
        <GoogleMap
          style={{ width: '100%', height: '400px' }}
          reuseMaps
          defaultCenter={{ lat: 42.6588, lng: 25.2558 }}
          defaultZoom={7}
          gestureHandling="greedy"
          onClick={(e) => {
            if (e.detail.latLng?.lat && e.detail.latLng.lng) {
              setMarker({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
            }
          }}
          disableDefaultUI
        >
          {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        </GoogleMap>

        <Box width="100%">
          <Button
            disabled={!Boolean(marker)}
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => setShowMap(false)}
          >
            Избери
          </Button>
        </Box>
      </Box>

      <Box
        display={!showMap ? 'flex' : 'none'}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="40px"
        width="100%"
        padding="20px"
      >
        <Box width="100%" display="flex" flexDirection="column" gap="10px">
          <Controller
            name="description"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormControl {...field} variant="outlined" fullWidth>
                <InputLabel>Описане</InputLabel>
                <OutlinedInput multiline rows={4} id="description" label="Описание" />
              </FormControl>
            )}
          />

          <Box width="100%" display="flex" gap="15px">
            <TextField
              value={filesToUpload.map((x) => x.name).join(', ')}
              disabled
              fullWidth
              variant="outlined"
              label="Снимки"
            />

            <Box width="70%">
              <Button
                sx={{ height: '100%' }}
                fullWidth
                component="label"
                size="large"
                variant="outlined"
                startIcon={<FileUploadIcon />}
              >
                Качи снимки
                <input
                  type="file"
                  multiple
                  accept=".png, .jpg"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Box>
          </Box>

          <Box width="100%" display="flex" gap="15px">
            <TextField
              value={marker ? `${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}` : EMPTY_STRING}
              disabled
              fullWidth
              variant="outlined"
              label="Координати"
            />

            <Box width="70%" height="56px">
              <Button
                sx={{ height: '100%' }}
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => setShowMap(true)}
              >
                Избери на картата
              </Button>
            </Box>
          </Box>
        </Box>

        <Box width="100%">
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Добави
          </Button>
        </Box>
      </Box>
    </Form>
  );
};
