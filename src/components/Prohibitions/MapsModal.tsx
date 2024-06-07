import { EMPTY_STRING } from '@/utils/constants';
import { Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';
import type { Dispatch, SetStateAction } from 'react';
import { CustomModal } from '../common/CustomModal';

type MapModalProps = {
  config: MapModalConfig | undefined;
  setConfig: Dispatch<SetStateAction<MapModalConfig | undefined>>;
};

export type MapMarker = { id: number; lat: number; lng: number };

export type MapModalConfig = {
  title: string;
  markers: MapMarker[];
};

export const MapsModal = (props: MapModalProps) => {
  const { config, setConfig } = props;
  const firstMarker = config?.markers.at(0) as MapMarker;

  return (
    <CustomModal
      title={config?.title ? `Забрана за ${config.title}` : EMPTY_STRING}
      isOpen={Boolean(config)}
      onCloseAction={() => setConfig(undefined)}
    >
      <GoogleMap
        style={{ width: '100%', height: '500px' }}
        reuseMaps
        defaultCenter={{ lat: firstMarker.lat, lng: firstMarker.lng }}
        defaultZoom={11}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {config?.markers.map((x) => <Marker key={x.id} position={{ lat: x.lat, lng: x.lng }} />)}
      </GoogleMap>
    </CustomModal>
  );
};
