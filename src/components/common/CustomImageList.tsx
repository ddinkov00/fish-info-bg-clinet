import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { v4 as uuidv4 } from 'uuid';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

type CustomImageListProps = {
  urls: string[];
};

export default function CustomImageList(props: CustomImageListProps) {
  const { urls } = props;

  return (
    <ImageList sx={{ width: 450, height: 450 }} variant="quilted" cols={2} rowHeight={200}>
      {urls.map((url) => (
        <ImageListItem key={uuidv4()} cols={1} rows={1}>
          <img {...srcset(url, 121, 1, 1)} alt="Post image" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
