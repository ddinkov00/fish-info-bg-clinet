import { useState, type ReactElement } from 'react';

import { Box } from '@mui/material';

import { useGetPosts } from '@/api/postController';
import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/Posts/PostCard';
import { MapModalConfig, MapsModal } from '@/components/Prohibitions/MapsModal';

const Home = () => {
  const postResult = useGetPosts();

  const [mapConfig, setMapConfig] = useState<MapModalConfig | undefined>();

  const posts = postResult.data ?? [];

  return (
    <>
      {mapConfig !== undefined && <MapsModal config={mapConfig} setConfig={setMapConfig} />}

      <Box
        maxWidth="1000px"
        marginX="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="30px"
        paddingBottom="30px"
      >
        {posts.map((x) => {
          return <PostCard post={x} setMapModalConfig={setMapConfig} />;
        })}
      </Box>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
