import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useState } from 'react';
import { Controller, Form, useForm, useWatch } from 'react-hook-form';

type AddPostFormData = {
  description: string;
  files: File[];
};

export const AddPostForm = () => {
  const { control } = useForm<AddPostFormData>({ mode: 'onSubmit' });

  const [files, setFiles] = useState<File[]>([]);
  const [description] = useWatch({ control, name: ['description'] });

  const onSubmit = (data: AddPostFormData) => {
    console.log(data);
  };

  return (
    <Form control={control} onSubmit={(data) => onSubmit(data.data)}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="40px"
        width="100%"
        padding="20px"
      >
        <Controller
          name="files"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl {...field} variant="outlined" fullWidth>
              {files.length === 0 ? <InputLabel>Снимки</InputLabel> : undefined}
              <MuiFileInput
                fullWidth
                inputProps={{ accept: '.png, .jpeg, .svg' }}
                multiple
                value={files}
                onChange={(file) => setFiles(file)}
                clearIconButtonProps={{
                  title: 'Изчисти',
                  children: <CloseIcon fontSize="small" />,
                }}
                getInputText={(inputFiles) => inputFiles.map((file) => file.name).join(', ')}
              />
            </FormControl>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl {...field} variant="outlined" fullWidth>
              {!description ? <InputLabel>Описание</InputLabel> : undefined}
              <TextField id="description" label="Описание" multiline minRows={3} maxRows={5} />
            </FormControl>
          )}
        />
      </Box>
    </Form>
  );
};
