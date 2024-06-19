import { GetPostResponse } from '@/api/types/posts';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';

import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { MapModalConfig } from '../Prohibitions/MapsModal';
import CustomImageList from '../common/CustomImageList';

type PostCardProps = {
  post: GetPostResponse;
  setMapModalConfig: Dispatch<SetStateAction<MapModalConfig | undefined>>;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCard = (props: PostCardProps) => {
  const { post, setMapModalConfig } = props;

  const [expanded, setExpanded] = useState(false);
  const [descriptionWrap, setDescriptionWrap] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1876D1' }}>
            <PersonIcon />
          </Avatar>
        }
        action={
          <IconButton
            onClick={() =>
              setMapModalConfig({
                title: post.username,
                markers: [
                  {
                    id: post.id,
                    lat: post.locationLatitude ?? 0,
                    lng: post.locationLongitude ?? 0,
                  },
                ],
              })
            }
          >
            <MapIcon />
          </IconButton>
        }
        title={post.username}
        subheader={dayjs(post.created).format('DD-MM-YYYY')}
      />
      <CardMedia component="img" height="194" image={post.imagesUrl.at(0)} alt="First image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary" noWrap={descriptionWrap}>
          {post.description}
        </Typography>

        {post.description.length > 74 && (
          <Button
            variant="text"
            disableRipple
            sx={{ padding: 0 }}
            onClick={() => setDescriptionWrap(!descriptionWrap)}
          >
            <Typography variant="body2" color="primary" noWrap={descriptionWrap}>
              {descriptionWrap ? 'Покажи' : 'Скрий'}
            </Typography>
          </Button>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CustomImageList urls={post.imagesUrl} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
